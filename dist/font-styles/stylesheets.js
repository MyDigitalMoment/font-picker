"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStylesheet = createStylesheet;
exports.fillStylesheet = fillStylesheet;
exports.setStylesheetType = setStylesheetType;
exports.stylesheetExists = stylesheetExists;
var PREVIEW_ATTRIBUTE_NAME = 'data-is-preview';
/**
 * Generate font stylesheet ID from fontId
 */

function getStylesheetId(fontId) {
  return "font-".concat(fontId);
}
/**
 * Check whether a font stylesheet already exists in the document head
 */


function stylesheetExists(fontId, isPreview) {
  var stylesheetNode = document.getElementById(getStylesheetId(fontId));

  if (isPreview === null || isPreview === undefined) {
    return stylesheetNode !== null;
  }

  return stylesheetNode !== null && stylesheetNode.getAttribute(PREVIEW_ATTRIBUTE_NAME) === isPreview.toString();
}
/**
 * Attach a new font stylesheet to the document head using the provided content
 */


function createStylesheet(fontId, isPreview) {
  var stylesheetNode = document.createElement('style');
  stylesheetNode.id = getStylesheetId(fontId);
  stylesheetNode.setAttribute(PREVIEW_ATTRIBUTE_NAME, isPreview.toString());
  document.head.appendChild(stylesheetNode);
}
/**
 * Insert the provided styles in the font's <style> element (existing styles are replaced)
 */


function fillStylesheet(fontId, styles) {
  var stylesheetId = getStylesheetId(fontId);
  var stylesheetNode = document.getElementById(stylesheetId);

  if (stylesheetNode) {
    stylesheetNode.textContent = styles;
  } else {
    console.error("Could not fill stylesheet: Stylesheet with ID \"".concat(stylesheetId, "\" not found"));
  }
}
/**
 * Update the value of a stylesheet's "data-is-preview" attribute
 */


function setStylesheetType(fontId, isPreview) {
  var stylesheetId = getStylesheetId(fontId);
  var stylesheetNode = document.getElementById(stylesheetId);

  if (stylesheetNode) {
    stylesheetNode.setAttribute(PREVIEW_ATTRIBUTE_NAME, isPreview.toString());
  } else {
    console.error("Could not change stylesheet type: Stylesheet with ID \"".concat(stylesheetId, "\" not found"));
  }
}