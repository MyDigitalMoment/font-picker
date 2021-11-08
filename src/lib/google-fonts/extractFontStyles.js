import { getFontId } from '../utils/ids';
import getMatches from '../utils/regex';

const FONT_FACE_REGEX = /@font-face {([\s\S]*?)}/gm;
const FONT_FAMILY_REGEX = /font-family: ['"](.*?)['"]/gm;

/**
 * Parse the list of @font-face rules provided by the Google Fonts API. Split up the rules
 * according to the font family and return them in an object
 */
export default function extractFontStyles(allFontStyles) {
  // Run Regex to separate font-face rules
  const rules = getMatches(FONT_FACE_REGEX, allFontStyles);

  // Assign font-face rules to fontIds
  const fontStyles = {};
  rules.forEach((rule) => {
    // Run regex to get font family
    const fontFamily = getMatches(FONT_FAMILY_REGEX, rule)[0];
    const fontId = getFontId(fontFamily);

    // Append rule to font font family's other rules
    if (!(fontId in fontStyles)) {
      fontStyles[fontId] = '';
    }
    fontStyles[fontId] += `@font-face {\n${rule}\n}\n\n`;
  });
  return fontStyles;
}
