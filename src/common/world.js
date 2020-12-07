let Fury = require('../../fury/src/fury.js');
let Physics = Fury.Physics; // Could *just* import physics and maths
let vec3 = Fury.Maths.vec3;
let Vorld = require('./vorld/vorld');
let VorldConfig = require('./vorld/config');

let World = module.exports = (function() {
  // Contains AABBs of the world environment
  // and more importantly the 'vorld' which is the voxel data
  // In charge of adding relevant objects to world based on level name

  var exports = {};
  var prototype = {
    addBox: function(xMin, xMax, yMin, yMax, zMin, zMax) {
      let min = vec3.fromValues(xMin, yMin, zMin);
      let max = vec3.fromValues(xMax, yMax, zMax);
      let box = Physics.Box.create({ min: min, max: max });
      this.boxes.push(box);
      return box;
    },
    getIntersections: function(results, box) {
      results.length = 0;
      for (let i = 0, l = this.boxes.length; i < l; i++) {
        if (Physics.Box.intersect(box, this.boxes[i])) {
          results.push(box);
        }
      }
    }
  };

  exports.create = function(params) {
    let world = Object.create(prototype);
    // We may want one of these *per* section
    let vorld = Vorld.create({ chunkSize: 32 });

    world.vorld = vorld;
    world.boxes = [];

    let fill = function(xMin, xMax, yMin, yMax, zMin, zMax, block) {
      for (let x = xMin; x <= xMax; x++) {
        for (let z = zMin; z <= zMax; z++) {
          for (let y = yMin; y <= yMax; y++) {
            Vorld.addBlock(vorld, x, y, z, block);
          }
        }
      }
    };

    world.createLevel = (levelName) => {
      let level = [];
      switch(levelName) {
        case "test":
          let block = VorldConfig.BlockIds.STONE_BLOCKS;

          // Placeholder level creation
          // Create AABBs manually until we get collision working against chunks
          // NOTE: Voxels are at center of their coordinates... not sure how wise this is really.

          // walls
          world.addBox(-4,5, 0,4, 5,6);
          fill(-4,4, 0,3, 5,5, block);

          world.addBox(-4,5, 0,4, -5,-4);
          fill(-4,4, 0,3, -5,-5, block);

          world.addBox(5,6, 0,4, -4,5);
          fill(5,5, 0,3, -4,4, block);

          world.addBox(-5,-4, 0,4, -4,5);
          fill(-5,-5, 0,3, -4,4, block);

          world.addBox(-4,5, -1,0, -4,5); // floor
          fill(-4,4, -1,-1, -4,4, block);

          world.addBox(-4,5, 4,5, -4,5);  // roof
          fill(-4,4, 4,4, -4,4, block);

          world.addBox(0,1,0,1,0,1);  // Test Block
          fill(0,0, 0,0, 0,0, block);

          // test steps
          // level.push(world.addBox(-0.25, 0.25, 0, 0.25, -3.5, -3));
          // level.push(world.addBox(-0.25, 0.25, 0, 0.5, -4, -3.5));

          break;
      }
      return level;
    };

    return world;
  };

  return exports;
})();
