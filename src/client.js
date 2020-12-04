let closeCodes = require('./common/websocket-close-codes');

let isLocalHost = true; // Is running on localhost / development machine, not is hosting local server, or in fact hosting a server for other local clients
let acknowledged = false; // Acknowledged by websocket server

let connection = require('./client/connection');
let gameClient = require('./client/game-client');
let gameServer = require('./common/game-server');

let setupLocalServer = () => {
  gameServer.init(
    (id, message) => { gameClient.onmessage(message); },
    (id, message) => { if (id == -1) gameClient.onmessage(message); });

  // Might need to wait for local server to be ready
  // before faking a connection a connection like this
  gameServer.onclientconnect(0);
};

let sendMessage = (message) => {
  // Send either to web socket or to local server
  // depending on if acknowledged
  if (acknowledged) {
    connection.send(message);
  } else {
    gameServer.onmessage(0, message);
  }
};

window.onload = (event) => {
  let wsOpened = false;

  let nick = "";
  nick = prompt("Enter you nick name", "Player");
  gameClient.init(nick, sendMessage);
  // Client should start loading whatever assets are needed
  // Arguably we should wait before trying to connect to the ws server

  // Try to connect to web socket server
  // No server present results in an error *then* a close (code 1006) (onopen is never called)
  // Full server results in an open event *then* a close (code 4006) (no error event)
  connection.connect({
    isDebug: isLocalHost,
    uri: isLocalHost ? "ws://localhost:9001" : "wss://delphic.me.uk:9001",
    onopen: () => {
      wsOpened = true;
    },
    onmessage: (message) => {
      // Received at least one message => acknoledged by server
      // Set connected bool which makes sure messages sent by client
      // are sent through the web socket connection rather than the relay
      acknowledged = true;
      gameClient.onmessage(message);
    },
    onerror: () => { /* Maybe do something IDK */ },
    onclose: (code) => {
      if (!wsOpened || code == closeCodes.SERVER_FULL) {
        setupLocalServer();
      } else if (acknowledged) {
        // Handle Disconnect
        alert("Disconnected from Server!");
      }
    }
  });
};
