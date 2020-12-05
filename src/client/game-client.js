let MessageType = require('../common/message-types');
let Fury = require('../../fury/src/fury.js');
let Shaders = require('./shaders');
let Primitives = require('./primitives')
let Player = require('./player');

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
  let scene = Fury.Scene.create({ camera: camera, enableFrustumCulling: true });
  let world = require('../common/world').create();
  let testMaterial; // Can't create this until Fury initialised

  let localId = -1;
  let localNick = "";
  let sendMessage; // fn expects simple obj to send, does not expect you to send id - server will append

  let localPlayer;
  let players = [];
  // TODO: Player class which can take isReplica
  // TODO: List of players to update

  let serverState = {
    players: [] // Contains id, position, nick
  };

  let handleInitialServerState = (state) => {
    serverState = state;

    // Load world level and instanitate scene visuals
    var sceneBoxes = world.createLevel(serverState.level);
    // Add world objects to render scene
    for (let i = 0, l = sceneBoxes.length; i < l; i++) {
      let mesh = Fury.Mesh.create(Primitives.createCuboidMesh(sceneBoxes[i].size[0], sceneBoxes[i].size[1], sceneBoxes[i].size[2]));
      // TODO: World should in charge of including some id for visuals which lets client know what materials etc to use
      scene.add({ mesh: mesh, position: sceneBoxes[i].center, static: true, material: testMaterial });
    }

    // TODO: Spawn replicas for all existing players
  };

  let updateCanvasSize = (event) => {
  	glCanvas.width = resolutionFactor * glCanvas.clientWidth;
  	glCanvas.height = resolutionFactor * glCanvas.clientHeight;
  	cameraRatio = glCanvas.clientWidth / glCanvas.clientHeight;
  	if (camera && camera.ratio) camera.ratio = cameraRatio;
  };

  let lastTime = 0;
  let loop = () => {
    let elapsed = Date.now() - lastTime;
    lastTime += elapsed;
    if (elapsed > 66) elapsed = 66;
    // ^^ Minimm 15 FPS - this is primarily to compenstate for alt-tab / focus loss
    elapsed /= 1000;  // Convert to seconds

    if (localPlayer && !Fury.Input.isPointerLocked() && Fury.Input.mouseDown(0)) {
      Fury.Input.requestPointerLock();
    }

    // Update Players
    for (let i = 0, l = players.length; i < l; i++) {
      players[i].update(elapsed);
    }

    if (localPlayer) {
      // Update Camera
      if (localPlayer.snapCamera) {
        vec3.copy(camera.position, localPlayer.position);
        localPlayer.snapCamera = false;
      } else {
        vec3.lerp(camera.position, camera.position, localPlayer.position, 0.25);
      }
      quat.copy(camera.rotation, localPlayer.lookRotation);

      // TODO: Send network updates if player.inputDirty or throttle rate reached
      // and player.stateDirty = true then reset dirty flags
    }

    scene.render();

    Fury.Input.handleFrameFinished();

    window.requestAnimationFrame(loop);
  };

  // TODO: Separate nick setting (i.e. greet response)
  exports.init = (nick, sendDelegate) => {
    sendMessage = sendDelegate;
    localNick = nick;

    glCanvas = document.getElementById("fury");
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    Fury.init("fury"); // Consider anti-alias false

    // Shader.create requires Fury to be initialised (i.e. it needs a gl context)
    // So now we create our materials
    testMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.UnlitTextured) });
    testMaterial.loadTexture = (src, callback) => {
      var image = new Image();
      image.onload = () => {
        testMaterial.textures["uSampler"] = Fury.Renderer.createTexture(image, "high");
        callback();
      };
      image.src = src;
    };

    // Start loading required assets - TODO: have an asset loader with a callback once done
    // Use Hestia as inspiration, it had a much better system
    testMaterial.loadTexture("/images/checkerboard.png", () => {
      lastTime = Date.now();
      window.requestAnimationFrame(loop);
    });
  };

  exports.onmessage = (message) => {
    switch(message.type) {
      case MessageType.ACKNOWLEDGE:
        localId = message.id;
        handleInitialServerState(message.data);

        // TODO: Delay this greet until we're sure we have got nick name.
        sendMessage({ type: MessageType.GREET, nick: localNick });
        break;
      case MessageType.CONNECTED:
        serverState.players[message.id] = message.player;
        if (message.id == localId) {
          localNick = message.player.nick;
          localPlayer = Player.create({ id: message.id, position: vec3.clone(message.player.position), rotation: quat.create(), world: world });
          localPlayer.snapCamera = true;  // Don't lerp to initial position, just set it
          players.push(localPlayer);
        } else {
          players.push(Player.create({ id: message.id, isReplica: true, position: vec3.clone(message.player.position), rotation: quat.create(), world: world }));
        }
        break;
      case MessageType.DISCONNECTED:
        serverState.players[message.id] = null;
        // TODO: Despawn player visuals and remove from player list
        break;
      case MessageType.POSITION:
        serverState.players[message.id].position = message.position;
        // Set Player Positions (& Inputs if not local)
        // Remember to set snapCamera to true on local player if it's a teleport
        // Remember incoming position array will be JS array (probably)
        // so *copy* across the values into vec3
        break;
    }
  };

  return exports;
})();
