import { FONT_FAMILY_DEFAULT, FontManager, OPTIONS_DEFAULTS } from '@samuelmeuli/font-manager';
import React, { PureComponent } from 'react';

/**
 * Return the fontId based on the provided font family
 */
function getFontId(fontFamily) {
  return fontFamily.replace(/\s+/g, '-').toLowerCase();
}

export default class FontPicker extends PureComponent {
  static defaultProps = {
    activeFontFamily: FONT_FAMILY_DEFAULT,
    onChange: (e) => {},
    pickerId: OPTIONS_DEFAULTS.pickerId,
    families: OPTIONS_DEFAULTS.families,
    categories: OPTIONS_DEFAULTS.categories,
    scripts: OPTIONS_DEFAULTS.scripts,
    variants: OPTIONS_DEFAULTS.variants,
    filter: OPTIONS_DEFAULTS.filter,
    limit: OPTIONS_DEFAULTS.limit,
    sort: OPTIONS_DEFAULTS.sort,
  };

  state = {
    expanded: false,
    loadingStatus: 'loading',
  };

  constructor(props) {
    super(props);

    const {
      apiKey,
      activeFontFamily,
      pickerId,
      families,
      categories,
      scripts,
      variants,
      filter,
      limit,
      sort,
      onChange,
    } = this.props;

    const options = {
      pickerId,
      families,
      categories,
      scripts,
      variants,
      filter,
      limit,
      sort,
    };

    // Initialize FontManager object
    this.fontManager = new FontManager(apiKey, activeFontFamily, options, onChange);
  }

  componentDidMount = () => {
    // Generate font list
    this.fontManager
      .init()
      .then(() => {
        this.setState({
          loadingStatus: 'finished',
        });
      })
      .catch((err) => {
        // On error: Log error message
        this.setState({
          loadingStatus: 'error',
        });
        console.error('Error trying to fetch the list of available fonts');
        console.error(err);
      });
  };

  /**
   * Set the specified font as the active font in the fontManager and update activeFontFamily in the
   * state
   */
  setActiveFontFamily = (activeFontFamily) => {
    this.fontManager.setActiveFont(activeFontFamily);
  };

  /**
   * Generate <ul> with all font families
   */
  generateFontList = (fonts) => {
    const { loadingStatus } = this.state;

    if (loadingStatus !== 'finished') {
      return [];
    }
    return fonts.map((font) => {
      const fontId = getFontId(font.family);
      return (
        <option
          key={fontId}
          className='font-list-item'
          id={`font-button-${fontId}${this.fontManager.selectorSuffix}`}
          value={font.family}
        >
          {font.family}
        </option>
      );
    });
  };

  handleChange = (e) => {};

  render = () => {
    const { activeFontFamily, sort } = this.props;

    // Extract and sort font list
    const fonts = Array.from(this.fontManager.getFonts().values());
    if (sort === 'alphabet') {
      fonts.sort((font1, font2) => font1.family.localeCompare(font2.family));
    }

    // Render font picker button and attach font list to it
    return (
      <select
        id={`font-picker${this.fontManager.selectorSuffix}`}
        className='form-select'
        aria-label='Selecciona una opción'
        name='gift4Type'
        defaultValue={activeFontFamily}
        onChange={this.props.onChange}
      >
        {this.generateFontList(fonts)}
      </select>
    );
  };
}
