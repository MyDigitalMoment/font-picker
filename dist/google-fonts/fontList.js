"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFontList;

var _ids = require("../utils/ids");

var _request = _interopRequireDefault(require("../utils/request"));

var _excluded = ["family", "subsets"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var LIST_BASE_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';
/**
 * Fetch the list of all available fonts from the Google Fonts API
 */

function getFontList(_x) {
  return _getFontList.apply(this, arguments);
}

function _getFontList() {
  _getFontList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(apiKey) {
    var url, response, json, fontsOriginal;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Request list of all Google Fonts, sorted by popularity
            url = new URL(LIST_BASE_URL);
            url.searchParams.append('sort', 'popularity');
            url.searchParams.append('key', apiKey);
            _context.next = 5;
            return (0, _request.default)(url.href);

          case 5:
            response = _context.sent;
            // Parse font list
            json = JSON.parse(response); // For each font:
            // - Rename "subset" key to "script"
            // - Generate fontId
            // Return the updated list

            fontsOriginal = json.items;
            return _context.abrupt("return", fontsOriginal.map(function (fontOriginal) {
              var family = fontOriginal.family,
                  subsets = fontOriginal.subsets,
                  others = _objectWithoutProperties(fontOriginal, _excluded);

              return _objectSpread(_objectSpread({}, others), {}, {
                family: family,
                id: (0, _ids.getFontId)(family),
                scripts: subsets
              });
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getFontList.apply(this, arguments);
}