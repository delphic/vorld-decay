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

  return exports;
})();
