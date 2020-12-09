let Fury = require('../../fury/src/fury.js');
let Physics = Fury.Physics; // Could *just* import physics and maths
let Maths = Fury.Maths;
let vec3 = Maths.vec3, quat = Maths.quat;
let Vorld = require('./vorld/vorld');
let VorldConfig = require('./vorld/config');
let Pickup = require('./pickup');
let Interactable = require('./interactable');

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
    },
    getPickup: function(id) {
      if (id) {
        let pickups = this.pickups;
        for (let i = 0, l = pickups.length; i < l; i++) {
          if (pickups[i] && pickups[i].id == id) {
            return pickups[i];
          }
        }
      }
      return null;
    },
    getInteractable: function(id) {
      if (id) {
        let interactables = this.interactables;
        for (let i = 0, l = interactables.length; i < l; i++) {
          if (interactables[i] && interactables[i].id === id) {
            return interactables[i];
          }
        }
      }
      return null;
    }
  };

  exports.create = function(params) {
    let world = Object.create(prototype);
    // We may want one of these *per* section
    let vorld = Vorld.create({ chunkSize: 32 });

    world.vorld = vorld;
    world.boxes = [];
    world.teleporters = [];
    world.pickups = [];     // Dynamic so are networked in game server
    world.initialSpawnPosition = [0, 1, 0];
    world.interactables = [];

    let fill = function(xMin, xMax, yMin, yMax, zMin, zMax, block) {
      for (let x = xMin; x <= xMax; x++) {
        for (let z = zMin; z <= zMax; z++) {
          for (let y = yMin; y <= yMax; y++) {
            Vorld.addBlock(vorld, x, y, z, block);
          }
        }
      }
    };

    let createRoom = function(x,y,z, w,h,d) {
      let wall = VorldConfig.BlockIds.STONE_BLOCKS;
      let floor = VorldConfig.BlockIds.STONE;
      let ceiling = VorldConfig.BlockIds.STONE;

      // existing w = 9 x = -4
      // d = 9 z = -4
      // h = 4 y = 0
      fill(x,x+w-1, y,y+h-1, z+d,z+d, wall);
      fill(x,x+w-1, y,y+h-1, z-1,z-1, wall);
      fill(x+w,x+w, y,y+h-1, z,z+d-1, wall);
      fill(x-1,x-1, y,y+h-1, z,z+d-1, wall);

      fill(x,x+w-1, y+h,y+h, z,z+d-1, ceiling);
      fill(x,x+w-1, y-1,y-1, z,z+d-1, floor);
    }

    // Teleporters are 3x3 with collision bounds of 1x2x1 (whilst we have instant teleport)
    let createTeleporter = function(x, y, z, targetPoint, targetRotation) {
      let teleporterBlock = VorldConfig.BlockIds.GRASS;
      fill(x-1,x+1, y-1,y-1, z-1,z+1, teleporterBlock); // half step at y would be nice

      let teleporterBounds = Physics.Box.create({
        min: vec3.fromValues(x, y, z),
        max: vec3.fromValues(x+1, y+2, z+1)
      });
      // TODO: Would be cool to add an outer bounds which starts some kinda visual change
      // when you enter it (client side only), and potentially would act as the enabler for
      // the inner bounds on server side.
      let teleporter = {
        enabled: true,
        targetPosition: targetPoint,
        targetRotation: targetRotation,
        bounds: teleporterBounds,
        controls: [],
        onmessage: function(message) {
          if (message == "control_powered") {
            let wasPowered = this.enabled;
            let powered = true;
            for (let i = 0, l = this.controls.length; i < l; i++) {
              if (!this.controls[i].isPowered()) {
                powered = false;
                break;
              }
            }
            this.enabled = powered;
            if (!wasPowered && powered && this.visual && this.visual.onmessage) {
                this.visual.onmessage("powered")
            }
          }
        }
      };
      world.teleporters.push(teleporter);
      return teleporter;
    };

    let createTeleporterControl = function(id, x, y, z, teleporter, powerRequirements) {
      let teleporterControlBlock = VorldConfig.BlockIds.PLANKS;
      fill(x,x,y,y,z,z, teleporterControlBlock);
      let control = Interactable.create({
        id: id,
        type: Interactable.Type.TELEPORTER_CONTROL,
        min: vec3.fromValues(x,y,z+1), // default size 1,2,1
        teleporter: teleporter,
        powerRequirements: powerRequirements
      });
      world.interactables.push(control);
    };

    let createPickup = function(id, visualId, x, y, z, radius, autoPickup) {
      world.pickups.push(Pickup.create({
        id: id,
        visualId: visualId,
        position: vec3.fromValues(x,y,z),
        radius: radius,
        autoPickup: !!autoPickup
      }));
    };

    let createTestSteps = function(level) {
      // test steps!
      level.push(world.addBox(-0.25, 0.25, 0, 0.25, -3.5, -3));
      level.push(world.addBox(-0.25, 0.25, 0, 0.5, -4, -3.5));
    };

    world.createLevel = (levelName) => {
      switch(levelName) {
        case "debug":
          // Placeholder level creation
          createRoom(-5,0,-10, 11,5,11);
          // Note target position should add player y extents as player position
          // isn't at the bottom of it's box cause we're insane
          let targetPosition = vec3.fromValues(-99.5,1,0.5);
          createTeleporterControl(
            "teleporter_control_1",
            -2, 0, -9,
            createTeleporter(0, 0,-9, targetPosition, Maths.quatEuler(0, 180, 0)),
            [1] // requires one red core
          );
          createPickup("test_pickup1", Pickup.visualIds.REDCORE, -3, 0.5, -9, 1.5, false);


          let d = 30;
          createRoom(-101, 0, -1, 3, 3, d);
          createTeleporter(-100, 0, d-3, vec3.fromValues(101,1,0.5), Maths.quatEuler(0, 180+45, 0));

          createRoom(100, -4, -1, 30, 8, 20);
          createTeleporter(128, -4, 0, vec3.fromValues(0.5,3,0.5), Maths.quatEuler(0, 0, 0));
          break;
      }
    };

    // TODO: Create spawn mehtods with listeners

    return world;
  };

  return exports;
})();
