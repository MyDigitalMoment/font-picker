/**
 * Return the fontId based on the provided font family
 */
export function getFontId(fontFamily) {
  return fontFamily.replace(/\s+/g, '-').toLowerCase();
}

/**
 * Throw an error if the provided pickerId doesn't consist only of letters and digits
 */
export function validatePickerId(pickerId) {
  if (pickerId.match(/[^0-9a-zA-Z-_]/i)) {
    throw Error('The `pickerId` parameter may only contain letters and digits dash and underscore');
  }
}
