let messageType = require('../common/message-types');
let Fury = require('../../fury/src/fury.js');

// Game Client
// Handles the visuals, local player movement, and interp of remote clients
let GameClient = module.exports = (function(){
  let exports = {};

  let localId = -1;
  let localNick = "";
  let sendMessage; // fn expects simple obj to send, does not expect you to send id - server will append

  let serverState = {
    players: [] // Contains id, position, nick
  };

  let handleInitialServerState = (state) => {
    serverState = state;
    // TODO: Create visuals for all existing players
  };

  exports.init = (nick, sendDelegate) => {
    sendMessage = sendDelegate;
    localNick = nick;
    Fury.init("fury"); // Consider anti-alias false
    // Start loading assets
  };

  exports.onmessage = (message) => {
    switch(message.type) {
      case messageType.ACKNOWLEDGE:
        localId = message.id;
        handleInitialServerState(message.data);
        sendMessage({ type: messageType.GREET, nick: localNick });
        break;
      case messageType.CONNECTED:
        serverState.players[message.id] = message.player;
        if (message.id == localId) {
          localNick = message.player.nick;
          // TODO: Spawn own player
        } else {
          // TODO: Spawn replica
        }
        break;
      case messageType.DISCONNECTED:
        serverState.players[message.id] = null;
        // TODO: Despawn player visuals
        break;
    }
  };

  return exports;
})();
