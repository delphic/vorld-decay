// Client side player
// Handles both local player and replicas
// Handles input, movement and physics
// We're going to mostly trust the clients on their position (haha)
// rather than run physics on server

// Currently just contains movement / physics code no visuals, so arguably
// could move to common

let Fury = require('../../fury/src/fury.js');
let MessageType = require('../common/message-types');

let Physics = Fury.Physics;
let Maths = Fury.Maths;
let vec2 = Maths.vec2, vec3 = Maths.vec3, quat = Maths.quat;

let Player = module.exports = (function() {
  var exports = {};
  var prototype = {};

  // static methods
  let getRoll = function(q) {
		// Used to avoid gimbal lock
    let sinr_cosp = 2 * (q[3] * q[0] + q[1] * q[2]);
    let cosr_cosp = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
    return Math.atan(sinr_cosp / cosr_cosp);
    // If you want to know sector you need atan2(sinr_cosp, cosr_cosp)
    // but we don't in this case.
  };

  // Movement Settings
  let clampAngle = 10 * Math.PI / 180;
  let movementSpeed = 2, lookSpeed = 1;
  let mouseLookSpeed = 0.1, jumpDeltaV = 3, stepHeight = 0.3;
  // Q: Do we need to scale mouseLookSpeed by canvas size?

  exports.create = (params) => {  // expected params: id, position, rotation, world, optional: isReplica
    var player = Object.create(prototype);

    // private variables
    let lastPosition = vec3.clone(params.position);
    let targetPosition = vec3.clone(params.position);
    let targetRotation = quat.create();

    let detectInput = function() {
      // Clear existing input
      player.lookInput[0] = 0;  // Show gif of failing to clear :D
      player.lookInput[1] = 0;
      player.input[0] = 0;
      player.input[1] = 0;

      // Look Input
      if (Fury.Input.isPointerLocked()) {
        player.lookInput[0] = - mouseLookSpeed * Fury.Input.MouseDelta[0];
        player.lookInput[1] = - mouseLookSpeed * Fury.Input.MouseDelta[1];
      }

      if (Fury.Input.keyDown("Left")) {
    		player.lookInput[0] += lookSpeed;
    	}
    	if (Fury.Input.keyDown("Right")) {
    		player.lookInput[0] -= lookSpeed;
    	}
    	if (Fury.Input.keyDown("Up")) {
    		player.lookInput[1] += lookSpeed;
    	}
    	if (Fury.Input.keyDown("Down")) {
    		player.lookInput[1] -= lookSpeed;
    	}

      // Movement Input
      if (Fury.Input.keyDown("w")) {
    		player.input[1] -= 1;
    	}
    	if (Fury.Input.keyDown("s")) {
    		player.input[1] += 1;
    	}
    	if (Fury.Input.keyDown("a")) {
    		player.input[0] -= 1;
    	}
    	if (Fury.Input.keyDown("d")) {
    		player.input[0] += 1;
    	}

      player.jumpInput = Fury.Input.keyDown("Space");

      if (player.updateMessage.input[0] != player.input[0]
        || player.updateMessage.input[1] != player.input[1]
        || player.updateMessage.jump != player.jumpInput) {
          player.inputDirty = true;
      }
    };

    // Maybe should move this to character controller class
    // Assumes box collider - check Fury/CharacterController demo for sphere options
    let move = function(ldx, ldz) {
      vec3.copy(lastPosition, player.position);
    	vec3.copy(targetPosition, player.position);
    	// Calculate Target Position - relies on localX/localZ being up-to-date
    	vec3.scaleAndAdd(targetPosition, targetPosition, player.localZ, ldz);
    	vec3.scaleAndAdd(targetPosition, targetPosition, player.localX, ldx);

    	// Move player to new position for physics checks
    	vec3.copy(player.position, targetPosition);

    	let collision = false;

      // playerBox.center has changed because it's set to the playerPosition ref
      player.box.calculateMinMax(player.box.center, player.box.extents);

    	// We used to have the collision handling outside the loop, but has we need to continue
    	// the loops I moved it inside, a world collision method which returned a list of boxes
    	// that overlapped would be acceptable.
    	let stepCount = 0, stepX = false, stepZ = false;
    	for (let i = 0, l = player.world.boxes.length; i < l; i++) {
        let worldBox = player.world.boxes[i];
        if (Physics.Box.intersect(player.box, worldBox)) {
          collision = true;

          // Check each axis individually and only stop movement on those which changed from
          // not overlapping to overlapping. In theory we should calculate distance and move
          // up to it for high speeds, however we'd probably want a skin depth, for the speeds
          // we're travelling, just stop is probably fine
          // BUG: You can get stuck on corners of flush surfaces when sliding along them
          // Should be resolvable if we find all colliding boxes first then respond with full information
          if (Physics.Box.enteredX(worldBox, player.box, player.position[0] - lastPosition[0])) {
            let separation = worldBox.max[1] - player.box.min[1];
            if (stepCount == 0 && !stepX && separation <= stepHeight) {
              // Step!
              stepCount = 1;
              stepX = true;
              player.position[1] += separation;
            } else {
              player.position[0] = lastPosition[0];
              if (stepX) {
                // If have stepping in this direction already cancel
                player.position[1] = lastPosition[1];
              }
            }
          }
          if (Physics.Box.enteredZ(worldBox, player.box, player.position[2] - lastPosition[2])) {
            let separation = worldBox.max[1] - player.box.min[1];
            if (stepCount == 0 && !stepZ && separation <= stepHeight) {
              // Step!
              stepCount = 1;
              stepZ = true;
              player.position[1] += separation;
            } else {
              player.position[2] = lastPosition[2];
              if (stepZ) {
                // If have stepped in this direction already cancel
                player.position[1] = lastPosition[1];
              }
            }
          }
          // Whilst we're only moving on x-z atm but if we change to fly camera we'll need this
          // Haven't tested this much as you might imagine
          if (Physics.Box.enteredY(worldBox, player.box, player.position[1] - lastPosition[1])) {
            player.position[1] = lastPosition[1];
            // TODO: If stepped should reset those too?
          }

          // Note this only works AABB, for OOBB and other colliders we'd probably need to get
          // impact normal and then convert the movement to be perpendicular, and if there's multiple
          // collider collisions... ?

          // Update target position and box bounds for future checks
          vec3.copy(targetPosition, player.position);
          player.box.calculateMinMax(player.box.center, player.box.extents);

          // TODO: if we've changed target y position because of steps we should technically re-evaluate all boxes on y axis
          // If collider and they are above us we should remove the step and cancel the x/z movement as appropriate

          // Have to check other boxes cause still moving, so no break - technically we could track which
          // axes we'd collided on and not check those in future if we wanted to try to optimize.
          // Also could break if all axes we moved in had returned true
          // Could also only check axes we were actually moving in
        }
    	}
    };

    // Simplified move just for jumping / gravity
    let yMove = function(dy) {
      vec3.copy(lastPosition, player.position);
      vec3.scaleAndAdd(player.position, player.position, Maths.vec3Y, dy);

      // TODO: yVelocity can get big, should really be doing a cast check
      // rather than intersect check

      // playerBox.center has changed because it's set to the playerPosition ref
      player.box.calculateMinMax(player.box.center, player.box.extents);
      let collision = false;
      for (let i = 0, l = player.world.boxes.length; i < l; i++) {
        if (Physics.Box.intersect(player.box, player.world.boxes[i])) {
          collision = true;
          // Only moving on one axis don't need to do the slide checks
          break;
        }
      }

      if (collision) {
        // TODO: Should move up to the object instead - y Velocity can get big when falling
        vec3.copy(player.position, lastPosition);
        if (player.yVelocity < 0) {
          player.jumping = false;
          // ^^ TODO: Need to convert this into isGrounded check, and will need to
          // change dx / dz to be against slopes if/when we introduce them
        }
        player.yVelocity = 0;
      }
    };

    // Reusable update message, also used as last input data
    player.updateMessage = {
      type: MessageType.POSITION,
      position: [0,0,0],
      rotation: [0,0,0,1],
      input: [0,0],
      jump: false,
      yVelocity: 0
    };

    player.id = params.id;
    player.isReplica = !!params.isReplica;
    player.world = params.world;
    player.position = params.position;
    player.rotation = params.rotation;
    player.lookRotation = params.rotation;
    player.localX = vec3.create();
    player.localZ = vec3.create();
    player.jumping = false;
    player.yVelocity = 0;
    player.box = Physics.Box.create({ center: player.position, size: vec3.fromValues(0.5, 2, 0.5) });

    // Input tracking / public setters (for replicas)
    player.input = [0,0];
    player.lookInput = [0, 0];  // Not networked, simply slerp rotation to target
    player.jumpInput = false;
    player.inputDirty = false;  // set to true if position changes (not rotation)
    player.stateDirty = false;  // set to true if position, rotation changes

    // The fact movement is dependent on rotation and we're not networking it
    // as often means we're going to get plenty of misprediction with extrapolation
    // we might want to switch to smoothed interp of previous positions instead

    player.setReplicaState = (updateMessage) => {
      // Copy across current position and inputs (for extrapolation)
      quat.copy(targetRotation, updateMessage.rotation);
      vec3.copy(player.position, updateMessage.position);
      vec2.copy(player.input, updateMessage.input);
      player.jumpInput = updateMessage.jumpInput;
      player.yVelocity = updateMessage.yVelocity;
    };

    player.update = function(elapsed) {
      if (!player.isReplica) {
        detectInput(); // Note handles setting player.inputDirty
      } // else was set by server

      // Rotation
      if (player.isReplica) {
        quat.slerp(player.lookRotation, targetRotation, player.lookRotation, 0.25);
      } else {
        Maths.quatRotate(player.lookRotation, player.lookRotation, elapsed * player.lookInput[0], Maths.vec3Y);
        let roll = getRoll(player.lookRotation);  // Note: non-atan2 version, doesn't work with atan2
        if (Math.sign(roll) == Math.sign(player.lookInput[1]) || Math.abs(roll - elapsed * player.lookInput[1]) < 0.5 * Math.PI - clampAngle) {
          quat.rotateX(player.lookRotation, player.lookRotation, elapsed * player.lookInput[1]);
        }
        // TODO: Translate this to camera
      }
      // TODO: Set player rotation to rotation around Y and nothing else
      // Could try using calculateYaw + setAxisAngle around Maths.vec3Y

      // Calculate Local Axes from updated rotation
      vec3.transformQuat(player.localX, Maths.vec3X, player.lookRotation);
    	vec3.transformQuat(player.localZ, Maths.vec3Z, player.lookRotation);
      player.localZ[1] = 0; // Wouldn't be necessary if we could use player.rotation
    	player.localX[1] = 0;

      // Movement
      let norm = (player.input[0] !== 0 && player.input[1] !== 0) ? (1 / Math.SQRT2) : 1;
      move(norm * movementSpeed * elapsed * player.input[0], norm * movementSpeed * elapsed * player.input[1]);

      // Gravity
      if (!player.jumping && player.jumpInput) {
        player.jumping = true;
        player.yVelocity = jumpDeltaV;
      } else {  // Note - no !isGrounded check, relies on elapsed staying sane
        player.yVelocity -= 9.8 * elapsed;
      }
      yMove(player.yVelocity * elapsed);

      if (!player.isReplica) {
        // Update Update Message and set dirty flag
        if (!vec3.equals(player.updateMessage.position, player.position) || !quat.equals(player.updateMessage.rotation, player.rotation)) {
          player.stateDirty = true;
          // Something outside will handle setting false
        }

        vec3.copy(player.updateMessage.position, player.position);
        vec3.copy(player.updateMessage.rotation, player.rotation);
        vec2.copy(player.updateMessage.input, player.input);
        player.updateMessage.jump = player.jumpInput;
        player.updateMessage.yVelocity = player.yVelocity;
      }
    };

    return player;
  };

  return exports;
})();
