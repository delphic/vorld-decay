let messageType = require('../common/message-types');

// Game Client
// Handles the visuals, local player movement, and interp of remote clients
let GameClient = module.exports = (function(){
  let exports = {};

  let localId = -1;
  let sendMessage; // fn expects simple obj to send, does not expect you to send id - server will append

  let gameState = {
    players: [] // Contains id, position, nick
  };

  exports.init = (id, state, sendDelegate) => {
    localId = id;
    gameState.players = state.players; // Overwrite player data
    // TODO: Create visuals for all existing player
    sendMessage = sendDelegate;
  };

  exports.onmessage = (message) => {
    switch(message.type) {
      case messageType.CONNECTED:
        gameState.players[message.id] = message.player;
        if (message.id == localId) {
          // TODO: Spawn own player
        } else {
          // TODO: Spawn replica
        }
        break;
      case messageType.DISCONNECTED:
        gameState.players[message.id] = null;
        // TODO: Despawn player visuals
        break;
    }
  };

  return exports;
})();
