"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadActiveFont = loadActiveFont;
exports.loadFontPreviews = loadFontPreviews;

var _declarations = require("./font-styles/declarations");

var _stylesheets = require("./font-styles/stylesheets");

var _extractFontStyles = _interopRequireDefault(require("./google-fonts/extractFontStyles"));

var _fontStylesheet = _interopRequireDefault(require("./google-fonts/fontStylesheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Get the Google Fonts stylesheet for the specified font (in the specified scripts and variants,
 * only the characters needed for creating the font previews), add the necessary CSS declarations to
 * apply them and add the fonts' stylesheets to the document head
 */
function loadFontPreviews(_x, _x2, _x3, _x4) {
  return _loadFontPreviews.apply(this, arguments);
}
/**
 * Get the Google Fonts stylesheet for the specified font (in the specified scripts and variants),
 * add the necessary CSS declarations to apply it and add the font's stylesheet to the document head
 */


function _loadFontPreviews() {
  _loadFontPreviews = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fonts, scripts, variants, selectorSuffix) {
    var fontsArray, fontsToFetch, response, fontStyles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Only load previews of fonts which don't have a stylesheet (for preview or full font) yet
            fontsArray = Array.from(fonts.values());
            fontsToFetch = fontsArray.map(function (font) {
              return font.id;
            }).filter(function (fontId) {
              return !(0, _stylesheets.stylesheetExists)(fontId);
            }); // Create stylesheet elements for all fonts which will be fetched (this prevents other font
            // pickers from loading the fonts as well)

            fontsToFetch.forEach(function (fontId) {
              return (0, _stylesheets.createStylesheet)(fontId, true);
            }); // Get Google Fonts stylesheet containing all requested styles

            _context.next = 5;
            return (0, _fontStylesheet.default)(fontsArray, scripts, variants, true);

          case 5:
            response = _context.sent;
            // Parse response and assign styles to the corresponding font
            fontStyles = (0, _extractFontStyles.default)(response); // Create separate stylesheets for the fonts

            fontsArray.forEach(function (font) {
              (0, _declarations.applyFontPreview)(font, selectorSuffix); // Add stylesheets for fonts which need to be downloaded

              if (fontsToFetch.includes(font.id)) {
                // Make sure response contains styles for the font
                if (!(font.id in fontStyles)) {
                  console.error("Missing styles for font \"".concat(font.family, "\" (fontId \"").concat(font.id, "\") in Google Fonts response"));
                  return;
                } // Insert styles into the stylesheet element which was created earlier


                (0, _stylesheets.fillStylesheet)(font.id, fontStyles[font.id]);
              }
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadFontPreviews.apply(this, arguments);
}

function loadActiveFont(_x5, _x6, _x7, _x8, _x9) {
  return _loadActiveFont.apply(this, arguments);
}

function _loadActiveFont() {
  _loadActiveFont = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(font, previousFontFamily, scripts, variants, selectorSuffix) {
    var fontStyle;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(0, _stylesheets.stylesheetExists)(font.id, false)) {
              _context2.next = 4;
              break;
            }

            // Add CSS declaration to apply the new active font
            (0, _declarations.applyActiveFont)(font, previousFontFamily, selectorSuffix);
            _context2.next = 10;
            break;

          case 4:
            if ((0, _stylesheets.stylesheetExists)(font.id, true)) {
              // Update the stylesheet's "data-is-preview" attribute to "false"
              (0, _stylesheets.setStylesheetType)(font.id, false);
            } else {
              // Create stylesheet for the font to be fetched (this prevents other font pickers from loading
              // the font as well)
              (0, _stylesheets.createStylesheet)(font.id, false);
            } // Get Google Fonts stylesheet containing all requested styles


            _context2.next = 7;
            return (0, _fontStylesheet.default)([font], scripts, variants, false);

          case 7:
            fontStyle = _context2.sent;
            // Add CSS declaration to apply the new active font
            (0, _declarations.applyActiveFont)(font, previousFontFamily, selectorSuffix); // Insert styles into the stylesheet element which was created earlier

            (0, _stylesheets.fillStylesheet)(font.id, fontStyle);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadActiveFont.apply(this, arguments);
}