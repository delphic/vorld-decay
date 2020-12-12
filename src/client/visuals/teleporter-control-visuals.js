let Maths = require('../../../Fury/src/maths');
let vec3 = Maths.vec3;

let TeleporterControlVisuals = module.exports = (function() {
	let exports = {};
	let prototype =  {};

	exports.create = (params) => {
		let WorldVisuals = params.worldVisuals; // I dont' know what's up with require but it wasn't working so passing it manually :shrug:
			// expected: interactable (of type teleporter control), scene
			let visuals = Object.create(prototype);

		let interactable = params.interactable;
		visuals.interactable = interactable;

		// Create indicators of required power type
		if (interactable.powerRequirements && interactable.powerRequirements.length) {
			// TODO: Support multiple requirements
			let colorIndex = 0;
			for (; colorIndex < interactable.powerRequirements.length; colorIndex++) {
				if (interactable.powerRequirements[colorIndex] > 0) {
					break;
				}
			}

			let material = null;
			switch(colorIndex) {
				case 0:
					material = WorldVisuals.redMaterial;
					break;
				case 1:
					material = WorldVisuals.blueMaterial;
					break;
				case 2:
					material = WorldVisuals.yellowMaterial;
					break;
				case 3:
					material = WorldVisuals.greenMaterial;
					break;
			}

			visuals.indicators = [];
			let position = vec3.clone(interactable.bounds.min);
			// This is a horrible hack, visual position you changes the interaction bounds
			vec3.add(position, position, Maths.vec3X);
			vec3.add(position, position, Maths.vec3Z);
			vec3.add(position, position, Maths.vec3Y);
			vec3.scaleAndAdd(position, position, Maths.vec3Z, -0.9);
			vec3.scaleAndAdd(position, position, Maths.vec3X, 0.1);

			visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

			let position2 = vec3.clone(position);
			vec3.scaleAndAdd(position2, position2, Maths.vec3X, 0.8);
			visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position2 }));
		}

		visuals.onmessage = (message) => {
				switch(message) {
					case "init":  // Valid for all interactable visuals
						// State was non-standard on connect, update for teleporter state
						console.log("Init called on control visuals");
						// TODO: notify interactable.teleporter as to powered state
						break;
					case "powered":
						// Was not powered has become powered
						console.log("Control is now powered");
						break;
					case "took_core":
						// Took core but still needs more
						console.log("Thank you for your donation");
						break;
					case "invalid_core":
						// Tried to give the control a core it didn't need
						console.log("I don't want that one");
						break;
					case "unpowered":
						// Tried to interact with control with no core
						console.log("I need more power cores");
						break;
					case "already_powered":
						// Tried to interacted with control when already powered
						console.log("I'm all good thanks!");
						break;
				}
		}

		return visuals;
	};

	return exports;
})();
