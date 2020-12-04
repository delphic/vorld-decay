// Game Server!
// Handles the greet / acknoledge
// informing the gameclient of their player id and any required on connection state
// as well as informing the other clients that someone connected
// Also handles everything else we want to be server authoritative, e.g. level generation
let MessageType = require('./message-types');

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

  exports.init = (sendDelegate, distributeDelegate) => {
    sendMessage = sendDelegate;
    distributeMessage = distributeDelegate;

    // TODO: Start creating the game world baby
  };

  exports.onclientconnect = (id) => {
    sendMessage(id, { type: MessageType.ACKNOWLEDGE, id: id, data: globalState });
  };

  exports.onmessage = (id, message) => {
    switch(message.type) {
      case MessageType.GREET:
        globalState.players[id] = { id: id, nick: message.nick, position: initialSpawnPosition };
        sendMessage(id, { type: MessageType.CONNECTED, id: id, player: globalState.players[id] });
        distributeMessage(id, { type: MessageType.CONNECTED, id: id, player: globalState.players[id] });
        break;
    }
  };

  exports.onclientdisconnect = (id) => {
    globalState.players[id] = null;
    distributeMessage(id, { type: MessageType.DISCONNECTED, id: id });
  };

  return exports;

})();
