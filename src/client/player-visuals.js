let Fury = require('../../fury/src/fury.js');
let Primitives = require('./primitives');
let Shaders = require('./shaders');

let PlayerVisuals = module.exports = (function() {
  let exports = {};
  let prototype = {};

  let playerMesh, playerMaterial;

  exports.init = () => {
    playerMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.UnlitColor) });
    playerMaterial.color = [ 1.0, 0.0, 0.3 ];
    // Should we save creating the mesh until we know the player proportions?
    playerMesh = Fury.Mesh.create(Primitives.createCuboidMesh(0.5, 1.5, 0.5));
  };

  exports.create = (player, scene) => {
    let visuals = scene.add({
      mesh: playerMesh,
      material: playerMaterial,
      position: player.position,
      rotation: player.rotation
    });
    return visuals;
  };

  return exports;
})();