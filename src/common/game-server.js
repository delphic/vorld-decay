// Game Server!
// Handles the greet / acknoledge
// informing the gameclient of their player id and any required on connection state
// as well as informing the other clients that someone connected
// Also handles everything else we want to be server authoritative, e.g. level generation
let MessageType = require('./message-types');
let World = require('./world');
let Bounds = require('../../Fury/src/bounds');
let Maths = require('../../Fury/src/maths');

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
    pickups: [],
    interactables: []  // network interactables power state
  };
  let world = World.create();

  exports.init = (sendDelegate, distributeDelegate) => {
    sendMessage = sendDelegate;
    distributeMessage = distributeDelegate;

    globalState.level = "debug";
    world.createLevel("debug");
  };

  exports.onclientconnect = (id) => {
    sendMessage(id, { type: MessageType.ACKNOWLEDGE, id: id, data: globalState });
  };

  let positionCache = [0,0,0];

  // Helpers for copying into DTOs
  // TODO: Move to common so we can reuse for client side DTOs
  // note + converts back from string to number, arguably should use round
  // https://stackoverflow.com/a/41716722
  let round = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100;
  };

  let cloneArray3 = (array) => {
    return [ round(array[0]), round(array[1]), round(array[2]) ];
  };
  let copyArray3 = (out, array) => {
    out[0] = round(array[0]);
    out[1] = round(array[1]);
    out[2] = round(array[2]);
  };
  let cloneArray4 = (array) => {
    return [ round(array[0]), round(array[1]), round(array[2]), round(array[3]) ];
  };
  let copyArray4 = (out, array) => {
    out[0] = round(array[0]);
    out[1] = round(array[1]);
    out[2] = round(array[2]);
    out[3] = round(array[3]);
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
              break;  // Only pickup one object at a time!
            }
          }
        }
        break;
      case MessageType.DROP:
        // If we wanted to be super accurate we could expect position
        if (isHoldingPickup(id)) {
          dropPickups(id, message.position); // Currently just drops all pickups
          message.id = id;
          distributeMessage(-1, message);
        }
        break;
      case MessageType.INTERACT:
        // Call interact then update global state
        // and distribute
        let position = globalState.players[id].position;
        // Look for interactable at player position
        for (let i = 0, l = world.interactables.length; i < l; i++) {
          let interactable = world.interactables[i];
          if (interactable.canInteract(position)) {
            // Interact!
            let heldPickupState = getHeldPickup(id);
            let heldPickup = null;
            if (heldPickupState) {
              heldPickup = world.getPickup(heldPickupState.id);
            }
            let result = interactable.interact(heldPickup);
            if (result) {
              // Update world object (will want to do this on client too)
              heldPickup.enabled = false;
              Maths.vec3.copy(heldPickup.position, result);
              // Don't have server side player objects so don't need to explicitly
              // set player.heldItem to null, updating the heldPickupState does that

              // Update global state
              heldPickupState.owner = null;
              heldPickupState.position = cloneArray3(result);
              setInteractableGlobalState(interactable.id, interactable.power);

              // Set message pickup id
              message.pickupId = heldPickup.id
            }

            // If we expand what interactables can do, e.g. just switches
            // need to respond to state change here and put it in global state

            message.id = id;
            message.interactableId = interactable.id;
            distributeMessage(-1, message);
            break;
          }
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
            if (teleporter.enabled && Bounds.contains(message.position, teleporter.bounds)) {
              shouldTeleport = true;
              // TODO: Not instant teleport please - requires game loop server side or some way to defer
              Maths.vec3.copy(message.position, teleporter.targetPosition);
              Maths.quat.copy(message.rotation, teleporter.targetRotation);
              message.snapLook = true;
              if (teleporter.win) {
                message.win = true;
              }
              break;
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

        // Check for auto-pickups
        if (hasPositionChanged && !isHoldingPickup(id)) { // Q: Auto pickups probably shouldn't be held?
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

  let setPickupGlobalState = (id, owner, position) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].id == id) {
        globalState.pickups[i].owner = owner;
        if (position) {
          if (globalState.pickups[i].position) {
            copyArray3(globalState.pickups[i].position, position);
          } else {
            globalState.pickups[i].position = cloneArray3(position);
          }
        } else {
          globalState.pickups[i].position = null;
        }
        return;
      }
    }
    globalState.pickups.push({
      id: id,
      owner: owner,
      position: position ? cloneArray3(position) : null
    });
  };

  let setInteractableGlobalState = (id, power) => {
    for (let i = 0, l = globalState.interactables.length; i < l; i++) {
      if (globalState.interactables[i].id == id) {
        globalState.interactables[i].power = power.slice();
        return;
      }
    }
    globalState.interactables.push({ id: id, power: power.slice() });
  };

  let isHoldingPickup = (playerId) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].owner == playerId) {
        return true;
      }
    }
    return false;
  };

  let getHeldPickup = (playerId) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].owner == playerId) {
        return globalState.pickups[i];
      }
    }
    return null;
  };

  let dropPickups = (id, dropPosition) => {
    for (let i = 0, l = globalState.pickups.length; i < l; i++) {
      if (globalState.pickups[i].owner == id) {
        if (!dropPosition) {
          // TODO: Calculate from player position and rotation and drop slightly in front
          dropPosition = globalState.players[id].position;
        }
        // re-enable world pickup
        let pickup = world.getPickup(globalState.pickups[i].id);
        if (pickup) {
          pickup.enabled = true;
          Maths.vec3.copy(pickup.position, dropPosition);
        }

        // update global state pickup
        globalState.pickups[i].owner = null;
        globalState.pickups[i].position = cloneArray3(dropPosition);  // Clone they might continue to move, lol
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
