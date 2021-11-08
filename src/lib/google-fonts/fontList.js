import { getFontId } from '../utils/ids';
import get from '../utils/request';

const LIST_BASE_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

/**
 * Fetch the list of all available fonts from the Google Fonts API
 */
export default async function getFontList(apiKey) {
  // Request list of all Google Fonts, sorted by popularity
  const url = new URL(LIST_BASE_URL);
  url.searchParams.append('sort', 'popularity');
  url.searchParams.append('key', apiKey);
  const response = await get(url.href);

  // Parse font list
  const json = JSON.parse(response);

  // For each font:
  // - Rename "subset" key to "script"
  // - Generate fontId
  // Return the updated list
  const fontsOriginal = json.items;
  return fontsOriginal.map((fontOriginal) => {
    const { family, subsets, ...others } = fontOriginal;
    return {
      ...others,
      family,
      id: getFontId(family),
      scripts: subsets,
    };
  });
}
