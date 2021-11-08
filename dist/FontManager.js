"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fontList = _interopRequireDefault(require("./google-fonts/fontList"));

var _loadFonts = require("./loadFonts");

var _types = require("./types");

var _ids = require("./utils/ids");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Class for managing the list of fonts for the font picker, keeping track of the active font and
 * downloading/activating Google Fonts
 */
var FontManager = /*#__PURE__*/function () {
  // Parameters
  // Map from font families to font objects
  // Suffix appended to CSS selectors which would have name clashes if multiple font pickers are
  // used on the same site (e.g. "-test" if the picker has pickerId "test" or "" if the picker
  // doesn't have an ID)

  /**
   * Save relevant options, download the default font, add it to the font list and apply it
   */
  function FontManager(apiKey) {
    var _this = this;

    var defaultFamily = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.FONT_FAMILY_DEFAULT;

    var _ref = arguments.length > 2 ? arguments[2] : undefined,
        _ref$pickerId = _ref.pickerId,
        pickerId = _ref$pickerId === void 0 ? _types.OPTIONS_DEFAULTS.pickerId : _ref$pickerId,
        _ref$families = _ref.families,
        families = _ref$families === void 0 ? _types.OPTIONS_DEFAULTS.families : _ref$families,
        _ref$categories = _ref.categories,
        categories = _ref$categories === void 0 ? _types.OPTIONS_DEFAULTS.categories : _ref$categories,
        _ref$scripts = _ref.scripts,
        scripts = _ref$scripts === void 0 ? _types.OPTIONS_DEFAULTS.scripts : _ref$scripts,
        _ref$variants = _ref.variants,
        variants = _ref$variants === void 0 ? _types.OPTIONS_DEFAULTS.variants : _ref$variants,
        _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? _types.OPTIONS_DEFAULTS.filter : _ref$filter,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? _types.OPTIONS_DEFAULTS.limit : _ref$limit,
        _ref$sort = _ref.sort,
        sort = _ref$sort === void 0 ? _types.OPTIONS_DEFAULTS.sort : _ref$sort;

    var _onChange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    _classCallCheck(this, FontManager);

    _defineProperty(this, "apiKey", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "onChange", void 0);

    _defineProperty(this, "activeFontFamily", void 0);

    _defineProperty(this, "fonts", new Map());

    _defineProperty(this, "selectorSuffix", void 0);

    _defineProperty(this, "getFonts", function () {
      return _this.fonts;
    });

    _defineProperty(this, "setOnChange", function (onChange) {
      _this.onChange = onChange;
    });

    // Validate pickerId parameter
    (0, _ids.validatePickerId)(pickerId);
    this.selectorSuffix = pickerId ? "-".concat(pickerId) : ''; // Save parameters as class variables

    this.apiKey = apiKey;
    this.options = {
      pickerId: pickerId,
      families: families,
      categories: categories,
      scripts: scripts,
      variants: variants,
      filter: filter,
      limit: limit,
      sort: sort
    };
    this.onChange = _onChange; // Download default font and add it to the empty font list

    this.addFont(defaultFamily, false);
    this.setActiveFont(defaultFamily, false);
  }
  /**
   * Fetch list of all fonts from Google Fonts API, filter it according to the class parameters and
   * save them to the font map
   */


  _createClass(FontManager, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var fonts, _loop, i, _ret, fontsToLoad;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fontList.default)(this.apiKey);

              case 2:
                fonts = _context.sent;

                _loop = function _loop(i) {
                  var font = fonts[i]; // Exit once specified limit of number of fonts is reached

                  if (_this2.fonts.size >= _this2.options.limit) {
                    return "break";
                  }

                  if ( // Skip default font if it is also contained in the list
                  !_this2.fonts.has(font.family) && ( // `families` parameter: Only keep fonts whose names are included in the provided array
                  _this2.options.families.length === 0 || _this2.options.families.includes(font.family)) && ( // `categories` parameter: only keep fonts in categories from the provided array
                  _this2.options.categories.length === 0 || _this2.options.categories.includes(font.category)) && // `scripts` parameter: Only keep fonts which are available in all specified scripts
                  _this2.options.scripts.every(function (script) {
                    return font.scripts.includes(script);
                  }) && // `variants` parameter: Only keep fonts which contain all specified variants
                  _this2.options.variants.every(function (variant) {
                    return font.variants.includes(variant);
                  }) && // `filter` parameter: Only keep fonts for which the `filter` function evaluates to `true`
                  _this2.options.filter(font) === true) {
                    // Font fulfils all requirements: Add it to font map
                    _this2.fonts.set(font.family, font);
                  }
                };

                i = 0;

              case 5:
                if (!(i < fonts.length)) {
                  _context.next = 12;
                  break;
                }

                _ret = _loop(i);

                if (!(_ret === "break")) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("break", 12);

              case 9:
                i += 1;
                _context.next = 5;
                break;

              case 12:
                // Download previews for all fonts in list except for default font (its full font has already
                // been downloaded)
                fontsToLoad = new Map(this.fonts);
                fontsToLoad.delete(this.activeFontFamily);
                (0, _loadFonts.loadFontPreviews)(fontsToLoad, this.options.scripts, this.options.variants, this.selectorSuffix);
                return _context.abrupt("return", this.fonts);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * Return font map
     */

  }, {
    key: "addFont",
    value:
    /**
     * Add a new font to the font map and download its preview characters
     */
    function addFont(fontFamily) {
      var downloadPreview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // @ts-ignore: Custom font does not need `categories`, `scripts` and `variants` attributes
      var font = {
        family: fontFamily,
        id: (0, _ids.getFontId)(fontFamily)
      };
      this.fonts.set(fontFamily, font); // Download font preview unless specified not to

      if (downloadPreview) {
        var fontMap = new Map();
        fontMap.set(fontFamily, font);
        (0, _loadFonts.loadFontPreviews)(fontMap, this.options.scripts, this.options.variants, this.selectorSuffix);
      }
    }
    /**
     * Remove the specified font from the font map
     */

  }, {
    key: "removeFont",
    value: function removeFont(fontFamily) {
      this.fonts.delete(fontFamily);
    }
    /**
     * Return the font object of the currently active font
     */

  }, {
    key: "getActiveFont",
    value: function getActiveFont() {
      var activeFont = this.fonts.get(this.activeFontFamily);

      if (!activeFont) {
        throw Error("Cannot get active font: \"".concat(this.activeFontFamily, "\" is not in the font list"));
      } else {
        return activeFont;
      }
    }
    /**
     * Set the specified font as the active font and download it
     */

  }, {
    key: "setActiveFont",
    value: function setActiveFont(fontFamily) {
      var _this3 = this;

      var runOnChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var previousFontFamily = this.activeFontFamily;
      var activeFont = this.fonts.get(fontFamily);

      if (!activeFont) {
        // Font is not in fontList: Keep current activeFont and log error
        throw Error("Cannot update active font: \"".concat(fontFamily, "\" is not in the font list"));
      }

      this.activeFontFamily = fontFamily;
      (0, _loadFonts.loadActiveFont)(activeFont, previousFontFamily, this.options.scripts, this.options.variants, this.selectorSuffix).then(function () {
        if (runOnChange) {
          _this3.onChange(activeFont);
        }
      });
    }
    /**
     * Update the onChange function (executed when changing the active font)
     */

  }]);

  return FontManager;
}();

exports.default = FontManager;