// Character Controller handles physics and movement for characters (players)
let Fury = require('../../fury/src/fury.js');
let Physics = Fury.Physics;
let Maths = Fury.Maths;
let vec2 = Maths.vec2, vec3 = Maths.vec3, quat = Maths.quat;

var CharacterController = module.exports = (function() {
  var exports = {};
  var prototype = {};

  exports.create = (params) => {
    let controller = Object.create(prototype);

    let player = params.player;

    let lastPosition = vec3.clone(player.position);
    let targetPosition = vec3.clone(player.position);

    let box = Physics.Box.create({
      center: player.position,
      size: vec3.clone(player.size)
    });

    controller.stepHeight = params.stepHeight;

    // Assumes box collider - check Fury/CharacterController demo for sphere options
    controller.move = function(delta) {

      vec3.copy(lastPosition, player.position);
    	vec3.add(targetPosition, player.position, delta);


      // Move player to new position for physics checks
    	vec3.copy(player.position, targetPosition);

      // playerBox.center has changed because it's set to the playerPosition ref
      box.calculateMinMax(box.center, box.extents);

      // TODO: Improved Collision Algorithm
      // (Account for corner cases and flush colliders when moving)
      // Use swept bounds (will catch things you would pass through)
      // Get All Intersections
      // Evaluate each axis against all intersections (check for enter)
      // Get distance by looking at min / max (accounting for movement direction)
      // Break ties based on previous frame velocity
      // Whichever entry for that axis is closest - cancel movement on that axis (or step)
      // Recalculate bounds against other boxes if still entering on other axis
      // if stop, or any axis if step - cancel movement or step if haven't already
      // (cancel step if moving on same axis)
      // After these are resolved if stepped
      // check against world again and cancel all movement if entering
      // this is specifically to stop you entering the ceiling but it's a nice catch all too

      // We used to have the collision handling outside the loop, but has we need to continue
    	// the loops I moved it inside, a world collision method which returned a list of boxes
    	// that overlapped would be acceptable.
      let stepCount = 0, stepX = false, stepZ = false;
    	for (let i = 0, l = player.world.boxes.length; i < l; i++) {
        let worldBox = player.world.boxes[i];
        if (Physics.Box.intersect(box, worldBox)) {
            // Check each axis individually and only stop movement on those which changed from
          // not overlapping to overlapping. In theory we should calculate distance and move
          // up to it for high speeds, however we'd probably want a skin depth, for the speeds
          // we're travelling, just stop is probably fine
          // BUG: You can get stuck on corners of flush surfaces when sliding along them
          // Should be resolvable if we find all colliding boxes first then respond with full information
          if (Physics.Box.enteredX(worldBox, box, player.position[0] - lastPosition[0])) {
            let separation = worldBox.max[1] - box.min[1];
            if (stepCount == 0 && !stepX && separation <= controller.stepHeight) {
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
          if (Physics.Box.enteredZ(worldBox, box, player.position[2] - lastPosition[2])) {
            let separation = worldBox.max[1] - box.min[1];
            if (stepCount == 0 && !stepZ && separation <= controller.stepHeight) {
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
          if (Physics.Box.enteredY(worldBox, box, player.position[1] - lastPosition[1])) {
            player.position[1] = lastPosition[1];
            // TODO: If stepped should reset those too?
          }
            // Note this only works AABB, for OOBB and other colliders we'd probably need to get
          // impact normal and then convert the movement to be perpendicular, and if there's multiple
          // collider collisions... ?
            // Update target position and box bounds for future checks
          vec3.copy(targetPosition, player.position);
          box.calculateMinMax(box.center, box.extents);
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
    controller.yMove = function(dy) {
      vec3.copy(lastPosition, player.position);
      vec3.scaleAndAdd(player.position, player.position, Maths.vec3Y, dy);
      // TODO: yVelocity can get big, should really be doing a cast check
      // rather than intersect check
      // playerBox.center has changed because it's set to the playerPosition ref
      box.calculateMinMax(box.center, box.extents);
      let collision = false;
      for (let i = 0, l = player.world.boxes.length; i < l; i++) {
        if (Physics.Box.intersect(box, player.world.boxes[i])) {
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

    return controller;
  };

  return exports;
})();
