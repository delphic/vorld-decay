let uWS = require('uWebSockets.js');
let CloseCode = require('./common/websocket-close-codes');

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

let Connections = require('./server/connections');
Connections.init(maxConnections, isLocalHost);

let GameServer = require('./common/game-server');
GameServer.init(
  // For local relay don't want to have to stringfy so we do that in the
  // functions we pass to the game server/
  (id, message) => { Connections.sendMessage(id, JSON.stringify(message)); },
  (id, message) => { Connections.distribute(id, JSON.stringify(message)); }
);

app.ws("/*", {
  idleTimeout: idleTimeout,
  maxBackpressure: 1024,	// NOTE: A web socket won't "publish" messages but will send them if backpressure reached
	maxPayloadLength: 512,	// If received payload is greater than max payload length connection is closed immediately
	compression: uWS.DEDICATED_COMPRESSOR_3KB,	// I don't know what the trade offs of different compressions are... maybe find out?
  /* WS events */
	/* DOCS: https://unetworking.github.io/uWebSockets.js/generated/interfaces/websocketbehavior.html */
	open: (ws) => {
    if (Connections.wsopen(ws)) {
      GameServer.onclientconnect(ws.id);
    }
  },
  message: (ws, message, isBinary) => {
    // Assuming JSON for now
    let json = Buffer.from(message).toString();
    GameServer.onmessage(ws.id, JSON.parse(json), isBinary);
  },
  drain: (ws) => { /* Backed up message sent, if we were throttling we could now lift it - should check ws.getBufferedAmount() to drive throttling */ },
  close: (ws, code, message) => {
    let id = ws.id;
    if (Connections.wsclose(ws)) {
      GameServer.onclientdisconnect(id);
    } else if (code != CloseCode.SERVER_FULL) {
      if (isLocalHost) console.log("Untracked ws connection closed");
    }
  }
});

app.get("/*", (res, req) => {
	res.writeStatus('200 OK').end("Vorld Decay Server Running, " + Connections.getConnectionCount() + " connected clients.");
});

app.listen(9001, (listenSocket) => {
  if (listenSocket) {
    console.log("Listening on port 9001");
  }
});
