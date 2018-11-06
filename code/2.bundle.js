(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/shaders/particles.f.glsl":
/*!**************************************!*\
  !*** ./src/shaders/particles.f.glsl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\n\nuniform vec2 resolution;\n\nvarying vec2 vPos;\nvarying vec2 vVel;\nvarying float vSize;\n\nvoid main() {\n    float innerRadius = vSize * 0.3;\n    float outerRadius = vSize * 0.5;\n    float blurFactor = 0.275;\n\n\n    float x1 = (gl_FragCoord.x - resolution.x * 0.5) - vPos.x;\n    float y1 = (gl_FragCoord.y - resolution.y * 0.5) - vPos.y;\n    float d = sqrt(x1 * x1 + y1 * y1);\n\n    // float b = min(max( , 0.0), 1.0);\n\n    float b = vSize * 0.05;\n\n    gl_FragColor = mix(\n        vec4(gl_FragCoord.xy / resolution.xy, max(b, 0.5), 0.25),\n        vec4(gl_FragCoord.xy / resolution.xy * 0.25, min(b, 0.0), 0.25),\n        clamp((innerRadius - d) * blurFactor, 0.5, 1.0)\n    ) * clamp((outerRadius - d) * blurFactor, 0.0, 0.5) * 1.2;\n}\n"

/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map