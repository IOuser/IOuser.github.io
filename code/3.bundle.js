(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/shaders/particles.v.glsl":
/*!**************************************!*\
  !*** ./src/shaders/particles.v.glsl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\n\nattribute vec2 scale;\nattribute vec2 velocity;\nattribute vec2 coord;\n\nvarying vec2 vPos;\nvarying vec2 vVel;\nvarying float vSize;\n\nvoid main() {\n    gl_Position = vec4(\n        coord.x * scale.x,\n        coord.y * scale.y,\n        0.0,\n        1.0\n    );\n\n    vPos = coord;\n\n    vVel = velocity;\n\n    // calc size from velocity\n    float s = sqrt(velocity.x * velocity.x + velocity.y * velocity.y) * 200.0;\n    vSize = min(max(s, 5.0), 15.0);\n    // vSize = min(max(0.8 / s, 5.0), 20.0);\n\n\n    gl_PointSize = vSize;\n}\n"

/***/ })

}]);
//# sourceMappingURL=3.bundle.js.map