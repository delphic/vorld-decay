let Fury = require('../../fury/src/fury.js');
let Shaders = require('./shaders');
let Primitives = require('./primitives');
let Pickup = require('../common/pickup');
let vec3 = Fury.Maths.vec3;

let WorldVisuals = module.exports = (function() {
  let exports = {};

  let atlasMaterial, debugMaterial;
  let redMaterial, blueMaterial, yellowMaterial, greenMaterial;
  let coreMesh;

  let chunkObjects = [];

  exports.init = (callback) => {
    // TODO: have an asset loader with a combined callback once done
    // Use Hestia as inspiration, it had a much better system
    let itemsToLoad = 2;
    let loadCallback = () => {
      itemsToLoad -= 1;
      if (itemsToLoad == 0) {
        callback();
      }
    };

    // Placeholder core visuals
    coreMesh = Fury.Mesh.create(Primitives.createCubeMesh(0.25));
    let unlitColorShader = Fury.Shader.create(Shaders.UnlitColor);
    // TODO: ^^ A cache of created shaders might be a good idea or we're going to be swapping shader programs unnecessarily
    redMaterial = Fury.Material.create({ shader: unlitColorShader });
    redMaterial.color = vec3.fromValues(0.9, 0, 0.1);
    blueMaterial = Fury.Material.create({ shader: unlitColorShader });
    blueMaterial.color = vec3.fromValues(0, 0.7, 0.9);
    yellowMaterial = Fury.Material.create({ shader: unlitColorShader });
    yellowMaterial.color = vec3.fromValues(0.9, 0.9, 0);
    greenMaterial = Fury.Material.create({ shader: unlitColorShader });
    greenMaterial.color = vec3.fromValues(0.1, 0.9, 0);

    // Shader.create requires Fury to be initialised (i.e. it needs a gl context)
    // So this init needs to be called after Fury.init
    atlasMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.Voxel) });
    atlasMaterial.loadTexture = (src, cb) => {
      let image = new Image();
      image.onload = () => {
        let texture = Fury.Renderer.createTextureArray(image, 64, 64, 13, "pixel", true); // "low"/"pixel" quality depending on if going purposefully low res
        // TODO: 13 is based on vorld config, so should actually base it off that
      	atlasMaterial.textures["uSampler"] = texture;
      	atlasMaterial.lightDir = vec3.fromValues(-1.0, 2.0, 1.0); // Was -1, 2, 1
      	atlasMaterial.lightColor = vec3.fromValues(1.0, 1.0, 1.0);
      	atlasMaterial.ambientColor = vec3.fromValues(0.5, 0.5, 0.5);
      	atlasMaterial.fogColor = vec3.fromValues(0, 0, 0);
      	atlasMaterial.fogDensity = 0.125;  // TODO: Expose Variables for tweaking please
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

    atlasMaterial.loadTexture("/images/atlas_array.png", loadCallback);
    debugMaterial.loadTexture("/images/checkerboard.png", loadCallback);
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

    let createCore = function(material, pickup) {
      // TODO: Add a rotator and a bob component
      return scene.add({ mesh: coreMesh, material: material, position: pickup.position, rotation: pickup.rotation });
    };

    let pickups = world.pickups;
    for (let i = 0, l = pickups.length; i < l; i++) {
      let pickup = pickups[i];
      switch(pickup.visualId) {
        case Pickup.visualIds.REDCORE:
          pickup.visual = createCore(redMaterial, pickup);
          break;
        case Pickup.visualIds.BLUECORE:
          pickup.visual = createCore(blueMaterial, pickup);
          break;
        case Pickup.visualIds.YELLOWCORE:
          pickup.visual = createCore(yellowMaterial, pickup);
          break;
        case Pickup.visualIds.GREENCORE:
          pickup.visual = createCore(greenMaterial, pickup);
          break;
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
