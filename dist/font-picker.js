"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FontManager = _interopRequireDefault(require("./FontManager"));

var _react = _interopRequireWildcard(require("react"));

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Return the fontId based on the provided font family
 */
function getFontId(fontFamily) {
  return fontFamily.replace(/\s+/g, '-').toLowerCase();
}

var FontPicker = /*#__PURE__*/function (_PureComponent) {
  _inherits(FontPicker, _PureComponent);

  var _super = _createSuper(FontPicker);

  function FontPicker(props) {
    var _this;

    _classCallCheck(this, FontPicker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      expanded: false,
      loadingStatus: 'loading'
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      // Generate font list
      _this.fontManager.init().then(function () {
        _this.setState({
          loadingStatus: 'finished'
        });
      }).catch(function (err) {
        // On error: Log error message
        _this.setState({
          loadingStatus: 'error'
        });

        console.error('Error trying to fetch the list of available fonts');
        console.error(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveFontFamily", function (activeFontFamily) {
      _this.fontManager.setActiveFont(activeFontFamily);
    });

    _defineProperty(_assertThisInitialized(_this), "generateFontList", function (fonts) {
      var loadingStatus = _this.state.loadingStatus;

      if (loadingStatus !== 'finished') {
        return [];
      }

      return fonts.map(function (font) {
        var fontId = getFontId(font.family);
        return /*#__PURE__*/_react.default.createElement("option", {
          key: fontId,
          className: "font-list-item",
          id: "font-button-".concat(fontId).concat(_this.fontManager.selectorSuffix),
          value: font.family
        }, font.family);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {});

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props = _this.props,
          activeFontFamily = _this$props.activeFontFamily,
          sort = _this$props.sort; // Extract and sort font list

      var fonts = Array.from(_this.fontManager.getFonts().values());

      if (sort === 'alphabet') {
        fonts.sort(function (font1, font2) {
          return font1.family.localeCompare(font2.family);
        });
      } // Render font picker button and attach font list to it


      return /*#__PURE__*/_react.default.createElement("select", {
        id: _this.props.pickerId,
        className: "form-select",
        "aria-label": "Selecciona una opci\xF3n",
        name: _this.props.pickerName,
        defaultValue: activeFontFamily,
        onChange: _this.props.onChange
      }, _this.generateFontList(fonts));
    });

    var _this$props2 = _this.props,
        apiKey = _this$props2.apiKey,
        _activeFontFamily = _this$props2.activeFontFamily,
        pickerId = _this$props2.pickerId,
        families = _this$props2.families,
        categories = _this$props2.categories,
        scripts = _this$props2.scripts,
        variants = _this$props2.variants,
        filter = _this$props2.filter,
        limit = _this$props2.limit,
        _sort = _this$props2.sort,
        onChange = _this$props2.onChange;
    var options = {
      pickerId: pickerId,
      families: families,
      categories: categories,
      scripts: scripts,
      variants: variants,
      filter: filter,
      limit: limit,
      sort: _sort
    }; // Initialize FontManager object

    _this.fontManager = new _FontManager.default(apiKey, _activeFontFamily, options, onChange);
    return _this;
  }

  return FontPicker;
}(_react.PureComponent);

exports.default = FontPicker;

_defineProperty(FontPicker, "defaultProps", {
  activeFontFamily: _types.FONT_FAMILY_DEFAULT,
  onChange: function onChange(e) {},
  pickerId: _types.OPTIONS_DEFAULTS.pickerId,
  pickerName: _types.OPTIONS_DEFAULTS.pickerId,
  families: _types.OPTIONS_DEFAULTS.families,
  categories: _types.OPTIONS_DEFAULTS.categories,
  scripts: _types.OPTIONS_DEFAULTS.scripts,
  variants: _types.OPTIONS_DEFAULTS.variants,
  filter: _types.OPTIONS_DEFAULTS.filter,
  limit: _types.OPTIONS_DEFAULTS.limit,
  sort: _types.OPTIONS_DEFAULTS.sort
});