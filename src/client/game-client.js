let MessageType = require('../common/message-types');
let Fury = require('../../fury/src/fury.js');
let Shaders = require("./shaders");

// glMatrix
let vec3 = Fury.Maths.vec3;

// Game Client
// Handles the visuals, local player movement, and interp of remote clients
let GameClient = module.exports = (function(){
  let exports = {};

  let glCanvas;
  let resolutionFactor = 1, cameraRatio = 16 / 9;
  let camera = Fury.Camera.create({
    near: 0.1,
    far: 10000,
    fov: 1.0472,
    ratio: cameraRatio,
    position: vec3.fromValues(0, 2, 3)
  });
  let scene = Fury.Scene.create({ camera: camera, enableFrustumCulling: true });
  let world = require('./world').create();

  let localId = -1;
  let localNick = "";
  let sendMessage; // fn expects simple obj to send, does not expect you to send id - server will append

  // TODO: Player class which can take isReplica
  // TODO: List of players to update

  let serverState = {
    players: [] // Contains id, position, nick
  };

  let handleInitialServerState = (state) => {
    serverState = state;
    // TODO: Spawn replica  for all existing players
  };

  let updateCanvasSize = (event) => {
  	glCanvas.width = resolutionFactor * glCanvas.clientWidth;
  	glCanvas.height = resolutionFactor * glCanvas.clientHeight;
  	cameraRatio = glCanvas.clientWidth / glCanvas.clientHeight;
  	if (camera && camera.ratio) camera.ratio = cameraRatio;
  };

  let lastTime = 0;
  let loop = () => {
    let elapsed = Date.now() - lastTime;
    lastTime += elapsed;
    if (elapsed > 66) elapsed = 66;
    // ^^ Minimm 15 FPS - this is primarily to compenstate for alt-tab / focus loss
    elapsed /= 1000;  // Convert to seconds

    // player.update(elapsed);

    scene.render();

    // TODO: Inform input that frame has finished (keyup / keydown calculation)

    window.requestAnimationFrame(loop);
  };

  exports.init = (nick, sendDelegate) => {
    sendMessage = sendDelegate;
    localNick = nick;

    glCanvas = document.getElementById("fury");
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    Fury.init("fury"); // Consider anti-alias false

    // Shader.create requires Fury to be initialised (i.e. it needs a gl context)
    let testMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.UnlitTextured) });
    testMaterial.loadTexture = (src, callback) => {
      var image = new Image();
      image.onload = () => {
        testMaterial.textures["uSampler"] = Fury.Renderer.createTexture(image, "high");
        callback();
      };
      image.src = src;
    };

    world.createTestLevel(scene, testMaterial);

    // Start loading assets - TODO: have an asset loader with a callback once done
    // Use Hestia as inspiration, it had a much better system
    testMaterial.loadTexture("/images/checkerboard.png", () => {
      lastTime = Date.now();
      window.requestAnimationFrame(loop);
    });
  };

  exports.onmessage = (message) => {
    switch(message.type) {
      case MessageType.ACKNOWLEDGE:
        localId = message.id;
        handleInitialServerState(message.data);
        sendMessage({ type: MessageType.GREET, nick: localNick });
        break;
      case MessageType.CONNECTED:
        serverState.players[message.id] = message.player;
        if (message.id == localId) {
          localNick = message.player.nick;
          // TODO: Spawn own player
        } else {
          // TODO: Spawn replica
        }
        break;
      case MessageType.DISCONNECTED:
        serverState.players[message.id] = null;
        // TODO: Despawn player visuals
        break;
      case MessageType.POSITION:
        serverState.players[message.id].position = message.position;
        // Set Player Positions (& Inputs if not local)
        // Remember incoming position array will be JS array (probably)
        // so *copy* across the values into vec3
        // Equally when sending position update copy into a JS array
        break;
    }
  };

  return exports;
})();
