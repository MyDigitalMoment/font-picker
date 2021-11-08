"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStylesheet;

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FONT_BASE_URL = 'https://fonts.googleapis.com/css';
/**
 * Return URL to the Google Fonts stylesheet for the specified font families and variants.
 * If previewsOnly is set to true, only the characters contained in the font family names are
 * included
 */

function getStylesheet(_x, _x2, _x3, _x4) {
  return _getStylesheet.apply(this, arguments);
}

function _getStylesheet() {
  _getStylesheet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fonts, scripts, variants, previewsOnly) {
    var url, variantsStr, familiesStr, familyNamesConcat, downloadChars;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = new URL(FONT_BASE_URL); // Build query URL for specified font families and variants

            variantsStr = variants.join(',');
            familiesStr = fonts.map(function (font) {
              return "".concat(font.family, ":").concat(variantsStr);
            });
            url.searchParams.append('family', familiesStr.join('|')); // Query the fonts in the specified scripts

            url.searchParams.append('subset', scripts.join(',')); // If previewsOnly: Only query the characters contained in the font names

            if (previewsOnly) {
              // Concatenate the family names of all fonts
              familyNamesConcat = fonts.map(function (font) {
                return font.family;
              }).join(''); // Create a string with all characters (listed once) contained in the font family names

              downloadChars = familyNamesConcat.split('').filter(function (char, pos, self) {
                return self.indexOf(char) === pos;
              }).join(''); // Query only the identified characters

              url.searchParams.append('text', downloadChars);
            } // Tell browser to render fallback font immediately and swap in the new font once it's loaded


            url.searchParams.append('font-display', 'swap'); // Fetch and return stylesheet

            return _context.abrupt("return", (0, _request.default)(url.href));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getStylesheet.apply(this, arguments);
}