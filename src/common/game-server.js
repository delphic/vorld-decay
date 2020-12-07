// Game Server!
// Handles the greet / acknoledge
// informing the gameclient of their player id and any required on connection state
// as well as informing the other clients that someone connected
// Also handles everything else we want to be server authoritative, e.g. level generation
let MessageType = require('./message-types');
let World = require('./world');

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
        globalState.players[id].position = message.position;
        distributeMessage(id, message); // TODO: Relevancy / Spacial Partitioning plz
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
