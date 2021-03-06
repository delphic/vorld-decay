let CloseCode = require('./common/websocket-close-codes');

let isLocalHost = false; // Is running on localhost / development machine, not is hosting local server, or in fact hosting a server for other local clients
let acknowledged = false; // Acknowledged by websocket server

let Connection = require('./client/connection');
let GameClient = require('./client/game-client');
let GameServer = require('./common/game-server');

let setupLocalServer = () => {
  GameServer.init(
    (id, message) => { GameClient.onmessage(message); },
    (id, message) => { if (id == -1) GameClient.onmessage(message); });

  // Might need to wait for local server to be ready
  // before faking a connection a connection like this
  GameServer.onclientconnect(0);
};

let sendMessage = (message) => {
  // Send either to web socket or to local server
  // depending on if acknowledged
  if (acknowledged) {
    Connection.send(message);
  } else {
    // Deep clone via json stringify / parse - prevents server messing with client objects when using local relay
    GameServer.onmessage(0, JSON.parse(JSON.stringify(message)));
  }
};

window.onload = (event) => {
  let wsOpened = false;

  let nick = "";
  // nick = prompt("Enter you nick name", "Player");
  GameClient.init(nick, sendMessage);
  // Client should start loading whatever assets are needed
  // Arguably we should wait before trying to connect to the ws server

  // Try to connect to web socket server
  // No server present results in an error *then* a close (code 1006) (onopen is never called)
  // Full server results in an open event *then* a close (code 4006) (no error event)
  Connection.connect({
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
      GameClient.onmessage(message);
    },
    onerror: () => { /* Maybe do something IDK */ },
    onclose: (code) => {
      if (!wsOpened || code == CloseCode.SERVER_FULL) {
        setupLocalServer();
      } else if (acknowledged) {
        // Handle Disconnect
        GameClient.ondisconnect();
        // TODO: Could conceivable spin up a local server at this point
        // passing in GameClient.world instead of generating a new one
        // and passing in local player curent state
      }
    }
  });
};
