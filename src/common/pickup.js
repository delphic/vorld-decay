// This might be more generic than pickup but I can't think of a better name
// These are objects that exist in the world, and if a player root is in bounds
// they either pick it up automatically or they can press a key to pick it up.
// They also need to be droppable / spawnable

// I've conflated the pickup trigger with the pickup object, might want
// separate these at some point :shrug:

let Maths = require('../../fury/src/maths');
let Physics = require('../../fury/src/physics');
let vec3 = Maths.vec3, quat = Maths.quat;

let Pickup = module.exports = (function() {
  let exports = {};
  let prototype = {
    canPickup: function(playerPosition) { // bounds check might be nice
      return this.enabled && Physics.Sphere.contains(playerPosition, this.sphere);
    },
    getCoreIndex: function() {
      switch (this.visualId) {
        case visualIds.REDCORE:
          return 0;
        case visualIds.BLUECORE:
          return 1;
        case visualIds.YELLOWCORE:
          return 2;
        case visualIds.GREENCORE:
          return 3;
        default:
          return -1;
      }
    }
  };

  let visualIds = exports.visualIds = { // These really should have underscores between words
    REDCORE: "redcore",
    BLUECORE: "bluecore",
    YELLOWCORE: "yellowcore",
    GREENCORE: "greencore"
  };

  exports.create = function(params) { // expects: id, position, visualId - optional: rotation, autoPickup, radius, enabled
    let pickup = Object.create(prototype);

    pickup.id = params.id;
    pickup.visualId = params.visualId // Used by pickup visuals to know what to make this look like! also is type info
    pickup.autoPickup = params.autoPickup;
    pickup.position = params.position;

    if (params.enabled) {
      pickup.enabled = params.enabled;
    } else {
      pickup.enabled = true;
    }

    if (params.rotation) {
      pickup.rotation = params.rotation;
    } else {
      pickup.rotation = quat.create();
    }

    let radius = 1;
    if (params.radius) {
      radius = params.radius;
    }

    pickup.sphere = Physics.Sphere.create({
      center: pickup.position,  // Reference link position
      radius: radius
    });

    return pickup;
  };

  return exports;
})();
