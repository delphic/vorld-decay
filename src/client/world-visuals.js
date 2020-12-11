let Fury = require('../../Fury/src/fury.js');
let Shaders = require('./shaders');
let Primitives = require('./primitives');
let Pickup = require('../common/pickup');
let Interactable = require('../common/interactable');

// TODO: Maybe move these under a single visuals module
let TeleporterVisuals = require('./visuals/teleporter-visuals');
let TeleporterControlVisuals = require('./visuals/teleporter-control-visuals');

let vec3 = Fury.Maths.vec3;

// Implicitly contains pickup / core visuals
// arguably should split those out into separate modules

let WorldVisuals = module.exports = (function() {
	let exports = {};

	let atlasMaterial, debugMaterial;
	let useCoreModels = false;
	// Making assets is taking a looong time, which we dont' have back to colored
	// cubes but this toggle is here in the unlikely event we get time to come back
	let redMaterial, blueMaterial, yellowMaterial, greenMaterial;
	let redCoreMesh, blueCoreMesh, yellowCoreMesh, greenCoreMesh;

	let chunkObjects = [];

	exports.init = (callback) => {
		// Shader.create requires Fury to be initialised (i.e. it needs a gl context)
		// So this init needs to be called after Fury.init

		// TODO: have an asset loader with a combined callback once done
		// Use Hestia as inspiration, it had a much better system
		let itemsToLoad = 0;
		let loadCallback = () => {
			itemsToLoad -= 1;
			if (itemsToLoad == 0) {
				callback();
			}
		};

		let fogColor = vec3.fromValues(0,0,0.01);
		let glowShaderFogDensity = 0.1;  // Also set in player-visuals.js

		let applyLightingInfo = function(material) {
			material.lightDir = vec3.fromValues(-1.0, 2.0, 1.0); // Was -1, 2, 1
			material.lightColor = vec3.fromValues(1.0, 1.0, 1.0);
			material.ambientColor = vec3.fromValues(0.5, 0.5, 0.5);
			material.fogColor = fogColor;
			material.fogDensity = 0.125;
		}

		let createGlowShader = function(shader, color) {
			let material = Fury.Material.create({ shader: shader });
			material.color = color;
			material.fogColor = fogColor;
			material.fogDensity = glowShaderFogDensity;
			return material;
		}

		// Quick mesh used for visual indicators
		exports.indicatorMesh = Fury.Mesh.create(Primitives.createCubeMesh(0.1));;

		let glowShader = Fury.Shader.create(Shaders.ColorFog);
		// TODO: ^^ A cache of created shaders might be a good idea or we're going to be swapping shader programs unnecessarily

		// Placeholder core visuals
		if (useCoreModels) {
			let coreShader = Fury.Shader.create(Shaders.LitVertexColor);
			redMaterial = Fury.Material.create({ shader: coreShader });
			redMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(redMaterial);
			blueMaterial = Fury.Material.create({ shader: coreShader });
			blueMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(blueMaterial);
			yellowMaterial = Fury.Material.create({ shader: coreShader });
			yellowMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(yellowMaterial);
			greenMaterial = Fury.Material.create({ shader: coreShader });
			greenMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(greenMaterial);
		} else {
			let cubeCoreMesh = Fury.Mesh.create(Primitives.createCubeMesh(0.25));
			redCoreMesh = blueCoreMesh = yellowCoreMesh = greenCoreMesh = cubeCoreMesh;

			redMaterial = createGlowShader(glowShader, vec3.fromValues(0.9, 0, 0.1));
			exports.redMaterial = redMaterial;

			blueMaterial = createGlowShader(glowShader, vec3.fromValues(0, 0.9, 0.9));
			exports.blueMaterial = blueMaterial;

			yellowMaterial = createGlowShader(glowShader, vec3.fromValues(0.9, 0.9, 0));
			exports.yellowMaterial = yellowMaterial;

			greenMaterial = createGlowShader(glowShader, vec3.fromValues(0, 0.9, 0.1));
			exports.greenMaterial = greenMaterial;
		}

		exports.whiteMaterial = createGlowShader(glowShader, vec3.fromValues(0.9, 0.9, 0.9));
		exports.blackMaterial = createGlowShader(glowShader, vec3.fromValues(0.1, 0.1, 0.1));

		atlasMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.Voxel) });
		atlasMaterial.loadTexture = (src, cb) => {
			let image = new Image();
			image.onload = () => {
				let texture = Fury.Renderer.createTextureArray(image, 64, 64, 13, "pixel", true); // "low"/"pixel" quality depending on if going purposefully low res
				// TODO: 13 is based on vorld config, so should actually base it off that
				atlasMaterial.textures["uSampler"] = texture;
				applyLightingInfo(atlasMaterial);
				cb();
			};
			image.src = src;
		};

		debugMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.UnlitTextured) });
		debugMaterial.loadTexture = (src, cb) => {
			let image = new Image();
			image.onload = () => {
				debugMaterial.textures["uSampler"] = Fury.Renderer.createTexture(image, "high");
				cb();
			};
			image.src = src;
		};

		if (useCoreModels) {
			itemsToLoad += 1;
			Fury.Model.load("./models/red_core.gltf", (model) => {
				redCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
			itemsToLoad += 1;
			Fury.Model.load("./models/blue_core.gltf", (model) => {
				blueCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
			itemsToLoad += 1;
			Fury.Model.load("./models/yellow_core.gltf", (model) => {
				yellowCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
			itemsToLoad += 1;
			Fury.Model.load("./models/green_core.gltf", (model) => {
				greenCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
		}

		itemsToLoad += 1;
		atlasMaterial.loadTexture("./images/atlas_array.png", loadCallback);
		itemsToLoad += 1;
		debugMaterial.loadTexture("./images/checkerboard.png", loadCallback);
	};

	exports.generateVisuals = (world, scene, callback) => {
		// Debug meshes
		let boxes = world.boxes;
		for (let i = 0, l = boxes.length; i < l; i++) {
			let box = boxes[i];
			let meshData = Primitives.createCuboidMesh(box.size[0], box.size[1], box.size[2]);
			let mesh = Fury.Mesh.create(meshData);
			// TODO: World should in charge of including some id for visuals which lets client know what materials etc to use
			box.visuals = scene.add({
				mesh: mesh,
				position: box.center,
				static: true,
				material: debugMaterial
			});
		}

		let createCore = function(mesh, material, pickup) {
			// TODO: Add a rotator and a bob component
			return scene.add({
				mesh: mesh,
				material: material,
				position: pickup.position,
				rotation: pickup.rotation
			});
		};

		// Create teleporter Visuals
		let teleporters = world.teleporters;
		for (let i = 0, l = teleporters.length; i < l; i++) {
			let teleporter = teleporters[i];
			teleporter.visual = TeleporterVisuals.create({ worldVisuals: exports, scene: scene, teleporter: teleporter });
		}

		// Create Pickup Visuals
		let pickups = world.pickups;
		for (let i = 0, l = pickups.length; i < l; i++) {
			let pickup = pickups[i];
			switch(pickup.visualId) {
				case Pickup.visualIds.REDCORE:
					pickup.visual = createCore(redCoreMesh, redMaterial, pickup);
					break;
				case Pickup.visualIds.BLUECORE:
					pickup.visual = createCore(blueCoreMesh, blueMaterial, pickup);
					break;
				case Pickup.visualIds.YELLOWCORE:
					pickup.visual = createCore(yellowCoreMesh, yellowMaterial, pickup);
					break;
				case Pickup.visualIds.GREENCORE:
					pickup.visual = createCore(greenCoreMesh, greenMaterial, pickup);
					break;
			}

			// Create Interactable Visuals
			let interactables = world.interactables;
			for (let i = 0, l = interactables.length; i < l; i++) {
				let interactable = interactables[i];
				switch(interactable.type) {
					case Interactable.Type.TELEPORTER_CONTROL:
						interactable.visual = TeleporterControlVisuals.create({
							worldVisuals: exports,
							scene: scene,
							interactable: interactable
						});
						break;
				}
			}
		}

		let vorld = world.vorld;
		if (!vorld) {
			return;
		}

		// "Generating Meshes"
		// $("#progressBarInner").width("0%");

		var worker = new Worker('./scripts/mesher-worker.js');
		worker.onmessage = function(e) {
			if (e.data.mesh) {
				var mesh = Fury.Mesh.create(e.data.mesh);
				mesh.tileBuffer = Fury.Renderer.createBuffer(e.data.mesh.tileIndices, 1);
				// ^^ TODO: have some way of attaching additional generic buffer info into
				// mesh data, so we don't have to do this step manually
				var chunkObject = scene.add({
					static: true,
					mesh: mesh,
					material: atlasMaterial,
					position: vec3.clone(e.data.offset)
				});
				chunkObjects.push(chunkObject);
			}
			if (e.data.progress !== undefined) {
				// $("#progressBarInner").width((e.data.progress * 100) + "%");
			}
			if (e.data.complete) {
				// $("#progressDisplay").hide();
				if (callback) {
						callback();
				}
			}
		};
		worker.postMessage({
			chunkData: vorld
		});
	};

	return exports;
})();
