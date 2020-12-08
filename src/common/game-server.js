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

  let initialSpawnPosition = [0, 1, 0];
  // TODO: going to need some level management code!

  // This is information which needs to be sent on client connection
  let globalState = {
    players: []
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

  exports.onmessage = (id, message) => {
    switch(message.type) {
      case MessageType.GREET:
        let nick = message.nick;
        if (!nick) nick = "Player " + (id + 1);
        globalState.players[id] = { id: id, nick: nick, position: initialSpawnPosition };
        distributeMessage(-1, { type: MessageType.CONNECTED, id: id, player: globalState.players[id] });
        break;
      case MessageType.POSITION:
        message.id = id;

        // Check for teleporter collision
        let shouldTeleport = false;
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

        globalState.players[id].position = message.position;
        distributeMessage(shouldTeleport ? -1 : id, message); // TODO: Relevancy / Spacial Partitioning plz (could do this by section)

        break;
      default:
        message.id = id;
        distributeMessage(id, message);
        break;
    }
  };

  exports.onclientdisconnect = (id) => {
    // Only report disconnection of players which have sent greet
    if (globalState.players[id]) {
      globalState.players[id] = null;
      distributeMessage(id, { type: MessageType.DISCONNECTED, id: id });
    }
  };

  return exports;

})();
