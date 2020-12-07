let Fury = require('../../fury/src/fury.js');

var Shaders = module.exports = (function() {
  var exports = {};

  exports.UnlitTextured = {
	 vsSource: [
		"attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",

    "uniform mat4 uMVMatrix;",
    "uniform mat4 uPMatrix;",

    "varying vec2 vTextureCoord;",
    "void main(void) {",
        "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
        "vTextureCoord = aTextureCoord;",
    "}"].join('\n'),
	 fsSource: [
     "precision mediump float;",

     "varying vec2 vTextureCoord;",

     "uniform sampler2D uSampler;",

     "void main(void) {",
        "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
     "}"].join('\n'),
	 attributeNames: [ "aVertexPosition", "aTextureCoord" ],
	 uniformNames: [ "uMVMatrix", "uPMatrix", "uSampler" ],
	 textureUniformNames: [ "uSampler" ],
	 pMatrixUniformName: "uPMatrix",
	 mvMatrixUniformName: "uMVMatrix",
	 bindMaterial: function(material) {
     this.enableAttribute("aVertexPosition");
		 this.enableAttribute("aTextureCoord");
	 },
	 bindBuffers: function(mesh) {
		 this.setAttribute("aVertexPosition", mesh.vertexBuffer);
		 this.setAttribute("aTextureCoord", mesh.textureBuffer);
		 this.setIndexedAttribute(mesh.indexBuffer);
	 }
 };

  exports.UnlitColor = {
   vsSource: [
		"attribute vec3 aVertexPosition;",

    "uniform mat4 uMVMatrix;",
    "uniform mat4 uPMatrix;",

    "void main(void) {",
       "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
    "}"
    ].join('\n'),
    fsSource: [
      "precision mediump float;",

      "uniform vec3 uColor;",

      "void main(void) {",
         "gl_FragColor = vec4(uColor, 1.0);",
      "}"].join('\n'),
   	 attributeNames: [ "aVertexPosition", ],
   	 uniformNames: [ "uMVMatrix", "uPMatrix", "uColor" ],
   	 pMatrixUniformName: "uPMatrix",
   	 mvMatrixUniformName: "uMVMatrix",
   	 bindMaterial: function(material) {
      this.enableAttribute("aVertexPosition");
      this.setUniformFloat3("uColor", material.color[0], material.color[1], material.color[2]);
      // TOOD: ^^ A method to call when creating materials from the shader definition
      // to ensure they have any additional properties might be nice
   	 },
   	 bindBuffers: function(mesh) {
   		 this.setAttribute("aVertexPosition", mesh.vertexBuffer);
   		 this.setIndexedAttribute(mesh.indexBuffer);
   	 }
   };

  exports.Voxel = {
      vsSource: [
        "#version 300 es",
        "in vec3 aVertexPosition;",
        "in vec2 aTextureCoord;",
        "in vec3 aVertexNormal;",
        "in float aTileIndex;",

        "uniform vec3 uLightingDirection;",
        "uniform mat4 uMVMatrix;",
        "uniform mat4 uPMatrix;",

        // "out vec4 vWorldPosition;",
        "out vec2 vTextureCoord;",
        "out vec3 vNormal;",
        "out vec3 vViewSpacePosition;",
        "out float vLightWeight;",
        "out float vTileIndex;",

        "void main(void) {",
          "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
          "vTextureCoord = aTextureCoord;",
          "vNormal = aVertexNormal;",
          "vTileIndex = aTileIndex;",

          // Greedy Meshing - UV generation - artifacts at seams
          // Normally would mulitply this by the world / model matrix but as models
          // are all axis aligned and we're going to be using frac value anyway, it's unnecessary
          // "vWorldPosition = vec4(aVertexPosition + vec3(0.5, 0.5, 0.5), 1.0);",

          // Lighting Direction: vec3(-1.0,2.0,1.0)

          "vLightWeight = 0.5 * max(dot(aVertexNormal, normalize(uLightingDirection)), 0.0);",

          "vViewSpacePosition = (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;",
        "}"].join('\n'),
      fsSource: [
        "#version 300 es",
        "precision highp float;",
        "precision highp sampler2DArray;",

        "in vec2 vTextureCoord;",
        //"in vec4 vWorldPosition;",
        "in vec3 vNormal;",
        "in vec3 vViewSpacePosition;",
        "in float vLightWeight;",
        "in float vTileIndex;",

        "uniform sampler2DArray uSampler;",
        "uniform vec3 uLightColor;",
        "uniform vec3 uAmbientColor;",

        "uniform vec3 uFogColor;",
        "uniform float uFogDensity;",

        "out vec4 fragColor;",

        "void main(void) {",
            //"vec3 pos = fract(vWorldPosition.xyz);",

            //"vec2 uv = abs(vNormal.x) * pos.zy + abs(vNormal.y) * pos.xz + abs(vNormal.z) * pos.xy;",
            //"float tileIndex = 8.0 - floor(vTextureCoord.s);",

            "vec4 color = texture(uSampler, vec3(vTextureCoord, vTileIndex));",
            "vec4 litColor = vec4(((0.5 * uAmbientColor) + (vLightWeight * uLightColor)) * color.rgb, color.a);",

            "#define LOG2 1.442695",

            "float fogDistance = length(vViewSpacePosition);",
            "float fogAmount = 1.0 - exp2(- uFogDensity * uFogDensity * fogDistance * fogDistance * LOG2);",
            "fogAmount = clamp(fogAmount, 0.0, 1.0);",

            "fragColor = mix(litColor, vec4(uFogColor, 1.0), fogAmount);",
        "}"].join('\n'),
      attributeNames: [ "aVertexPosition", "aVertexNormal", "aTextureCoord", "aTileIndex" ],
      uniformNames: ["uLightingDirection", "uMVMatrix", "uPMatrix", "uSampler", "uLightColor", "uAmbientColor", "uFogColor", "uFogDensity" ],
      textureUniformNames: [ "uSampler" ],
      pMatrixUniformName: "uPMatrix",
      mvMatrixUniformName: "uMVMatrix",
      bindMaterial: function(material) {
        // HACK: Should have a cleaner way to do this
        // Arguably some of these are scene based variables not material,
        // should we pass scene details in?
        // Or just add sceneLighting property to material
        this.setUniformVector3("uLightingDirection", material.lightDir);
        this.setUniformVector3("uLightColor", material.lightColor);
        this.setUniformVector3("uAmbientColor", material.ambientColor);
        this.setUniformVector3("uFogColor", material.fogColor);
        this.setUniformFloat("uFogDensity", material.fogDensity);

        this.enableAttribute("aLightingDirection");
        this.enableAttribute("aVertexPosition");
        this.enableAttribute("aTextureCoord");
        this.enableAttribute("aVertexNormal");
        this.enableAttribute("aTileIndex");
      },
      bindBuffers: function(mesh) {
        this.setAttribute("aVertexPosition", mesh.vertexBuffer);
        this.setAttribute("aTextureCoord", mesh.textureBuffer);
        this.setAttribute("aVertexNormal", mesh.normalBuffer);
        this.setAttribute("aTileIndex", mesh.tileBuffer);
        this.setIndexedAttribute(mesh.indexBuffer);
      }
    };

  return exports;
})();
