// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
/* eslint-enable no-unused-vars */

import Style from './Style';

/**
 * LogLine
 */
class Tag extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);

    this.style = Style.import();

    this.state = {
      name: props.name,
    };
  }

  /**
   * usual React render
   * @return {jsx} component with row class
   */
  render() {
    console.log('Tag#render');
    console.log(this.state);
    return (
      <span style={Style.merge([this.style.base.margin.right.small])}>{this.state.name}</span>
    );
  }
}

export default Tag;
