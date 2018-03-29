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
      colours: Style.colours(),
    };
  }

  /**
   * list of colours used
   * @return {jsx} object of colours
   */
  static colours() {
    const colours = {
      black: 'black',
      red: '#DC143C',
      green: '#008000',
      blue: '#6666ff',
      grey: '#e5e5e5',
      white: '#ffffff',
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
      tag: Style.merge([
        {display: 'inline-block'},
        base.margin.right.small,
        base.margin.bottom.tiny,
        base.font.colour.white,
        base.backgroundColour.blue,
        {padding: '2px 6px 2px 6px'},
      ]),
      newLogLine: Style.merge([
        base.backgroundColour.lightGrey,
        base.border.bottom,
        base.margin.bottom.medium,
        base.align.hcvc,
        {
          borderLeftColor: colours.red,
          borderLeftStyle: 'solid',
          borderLeftWidth: '6px',
        },
      ]),
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
          white: {'color': colours.white},
        },
        size: {
          medium: {
            fontSize: '16px',
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
        blue: {
          backgroundColor: colours.blue,
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
          tiny: {
            marginBottom: '5px',
          },
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
