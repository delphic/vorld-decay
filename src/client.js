let Fury = require('../fury/src/fury.js');
let closeCodes = require('./common/websocket-close-codes');

let isLocalHost = true;
let connection = require('./client/connection');

window.onload = (event) => {
  // Try to connect to ws
  let connectedToServer = false;  // TODO: Test no server and test server max connections reached

  // No server gives an error *then* a close (code 1006) (onopen is never called)
  // Full server gives open *then* a close

  connection.connect({
    isDebug: isLocalHost,
    uri: isLocalHost ? "ws://localhost:9001" : "wss://delphic.me.uk:9001",
    onopen: () => {
      connectedToServer = true;
      /* Inject methods for sending messages into GameClient */
    },
    onmessage: (message) => { /* Send to GameClient */ },
    onerror: () => { /* Maybe do something IDK */ },
    onclose: (code) => {
      if (!connectedToServer || code == closeCodes.SERVER_FULL) {
        // Create Relay - inject send message function to game client
      } else if (connectedToServer) {
        // Handle Disconnect
      }
    }
  });

  Fury.init("fury"); // Consider anti-alias false
  // Start loading assets as needed, show loading display / overlay.
};
