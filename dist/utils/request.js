"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

/**
 * Execute a GET XMLHttpRequest and return the result
 */
function get(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('application/json');
    request.open('GET', url, true);

    request.onreadystatechange = function () {
      // Request has completed
      if (request.readyState === 4) {
        if (request.status !== 200) {
          // On error
          reject(new Error("Response has status code ".concat(request.status)));
        } else {
          // On success
          resolve(request.responseText);
        }
      }
    };

    request.send();
  });
}