let Fury = require('../../fury/src/fury.js');
let Primitives = require('./primitives');
let Physics = Fury.Physics;
let vec3 = Fury.Maths.vec3;

let World = module.exports = (function() {
  // Contains AABB of the world environment

  var exports = {};
  var prototype = {
    addBox: function(w, h, d, x, y, z) {
      let position = vec3.fromValues(x, y, z);
      let size = vec3.fromValues(w, h, d);
      let mesh = Fury.Mesh.create(Primitives.createCuboidMesh(w, h, d));
      let box = Physics.Box.create({ center: position, size: size });

      this.boxes.push(box); // Arguably we could add to scene and use object.bounds as set by the scene
      return { mesh: mesh, position: position, static: true };
    }
  };

  exports.create = function(params) {
    let world = Object.create(prototype);

    world.boxes = [];

    // Placeholder level creation
    world.createTestLevel = (scene, material) => {
      // Q: Who's job is it to add visuals to the scene?
      let addStaticBoxToScene = (w, h, d, x, y, z) => {
        let box = world.addBox(w, h, d, x, y, z);
        box.material = material;
        scene.add(box);
      };

      addStaticBoxToScene(10, 4, 1, 0, 2, 5.5);   // walls
      addStaticBoxToScene(10, 4, 1, 0, 2, -5.5);
      addStaticBoxToScene(1, 4, 10, 5.5, 2, 0);
      addStaticBoxToScene(1, 4, 10, -5.5, 2, 0);
      addStaticBoxToScene(10, 1, 10, 0, -0.5, 0); // floor
      addStaticBoxToScene(10, 1, 10, 0, 4.5, 0);  // roof
    };

    return world;
  };

  return exports;
})();
