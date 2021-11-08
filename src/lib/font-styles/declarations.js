import { getFontId } from '../utils/ids';

const previewFontsStylesheet = document.createElement('style');
document.head.appendChild(previewFontsStylesheet);

/**
 * Add declaration for applying the specified preview font
 */
export function applyFontPreview(previewFont, selectorSuffix) {
  const fontId = getFontId(previewFont.family);
  const style = `
			#font-button-${fontId}${selectorSuffix} {
				font-family: "${previewFont.family}";
			}
		`;
  previewFontsStylesheet.appendChild(document.createTextNode(style));
}

/**
 * Create/find and return the apply-font stylesheet for the provided selectorSuffix
 */
function getActiveFontStylesheet(selectorSuffix) {
  const stylesheetId = `active-font-${selectorSuffix}`;
  let activeFontStylesheet = document.getElementById(stylesheetId);
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
export function applyActiveFont(activeFont, previousFontFamily, selectorSuffix) {
  const style = `
		.apply-font${selectorSuffix} {
			font-family: "${activeFont.family}"${previousFontFamily ? `, "${previousFontFamily}"` : ''};
		}
	`;
  const activeFontStylesheet = getActiveFontStylesheet(selectorSuffix);
  activeFontStylesheet.innerHTML = style;
}
