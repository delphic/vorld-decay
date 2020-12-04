let Fury = require('../fury/src/fury.js');
let closeCodes = require('./common/websocket-close-codes');
let messageTypes = require('./common/message-types');

let isLocalHost = true;
// ^^ => Is running on localhost / development machine, not is hosting local server, or in fact hosting a server for other local clients

let connection = require('./client/connection');
let gameClient = require('./client/game-client');

window.onload = (event) => {
  let wsOpened = false;
  let connected = false;
  let nick = "";

  // Try to connect to web socket server
  // Note:
  // No server present results in an error *then* a close (code 1006) (onopen is never called)
  // Full server results in an open event *then* a close (code 4006) (no error event)
  connection.connect({
    isDebug: isLocalHost,
    uri: isLocalHost ? "ws://localhost:9001" : "wss://delphic.me.uk:9001",
    onopen: () => {
      wsOpened = true;
      // Wait for server acknowledge before starting game client
    },
    onmessage: (message) => {
      if (!connected && message.type == messageTypes.ACKNOWLEDGE) {
        connected = true;
        // Initialise gameClient
        gameClient.init(message.id, message.data, connection.send);

        // TODO: Slightly nicer prompt UI - callback to send greet
        nick = prompt("Enter your nick name", "Player");
        if (!nick) nick = "Player" + message.id;
        connection.send({ type: messageTypes.GREET, nick: nick });
      } else if (connected) {
        gameClient.onmessage(message);
      } else {
        console.error("Received unexpected message before connection acknowledged");
      }
    },
    onerror: () => { /* Maybe do something IDK */ },
    onclose: (code) => {
      connected = false;
      if (!wsOpened || code == closeCodes.SERVER_FULL) {
        // Create GameServer and Relay - inject send message function to game client
      } else if (connected) {
        // Handle Disconnect
        alert("Disconnected from Server!");
      }
    }
  });

  Fury.init("fury"); // Consider anti-alias false
  // Start loading assets as needed, show loading display / overlay.
};
