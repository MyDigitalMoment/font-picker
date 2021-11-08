"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OPTIONS_DEFAULTS = exports.FONT_FAMILY_DEFAULT = void 0;
var FONT_FAMILY_DEFAULT = 'Open Sans';
exports.FONT_FAMILY_DEFAULT = FONT_FAMILY_DEFAULT;
var OPTIONS_DEFAULTS = {
  pickerId: '',
  families: [],
  categories: [],
  scripts: ['latin'],
  variants: ['regular'],
  filter: function filter() {
    return true;
  },
  limit: 50,
  sort: 'alphabet'
}; // export type Category = 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
// export type Script =
//   | 'arabic'
//   | 'bengali'
//   | 'chinese-simplified'
//   | 'chinese-traditional'
//   | 'cyrillic'
//   | 'cyrillic-ext'
//   | 'devanagari'
//   | 'greek'
//   | 'greek-ext'
//   | 'gujarati'
//   | 'gurmukhi'
//   | 'hebrew'
//   | 'japanese'
//   | 'kannada'
//   | 'khmer'
//   | 'korean'
//   | 'latin'
//   | 'latin-ext'
//   | 'malayalam'
//   | 'myanmar'
//   | 'oriya'
//   | 'sinhala'
//   | 'tamil'
//   | '​telugu'
//   | 'thai'
//   | 'vietnamese';
// export type SortOption = 'alphabet' | 'popularity';
// export type Variant =
//   | '100'
//   | '100italic'
//   | '200'
//   | '200italic'
//   | '300'
//   | '300italic'
//   | 'regular'
//   | 'italic'
//   | '500'
//   | '500italic'
//   | '600'
//   | '600italic'
//   | '700'
//   | '700italic'
//   | '800'
//   | '800italic'
//   | '900'
//   | '900italic';

exports.OPTIONS_DEFAULTS = OPTIONS_DEFAULTS;