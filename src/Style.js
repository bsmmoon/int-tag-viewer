/**
 * Style
 */
class Style {
  /**
   * return base and presets
   * @return {jsx} object of styles
   */
  static import() {
    return {
      base: Style.base(),
      presets: Style.presets(),
    };
  }

  /**
   * list of colours used
   * @return {jsx} object of colours
   */
  static colours() {
    const colours = {
      red: '#DC143C',
      green: '#008000',
      blue: '#6666ff',
      grey: '#e5e5e5',
    };
    return colours;
  }

  /**
   * preset combined styles
   * @return {jsx} object of styles
   */
  static presets() {
    const base = this.base();
    const colours = this.colours();
    const presets = {
      logLine: Style.merge([
        base.backgroundColour.lightGrey,
        base.border.bottom,
        base.margin.bottom.medium,
        base.align.hcvc,
        {
          borderLeftColor: colours.blue,
          borderLeftStyle: 'solid',
          borderLeftWidth: '6px',
        },
      ]),
    };
    return presets;
  }
  /**
   * base styles
   * @return {jsx} object of styles
   */
  static base() {
    const colours = this.colours();
    const style = {
      font: {
        bold: {'fontWeight': 'bold'},
        colour: {
          red: {'color': colours.red},
          green: {'color': colours.green},
        },
        size: {
          medium: {
            fontSize: '18px',
          },
          small: {
            fontSize: '11px',
          },
        },
      },
      backgroundColour: {
        lightGrey: {
          backgroundColor: colours.grey,
        },
      },
      border: {
        bottom: {
          borderBottom: '2px solid #000',
        },
      },
      margin: {
        right: {
          small: {
            marginRight: '10px',
          },
          meidum: {
            marginRight: '20px',
          },
        },
        bottom: {
          small: {
            marginBottom: '10px',
          },
          medium: {
            marginBottom: '20px',
          },
        },
      },
      align: {
        vc: {
          display: 'flex',
          alignItems: 'center', /* Vertical center alignment */
        },
        vb: {
          display: 'flex',
          alignItems: 'flex-end', /* Vertical center alignment */
        },
        hc: {
          display: 'flex',
          justifyContent: 'center', /* Horizontal center alignment */
        },
        hcvc: {
          display: 'flex',
          alignItems: 'center', /* Vertical center alignment */
          justifyContent: 'center', /* Horizontal center alignment */
        },
      },
    };
    return style;
  }

  /**
   * Later style will overwrite any existing style attribute.
   * @param {objects} styles Array of Objects
   * @return {jsx} combined object of given styles
   */
  static merge(styles) {
    let combined = {};
    for (let style of styles) {
      Object.assign(combined, style);
    }
    return combined;
  }
}

export default Style;
