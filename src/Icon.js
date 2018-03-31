// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
/* eslint-enable no-unused-vars */

import Style from './Style';

/**
 * LogLine
 */
class Icon extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);

    this.style = Style.import();

    this.state = {
      type: props.type,
      isHovered: false,
      hoverColour: !!props.hoverColour ? props.hoverColour : this.style.colours.blue,
      onClick: props.onClick,
    };
  }

  /**
   * handle hover
   */
  toggleHover() {
    this.setState({isHovered: !this.state.isHovered});
  }

  /**
   * make icon jsx
   * @return {jsx} icon component
   */
  render() {
    return (
      <div
        onClick={(e) => this.state.onClick(e)}
        onMouseEnter={(e) => this.toggleHover()}
        onMouseLeave={(e) => this.toggleHover()}
        style={{
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center', /* Vertical center alignment */
          justifyContent: 'center', /* Horizontal center alignment */
          color: this.state.isHovered ? this.state.hoverColour : this.style.colours.black,
        }}
      ><i className={this.state.type}></i></div>
    );
  }
}

export default Icon;
