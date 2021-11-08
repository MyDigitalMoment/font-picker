"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractFontStyles;

var _ids = require("../utils/ids");

var _regex = _interopRequireDefault(require("../utils/regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FONT_FACE_REGEX = /@font-face {([\s\S]*?)}/gm;
var FONT_FAMILY_REGEX = /font-family: ['"](.*?)['"]/gm;
/**
 * Parse the list of @font-face rules provided by the Google Fonts API. Split up the rules
 * according to the font family and return them in an object
 */

function extractFontStyles(allFontStyles) {
  // Run Regex to separate font-face rules
  var rules = (0, _regex.default)(FONT_FACE_REGEX, allFontStyles); // Assign font-face rules to fontIds

  var fontStyles = {};
  rules.forEach(function (rule) {
    // Run regex to get font family
    var fontFamily = (0, _regex.default)(FONT_FAMILY_REGEX, rule)[0];
    var fontId = (0, _ids.getFontId)(fontFamily); // Append rule to font font family's other rules

    if (!(fontId in fontStyles)) {
      fontStyles[fontId] = '';
    }

    fontStyles[fontId] += "@font-face {\n".concat(rule, "\n}\n\n");
  });
  return fontStyles;
}