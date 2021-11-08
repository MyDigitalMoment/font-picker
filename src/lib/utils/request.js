/**
 * Execute a GET XMLHttpRequest and return the result
 */
export default function get(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.overrideMimeType('application/json');
    request.open('GET', url, true);
    request.onreadystatechange = () => {
      // Request has completed
      if (request.readyState === 4) {
        if (request.status !== 200) {
          // On error
          reject(new Error(`Response has status code ${request.status}`));
        } else {
          // On success
          resolve(request.responseText);
        }
      }
    };
    request.send();
  });
}
