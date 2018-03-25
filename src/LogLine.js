// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
/* eslint-enable no-unused-vars */

/**
 * LogLine
 */
class LogLine extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      description: props.description,
      time: props.time,
    };
  }

  /**
   * usual React render
   * @return {jsx} component
   */
  render() {
    console.log('LogLine#render');
    console.log(this.state);
    return (
      <div className='row'>
        <div></div>
        {[this.state.id, this.state.description, this.state.time]}
      </div>
    );
  }
}

export default LogLine;
