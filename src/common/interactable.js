// A static world object which can be interacted with in some way
// This might be better described as a static trigger (with pickup being a dynamic trigger)
let Maths = require('../../fury/src/maths');
let Bounds = require('../../fury/src/bounds');
let quat = Maths.quat, vec3 = Maths.vec3;

let Interactable = module.exports = (function() {
  let exports = {};
  let prototype = {
    interact: function(heldItem) {
      /* by default do nothing but have an interact method */
      /* Should return a position to move item to if heldItem was taken */
    },
    canInteract: function(position) {
      return Bounds.contains(position, this.bounds);
    }
  };

  // Arguably rather than this enum/switch based pattern on type we could have other modules
  // which Object.create(Interactable.create(params)); and then add additional logic / setup
  var Type = exports.Type = {
    // Sound maker
    // Core Charger / Dispenser (?)
    TELEPORTER_CONTROL: "teleporter_control"
  };

  let createTeleporterControl = function(interactable, params) {
    interactable.teleporter = params.teleporter;
    // TODO: Push this control to teleporter (probably easier to have multiple)
    // power block points requiring cores each than one requiring multiple

    if (params.powerRequirements != null) {
      interactable.powerRequirements = params.powerRequirements;  // Array of core numbers needed
    } else {
      interactable.powerRequirements = [];
    }
    if (params.startingPower != null) {
      interactable.power = params.startingPower;
    } else {
      interactable.power = [];
    }
    // Fill power array with numbers
    for (let i = interactable.power.length; i < interactable.powerRequirements.length; i++) {
      interactable.power[i] = 0;
    }

    interactable.isPowered = function() {
      if (interactable.powerRequirements) {
        for (let i = 0, l = interactable.power.length; i < l; i++) {
          if (interactable.power[i] < interactable.powerRequirements[i]) {
            return false;
          }
        }
      }
      return true;
    };

    // TODO: Replace these messages with observer pattern
    let message = function(message) {
      if (interactable.visual && interactable.visual.onmessage) {
        interactable.visual.onmessage(message);
      }
    };

    let messageTeleporter = function(message) {
      if (interactable.teleporter.visual && interactable.teleporter.visual.onmessage) {
        interactable.visual.onmessage(message);
      }
    };

    let attachPosition = vec3.create();

    interactable.interact = function(heldItem) {
      if (!interactable.isPowered()) {
        if (heldItem) {
          let coreIndex = heldItem.getCoreIndex();
          if (coreIndex >= 0 && coreIndex < interactable.power.length
            && interactable.power[coreIndex] < interactable.powerRequirements[coreIndex]) {
            // Interaction successful - took power core
            interactable.power[coreIndex] += 1;
            if (interactable.isPowered()) {
              // Enable teleporter
              // TODO: Just tell the teleporter you're powered
              // that way it can decide depending on how many control panels it has
              interactable.teleporter.enabled = true;
              message("powered");
              messageTeleporter("powered");
            } else {
              message("took_core");
            }
            // HACK: place at bounds center - z
            vec3.scaleAndAdd(attachPosition, interactable.bounds.center, Maths.vec3Z, -1);
            return attachPosition;
          } else {
            // Interaction Unsuccessful - invalid core and unpowered
            message("invalid_core");
          }
        } else {
          // Interaction Unsuccessful - unpowered
          message("unpowered");
        }
      } else {
        // Interaction (un)successful - already powered
        message("already_powered");
      }

      return null;
      // Q: Maybe control panel should toggle teleporter even if power requirements met?
    };

    // Disable teleporter if unpowered
    if (!interactable.isPowered()) {
      interactable.teleporter.enabled = false;
    }
  };

  exports.create = (params) => {
    // Required: id, type, min, size (+ more based on type)
    let interactable = Object.create(prototype);

    // Currently don't expect interactables to move
    // if they need to move in future will need to make sure bounds
    // are recalculated when queried and/or when moved

    interactable.id = params.id;  // Consider just using guids c.f. https://github.com/uuidjs/uuid
    interactable.type = params.type;
    // NOTE: no enabled option as we should respond even if 'disabled' based on state

    // Interaction bounds
    let size;
    if (params.size) {
      size = params.size;
    } else {
      size = vec3.fromValues(1,2,1);
    }
    let min = vec3.clone(params.min);
    let max = vec3.create();
    vec3.add(max, min, size);
    interactable.bounds = Bounds.create({ min: min, max: max });

    // Append interact method
    switch(params.type) {
      case Type.TELEPORTER_CONTROL: // requires params.teleporter, optional: powerRequirements, startingPower
        createTeleporterControl(interactable, params);
        break;
    }

    return interactable;
  };

  return exports;
})();
