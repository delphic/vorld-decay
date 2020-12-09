let MessageType = require('../common/message-types');
let Fury = require('../../fury/src/fury.js');
let Player = require('./player');
let PlayerVisuals = require('./player-visuals');
let WorldVisuals = require('./world-visuals');

// glMatrix
let vec3 = Fury.Maths.vec3, quat = Fury.Maths.quat;

// Game Client
// Handles the visuals, local player movement, and interp of remote clients
let GameClient = module.exports = (function(){
  let exports = {};

  let glCanvas;
  let resolutionFactor = 1, cameraRatio = 16 / 9;
  let camera = Fury.Camera.create({
    near: 0.1,
    far: 10000,
    fov: 1.0472,
    ratio: cameraRatio,
    position: vec3.fromValues(0, 2, 3)
  });
  camera.targetPosition = vec3.clone(camera.position);
  camera.playerOffset = vec3.fromValues(0, 1, 0);
  let scene = Fury.Scene.create({ camera: camera, enableFrustumCulling: true });
  let world = require('../common/world').create();

  let localId = -1;
  let localNick = "";
  let sendMessage; // fn expects simple obj to send, does not expect you to send id - server will append

  let localPlayer;
  let players = []; // Note currently index != id

  let serverState = {
    players: [] // Contains id, position, nick
  };

  let updateCanvasSize = (event) => {
  	glCanvas.width = resolutionFactor * glCanvas.clientWidth;
  	glCanvas.height = resolutionFactor * glCanvas.clientHeight;
  	cameraRatio = glCanvas.clientWidth / glCanvas.clientHeight;
  	if (camera && camera.ratio) camera.ratio = cameraRatio;
  };

  // TODO: Separate nick setting (i.e. greet response)
  exports.init = (nick, sendDelegate) => {
    sendMessage = sendDelegate;
    localNick = nick;

    glCanvas = document.getElementById("fury");
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    Fury.init("fury"); // Consider { antialias: false }

    // Start loading required assets
    PlayerVisuals.init();
    WorldVisuals.init(() => {
      lastTime = Date.now();
      window.requestAnimationFrame(loop);
    });
  };

  let lastTime = 0;
  let lastNetSendTime = 0, sendInterval = 1/ 20;

  let loop = () => {
    let time = Date.now();
    let elapsed = time - lastTime;
    lastTime += elapsed;
    if (elapsed > 66) elapsed = 66;
    // ^^ Minimm 15 FPS - this is primarily to compenstate for alt-tab / focus loss
    elapsed /= 1000;  // Convert to seconds

    let sendNetUpdate = false;
    if (time - lastNetSendTime >= sendInterval) {
      sendNetUpdate = true;
      lastNetSendTime = time;
    }

    if (localPlayer && !Fury.Input.isPointerLocked() && Fury.Input.mouseDown(0)) {
      Fury.Input.requestPointerLock();
    }

    // Update Players
    for (let i = 0, l = players.length; i < l; i++) {
      if (players[i]) {
        players[i].update(elapsed);
      }
    }

    if (localPlayer) {
      // Check for request pickup and send pickup message
      if (localPlayer.requestPickup) {
        // TODO: Arguably should set something to prevent rerequests until have response
        localPlayer.requestPickup = false;
        if (!localPlayer.heldItem) {
          sendMessage(localPlayer.pickupMessage);
        } else {
          // HACK: should probably disambiguate input between interact and pickup
          sendMessage(localPlayer.interactMessage);
        }

      }
      if (localPlayer.requestDrop) {
        localPlayer.requestDrop = false;
        // TODO: Arguably should set something to prevent rerequests until have reponse
        sendMessage(localPlayer.dropMessage);
      }

      // Update Camera
      vec3.add(camera.targetPosition, camera.playerOffset, localPlayer.position);
      if (localPlayer.snapCamera) {
        vec3.copy(camera.position, camera.targetPosition);
        localPlayer.snapCamera = false;
      } else {
        vec3.lerp(camera.position, camera.targetPosition, localPlayer.position, 0.25);
      }
      quat.copy(camera.rotation, localPlayer.lookRotation);

      if ((sendNetUpdate && localPlayer.stateDirty) || localPlayer.inputDirty) {
        localPlayer.stateDirty = localPlayer.inputDirty = false;
        sendMessage(localPlayer.updateMessage);
      }
    }

    scene.render();

    Fury.Input.handleFrameFinished();

    window.requestAnimationFrame(loop);
  };

  exports.onmessage = (message) => {
    switch(message.type) {
      case MessageType.ACKNOWLEDGE:
        // NOTE: Will happen post init but not necessarily post asset load
        localId = message.id;
        handleInitialServerState(message.data);

        // TODO: Delay this greet until we're sure we have got nick name.
        sendMessage({ type: MessageType.GREET, nick: localNick });
        break;
      case MessageType.CONNECTED:
        serverState.players[message.id] = message.player;
        spawnPlayer(message.id, message.player);
        break;
      case MessageType.DISCONNECTED:
        serverState.players[message.id] = null;
        dropPickups(message.id);
        despawnPlayer(message.id);
        break;
      case MessageType.POSITION:
        serverState.players[message.id].position = message.position;
        updatePlayer(message.id, message);
        break;
      case MessageType.PICKUP:
        assignPickup(message.pickupId, message.id);
        break;
      case MessageType.DROP:
        dropPickups(message.id);
        break;
      case MessageType.INTERACT:
        let interactable = world.getInteractable(message.interactableId);
        let heldItem = world.getPickup(message.pickupId);
        let resultPos = interactable.interact(heldItem);
        if (resultPos) {
          if (heldItem) {
            heldItem.enabled = false;
            vec3.copy(heldItem.position, resultPos);
            quat.identity(heldItem.rotation);
          } else {
            console.error("Unable to find held item with id " + message.pickupId);
          }
          let player = getPlayer(message.id);
          if (player) {
            player.heldItem = null;
          } else {
            console.error("Unable to find player with id " + message.id);
          }
        }
        break;
    }
  };

  exports.ondisconnect = () => {
    if (Fury.Input.isPointerLocked()) {
      Fury.Input.releasePointerLock();
    }
    alert("Disconnected from Server!");
  };

  let handleInitialServerState = (state) => {
    // NOTE: Will happen post init but not necessarily post asset load
    serverState = state;

    // Load world level and instanitate scene visuals
    var level = world.createLevel(serverState.level);

    // Add world objects to render scene
    WorldVisuals.generateVisuals(world, scene, () => {
      // World visuals instanitated - could defer player spawn until this point
    });

    // Spawn replicas for all existing players
    for (let i = 0, l = state.players.length; i < l; i++) {
      if (state.players[i]) {
        if (state.players[i].id != localId) {
          spawnPlayer(state.players[i].id, state.players[i]);
        } else {
          console.error("Received player data in initial state with local id");
        }
      }
    }

    // Handle Pickups
    for (let i = 0, l = state.pickups.length; i < l; i++) {
      if (state.pickups[i].owner != null) {
        assignPickup(state.pickups[i].id, state.pickups[i].owner);
      } else {
        let pickup = world.getPickup(state.pickups[i].id);
        if (pickup) {
          vec3.copy(pickup.position, state.pickups[i].position);
        }
      }
    }

    for (let i = 0, l = state.interactables.length; i < l; i++) {
      let interactableState = state.interactables[i];
      if (interactableState) {
        let id = interactableState.id;
        let interactable = world.getInteractable(id);
        if (interactable) {
          // Copy power values
          for (let j = 0, n = interactableState.power.length; j < n; j++) {
            interactable.power[j] = interactableState.power[j];
          }
          if (interactable.onmessage) {
            interactable.onmessage("init");
          }
        }
      }
    }
  };

  // We should probably move these get methods to world
  let assignPickup = (pickupId, playerId) => {
    let pickup = world.getPickup(pickupId);
    if (pickup) {
      pickup.enabled = false;
      let player = getPlayer(playerId);
      if (player) {
        player.heldItem = pickup;
      } else {
        pickup.visual.active = false;
      }
    }
  };

  let dropPickups = (playerId) => {
    let player = getPlayer(playerId);
    if (player && player.heldItem) {
      player.heldItem.enabled = true;
      vec3.copy(player.heldItem.position, player.position);
      player.heldItem = null;
      // TODO: Cast to floor, use world method
    }
  };

  let spawnPlayer = (id, player) => {
    if (id == localId) {
      localNick = player.nick;
      localPlayer = Player.create({
        id: id,
        position: vec3.clone(player.position),
        rotation: quat.clone(player.rotation),
        world: world });
      players.push(localPlayer);
    } else {
      let replica = Player.create({
        id: id,
        isReplica: true,
        position: vec3.clone(player.position),
        rotation: quat.clone(player.rotation),
        world: world });
      replica.visuals = PlayerVisuals.create(replica, scene);
      players.push(replica);
    }
  };

  let getPlayer = (id) => {
    for (let i = 0, l = players.length; i < l; i++) {
      if (players[i] && players[i].id == id) {
        return players[i];
      }
    }
    return null;
  };

  let updatePlayer = (id, message) => {
    if (id == localId) {
      // Received correction from server
      localPlayer.setLocalState(message);
    } else {
      // Update Replica
      for (let i = 0, l = players.length; i < l; i++) {
        if (players[i] && players[i].id == id) {
          players[i].setReplicaState(message);
          break;
        }
      }
    }
  };

  let despawnPlayer = (id) => {
    for(let i = 0, l = players.length; i < l; i++) {
      if (players[i] && players[i].id == id) {
        if (players[i].visuals) {
          scene.remove(players[i].visuals);
        }
        players[i] = null;
        // Would be nice to shorten the list but eh
        break;
      }
    }
  };

  return exports;
})();
