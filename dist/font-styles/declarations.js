"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyActiveFont = applyActiveFont;
exports.applyFontPreview = applyFontPreview;

var _ids = require("../utils/ids");

var previewFontsStylesheet = document.createElement('style');
document.head.appendChild(previewFontsStylesheet);
/**
 * Add declaration for applying the specified preview font
 */

function applyFontPreview(previewFont, selectorSuffix) {
  var fontId = (0, _ids.getFontId)(previewFont.family);
  var style = "\n\t\t\t#font-button-".concat(fontId).concat(selectorSuffix, " {\n\t\t\t\tfont-family: \"").concat(previewFont.family, "\";\n\t\t\t}\n\t\t");
  previewFontsStylesheet.appendChild(document.createTextNode(style));
}
/**
 * Create/find and return the apply-font stylesheet for the provided selectorSuffix
 */


function getActiveFontStylesheet(selectorSuffix) {
  var stylesheetId = "active-font-".concat(selectorSuffix);
  var activeFontStylesheet = document.getElementById(stylesheetId);

  if (!activeFontStylesheet) {
    activeFontStylesheet = document.createElement('style');
    activeFontStylesheet.id = stylesheetId;
    document.head.appendChild(activeFontStylesheet);
  }

  return activeFontStylesheet;
}
/**
 * Add/update declaration for applying the current active font
 */


function applyActiveFont(activeFont, previousFontFamily, selectorSuffix) {
  var style = "\n\t\t.apply-font".concat(selectorSuffix, " {\n\t\t\tfont-family: \"").concat(activeFont.family, "\"").concat(previousFontFamily ? ", \"".concat(previousFontFamily, "\"") : '', ";\n\t\t}\n\t");
  var activeFontStylesheet = getActiveFontStylesheet(selectorSuffix);
  activeFontStylesheet.innerHTML = style;
}