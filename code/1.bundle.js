(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/shaders/grid.v.glsl":
/*!*********************************!*\
  !*** ./src/shaders/grid.v.glsl ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\n\nattribute vec2 coord;\nattribute vec2 scale;\n\nvoid main() {\n    gl_Position = vec4(\n        coord.x * scale.x,\n        coord.y * scale.y,\n        0.0,\n        1.0\n    );\n}\n"

/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map