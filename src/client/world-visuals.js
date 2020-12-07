let Fury = require('../../fury/src/fury.js');
let Shaders = require('./shaders');
let Primitives = require('./primitives');
let vec3 = Fury.Maths.vec3;

let WorldVisuals = module.exports = (function() {
  let exports = {};

  let atlasMaterial, debugMaterial;
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

    // Shader.create requires Fury to be initialised (i.e. it needs a gl context)
    // So this init needs to be called after Fury.init
    atlasMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.Voxel) });
    atlasMaterial.loadTexture = (src, cb) => {
      let image = new Image();
      image.onload = () => {
        let texture = Fury.Renderer.createTextureArray(image, 64, 64, 13, "pixel", true);
        // TODO: 13 is based on vorld config, so should actually base it off that
      	atlasMaterial.textures["uSampler"] = texture;
      	atlasMaterial.lightDir = vec3.fromValues(-1.0, 2.0, 1.0); // Was -1, 2, 1
      	atlasMaterial.lightColor = vec3.fromValues(1.0, 1.0, 1.0);
      	atlasMaterial.ambientColor = vec3.fromValues(0.5, 0.5, 0.5);
      	atlasMaterial.fogColor = vec3.fromValues(0, 0, 0);
      	atlasMaterial.fogDensity = 0.25;  // TODO: Expose Variables for tweaking please
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

  exports.generateVisuals = (level, vorld, scene, callback) => {
    // Debug meshes
    if (level) {
      for (let i = 0, l = level.length; i < l; i++) {
        let meshData = Primitives.createCuboidMesh(level[i].size[0], level[i].size[1], level[i].size[2]);
        let mesh = Fury.Mesh.create(meshData);
        // TODO: World should in charge of including some id for visuals which lets client know what materials etc to use
        level.visuals = scene.add({
          mesh: mesh,
          position: level[i].center,
          static: true,
          material: debugMaterial
        });
      }
    }

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
