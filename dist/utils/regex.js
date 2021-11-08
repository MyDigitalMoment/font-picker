"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMatches;

/**
 * Execute the provided regex on the string and return all matched groups
 */
function getMatches(regex, str) {
  var matches = [];
  var match;

  do {
    match = regex.exec(str);

    if (match) {
      matches.push(match[1]);
    }
  } while (match);

  return matches;
}