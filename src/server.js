let uWS = require('uWebSockets.js');
let closeCodes = require('./common/websocket-close-codes');

// Config
// Would be better read from a config file
const isLocalHost = true;
const idleTimeout = 120;
const maxConnections =  8;

let app;
if (isLocalHost) {
  app = uWS.App();
} else {
  app = uWS.SSLApp({
    key_file_name: './misc/privkey.pem',
    cert_file_name: './misc/fullchain.pem'
  });
}

let connections = require('./server/connections');
connections.init(maxConnections, isLocalHost);

let gameServer = require('./common/game-server');
gameServer.init(
  // For local relay don't want to have to stringfy so we do that in the
  // functions we pass to the game server/
  (id, message) => { connections.sendMessage(id, JSON.stringify(message)); },
  (id, message) => { connections.distribute(id, JSON.stringify(message)); }
);

app.ws("/*", {
  idleTimeout: idleTimeout,
  maxBackpressure: 1024,	// NOTE: A web socket won't "publish" messages but will send them if backpressure reached
	maxPayloadLength: 512,	// If received payload is greater than max payload length connection is closed immediately
	compression: uWS.DEDICATED_COMPRESSOR_3KB,	// I don't know what the trade offs of different compressions are... maybe find out?
  /* WS events */
	/* DOCS: https://unetworking.github.io/uWebSockets.js/generated/interfaces/websocketbehavior.html */
	open: (ws) => {
    if (connections.wsopen(ws)) {
      gameServer.onclientconnect(ws.id);
    }
  },
  message: (ws, message, isBinary) => {
    // Assuming JSON for now
    let json = Buffer.from(message).toString();
    gameServer.onmessage(ws.id, JSON.parse(json), isBinary);
  },
  drain: (ws) => { /* Backed up message sent, if we were throttling we could now lift it - should check ws.getBufferedAmount() to drive throttling */ },
  close: (ws, code, message) => {
    let id = ws.id;
    if (connections.wsclose(ws)) {
      gameServer.onclientdisconnect(id);
    } else if (code != closeCodes.SERVER_FULL) {
      if (isLocalHost) console.log("Untracked ws connection closed");
    }
  }
});

app.get("/*", (res, req) => {
	res.writeStatus('200 OK').end("Vorld Decay Server Running, " + connections.getConnectionCount() + " connected clients.");
});

app.listen(9001, (listenSocket) => {
  if (listenSocket) {
    console.log("Listening on port 9001");
  }
});
