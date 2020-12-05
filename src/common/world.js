let Fury = require('../../fury/src/fury.js');
let Physics = Fury.Physics; // Could *just* import physics and maths
let vec3 = Fury.Maths.vec3;

let World = module.exports = (function() {
  // Contains AABBs of the world environment
  // In charge of adding relevant objects to world based on level name

  var exports = {};
  var prototype = {
    addBox: function(w, h, d, x, y, z) {
      let position = vec3.fromValues(x, y, z);
      let size = vec3.fromValues(w, h, d);
      let box = Physics.Box.create({ center: position, size: size });
      this.boxes.push(box);
      return box;
    }
  };

  exports.create = function(params) {
    let world = Object.create(prototype);

    world.boxes = [];

    world.createLevel = (levelName) => {
      let level = [];
      switch(levelName) {
        case "test":
          // Placeholder level creation
          level.push(world.addBox(10, 4, 1, 0, 2, 5.5));   // walls
          level.push(world.addBox(10, 4, 1, 0, 2, -5.5));
          level.push(world.addBox(1, 4, 10, 5.5, 2, 0));
          level.push(world.addBox(1, 4, 10, -5.5, 2, 0));
          level.push(world.addBox(10, 1, 10, 0, -0.5, 0)); // floor
          level.push(world.addBox(10, 1, 10, 0, 4.5, 0));  // roof
          break;
      }
      return level;
    };

    return world;
  };

  return exports;
})();
