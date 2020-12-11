let Maths = require('../../../Fury/src/maths');
let vec3 = Maths.vec3;

let TeleporterVisuals = module.exports = (function() {
	let exports = {};
	let prototype = {};

	let size = exports.size = 3;

	exports.create = (params) => {
		let WorldVisuals = params.worldVisuals;	// Something funny happening with require can't be bothered to investigate
		let visuals = Object.create(prototype);

		visuals.teleporter = params.teleporter;

		visuals.indicators = [];

		let center = vec3.clone(params.teleporter.bounds.center);
		center[1] = params.teleporter.bounds.min[1];

		let offset = (size / 2) - 0.05;
		let position = null;
		let material = params.teleporter.controls.length ? WorldVisuals.blackMaterial : WorldVisuals.whiteMaterial;
		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, -offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, -offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, -offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, +offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, +offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, -offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, +offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, +offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		visuals.onmessage = (message) => {
			switch (message) {
				case "powered":
					// Trigger powered visuals
					for (let i = 0, l = visuals.indicators.length; i < l; i++) {
						visuals.indicators[i].material = WorldVisuals.whiteMaterial;
					}
					break;
				case "unpowered":
					// Trigger unpowered visuals
					for (let i = 0, l = visuals.indicators.length; i < l; i++) {
						visuals.indicators[i].material = WorldVisuals.blackMaterial;
					}
					break;
			}
		};

		return visuals;
	};

	return exports;
})();
