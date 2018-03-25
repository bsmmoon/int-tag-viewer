class Style {
  static common() {
    const style = {
      font: {
        bold: { 'fontWeight': 'bold' },
        colour: {
          red:   { 'color': '#DC143C' },
          green: { 'color': '#008000' },
        },
      }
    }
    return style;
  }

  // styles: Array of Objects
  // Later style will overwrite any existing style attribute.
  static merge(styles) {
    let combined = {};
    for (let style of styles) {
      Object.assign(combined, style);
    }
    return combined;
  }
}

export default Style
