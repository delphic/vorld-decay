let Fury = require('../fury/src/fury.js');
let closeCodes = require('./common/websocket-close-codes');
let messageTypes = require('./common/message-types');

let isLocalHost = true;
// ^^ => Is running on localhost / development machine, not is hosting local server, or in fact hosting a server for other local clients

let connection = require('./client/connection');
let gameClient = require('./client/game-client');
let gameServer = require('./common/game-server');

window.onload = (event) => {
  let wsOpened = false;
  let connected = false;
  let nick = "";

  // Not sure we should really be handling greet acknowledge here
  // The only reason we do is so we know what send function to give to the client
  // Maybe lets just give it a delegate which can redirect as appropriate
  // i.e. if connected -> connection.send else localRelay
  let sendGreet = (id, send) => {
    // TODO: Slightly nicer prompt UI - callback to send greet
    nick = prompt("Enter your nick name", "Player");
    if (!nick) nick = "Player" + id;
    send({ type: messageTypes.GREET, nick: nick });
  };

  let localRelay = (message) => {
    gameServer.onmessage(0, message);
  };

  let setupLocalServer = () => {
    gameServer.init(
      (id, message) => {
        if (message.type == messageTypes.ACKNOWLEDGE) {
          gameClient.init(message.id, message.data, localRelay);
          sendGreet(0, localRelay);
        } else {
          gameClient.onmessage(message);
        }
      },
      (id, message) => { if (id == -1) gameClient.onmessage(message); });

    // Might need to wait for local server to be ready
    // before faking a connection a connection like this
    gameServer.onclientconnect(0);
  };

  // Try to connect to web socket server
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
        gameClient.init(message.id, message.data, connection.send);
        sendGreet(message.id, connection.send);
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
        setupLocalServer();
      } else if (connected) {
        // Handle Disconnect
        alert("Disconnected from Server!");
      }
    }
  });

  Fury.init("fury"); // Consider anti-alias false
  // Start loading assets as needed, show loading display / overlay.
};
