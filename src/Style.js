/**
 * Style
 */
class Style {
  /**
   * base styles
   * @return {jsx} object of styles
   */
  static common() {
    const style = {
      font: {
        bold: {'fontWeight': 'bold'},
        colour: {
          red: {'color': '#DC143C'},
          green: {'color': '#008000'},
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
