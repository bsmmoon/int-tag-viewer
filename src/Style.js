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
   * preset combined styles
   * @return {jsx} object of styles
   */
  static presets() {
    const base = this.base();
    const presets = {
      logLine: Style.merge([
        base.backgroundColour.lightGrey,
        base.border.bottom,
        base.margin.bottom,
        base.align.hcvc,
      ]),
    };
    return presets;
  }
  /**
   * base styles
   * @return {jsx} object of styles
   */
  static base() {
    const style = {
      font: {
        bold: {'fontWeight': 'bold'},
        colour: {
          red: {'color': '#DC143C'},
          green: {'color': '#008000'},
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
          backgroundColor: '#D3D3D3',
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
          marginBottom: '20px',
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
