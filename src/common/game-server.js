// Game Server!
// Handles the greet / acknoledge
// informing the gameclient of their player id and any required on connection state
// as well as informing the other clients that someone connected
// Also handles everything else we want to be server authoritative, e.g. level generation
let MessageType = require('./message-types');
let World = require('./world');
let Bounds = require('../../fury/src/bounds');
let Maths = require('../../fury/src/maths');

let GameServer = module.exports = (function() {
  let exports = {};

  // Format is (idToSendTo, objectToSend) for message
  // Format is (idToExclude, objectToSend) for distribute (-1 sends to all)
  let sendMessage, distributeMessage;

  // This is information which needs to be sent on client connection
  // Holds DTOs, rather than actual world objects, might be good to call
  // them as such and have classes for them
  let globalState = {
    players: [],
    pickups: []
  };
  let world = World.create();

  exports.init = (sendDelegate, distributeDelegate) => {
    sendMessage = sendDelegate;
    distributeMessage = distributeDelegate;

    globalState.level = "test";
    world.createLevel("test");
  };

  exports.onclientconnect = (id) => {
    sendMessage(id, { type: MessageType.ACKNOWLEDGE, id: id, data: globalState });
  };

  let positionCache = [0,0,0];

  // Helpers for copying into DTOs
  // TODO: Move to common so we can reuse for client side DTOs
  let cloneArray3 = (array) => {
    return [ array[0].toFixed(2), array[1].toFixed(2), array[2].toFixed(2) ];
  };
  let copyArray3 = (out, array) => {
    out[0] = array[0].toFixed(2);
    out[1] = array[1].toFixed(2);
    out[2] = array[2].toFixed(2);
  };
  let cloneArray4 = (array) => {
    return [ array[0].toFixed(2), array[1].toFixed(2), array[2].toFixed(2), array[3].toFixed(2) ];
  };
  let copyArray4 = (out, array) => {
    out[0] = array[0].toFixed(2);
    out[1] = array[1].toFixed(2);
    out[2] = array[2].toFixed(2);
    out[3] = array[3].toFixed(2);
  };

  exports.onmessage = (id, message) => {
    switch(message.type) {
      case MessageType.GREET:
        let nick = message.nick;
        if (!nick) nick = "Player " + (id + 1);
        globalState.players[id] = { id: id, nick: nick, position: cloneArray3(world.initialSpawnPosition), rotation: [0,0,0,1] };
        distributeMessage(-1, { type: MessageType.CONNECTED, id: id, player: globalState.players[id] });
        break;
      case MessageType.PICKUP:
        // Expect position, run through pickups and try to pickup
        // Could in theory use last known position it's probably fine
        if (!isHoldingPickup(id)) {
          for (let i = 0, l = world.pickups.length; i < l; i++) {
            let pickup = world.pickups[i];
            if (pickup.canPickup(message.position)) {
              // This player should pickup the object!
              pickup.enabled = false;
              setPickupGlobalState(pickup.id, id);
              distributeMessage(-1, { id: id, type: MessageType.PICKUP, pickupId: pickup.id });
            }
          }
        }
        break;
      case MessageType.DROP:
        // If we wanted to be super accurate we could expect position
        if (isHoldingPickup(id)) {
          dropPickups(id); // Currently just drops all pickups
          message.id = id;
          distributeMessage(-1, message);
        }
        break;
      case MessageType.POSITION:  // This is more a player transform / input sync
        message.id = id;

        copyArray3(positionCache, message.position);
        let hasPositionChanged = !Maths.vec3.equals(positionCache, globalState.players[id].position);
        if (hasPositionChanged)
        copyArray3(globalState.players[id].position, message.position);
        copyArray4(globalState.players[id].rotation, message.rotation);

        // Check for teleporter collision
        let shouldTeleport = false;
        if (hasPositionChanged) {
          for (let i = 0, l = world.teleporters.length; i < l; i++) {
            let teleporter = world.teleporters[i];
            // Ideally would have player concept on server now and could use it's AABB
            if (Bounds.contains(message.position, teleporter.bounds)) {
              shouldTeleport = true;
              // TODO: Not instant teleport please - requires game loop server side or some way to defer
              Maths.vec3.copy(message.position, teleporter.targetPosition);
              Maths.quat.copy(message.rotation, teleporter.targetRotation);
              message.snapLook = true;
            }
          }
        }

        // Message all others if no teleport, return message to sender as well as other players if teleporting
        if (shouldTeleport) {
          // Distribute to everyone
          distributeMessage(-1, message); // TODO: Relevancy / Spacial Parititioning plz (players in target section + players in correct section + self)
        } else {
          // Distribute to other players
          distributeMessage(id, message); // TODO: Relevancy / Spacial Partitioning plz (players in same section only)
        }

        // Check for pickups
        if (hasPositionChanged && !isHoldingPickup(id)) {
          for (let i = 0, l = world.pickups.length; i < l; i++) {
            let pickup = world.pickups[i];
            if (pickup.autoPickup && pickup.canPickup(message.position)) {
              // This player should pickup the object!
              pickup.enabled = false;
              setPickupGlobalState(pickup.id, id);
              distributeMessage(-1, { id: id, type: MessageType.PICKUP, pickupId: pickup.id });
            }
          }
        }
        break;
      default:
        message.id = id;
        distributeMessage(id, message);
        break;
    }
  };

  let setPickupGlobalState = (id, owner) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].id == id) {
        globalState.pickups[i].owner = owner;
        globalState.pickups[i].position = null;
        return;
      }
    }
    globalState.pickups.push({ id: id, owner: owner, position: null })
  };

  let isHoldingPickup = (id) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].owner == id) {
        return true;
      }
    }
    return false;
  };

  let dropPickups = (id) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].owner == id) {
        // calculate drop position (just player position for now)
        let dropPosition = globalState.players[id].position;  // TODO: drop to floor, use method on world

        // re-enable world pickup
        for (let j = 0, n = world.pickups.length; j < n; j++) {
          let pickup = world.pickups[j];
          if (pickup.id == globalState.pickups[i].id) {
            pickup.enabled = true;
            Maths.vec3.copy(pickup.position, dropPosition);
            break;
          }
        }

        // update global state pickup
        globalState.pickups[i].owner = null;
        globalState.pickups[i].position = dropPosition;
      }
    }
  };

  exports.onclientdisconnect = (id) => {
    // Only report disconnection of players which have sent greet
    if (globalState.players[id]) {
      dropPickups(id);  // Drop any owned pickups
      globalState.players[id] = null; // Remove from state
      distributeMessage(id, { type: MessageType.DISCONNECTED, id: id });
    }
  };

  return exports;

})();
