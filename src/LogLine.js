// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
/* eslint-enable no-unused-vars */

import Style from './Style';

/**
 * LogLine
 */
class LogLine extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);

    this.style = Style.import();

    this.state = {
      id: props.id,
      description: props.description,
      time: props.time,
    };
  }

  /**
   * usual React render
   * @return {jsx} component with row class
   */
  render() {
    console.log('LogLine#render');
    console.log(this.state);
    return (
      <div className='row' style={this.style.presets.logLine}>
        <div className='col-xs-1'>{this.state.id}</div>
        <div className='col-xs-9'>
          <div className='row' style={Style.merge([this.style.base.align.vc])}>
            <div className='col-xs-9' style={Style.merge([this.style.base.font.size.medium])}>{this.state.description}</div>
            <div className='col-xs-3' style={Style.merge([this.style.base.font.size.small])}>{this.state.time}</div>
          </div>
          <div className='row'>
            <div className='col-xs-12' style={Style.merge([this.style.base.font.size.small])}>TAGS</div>
          </div>
        </div>
        <div className='col-xs-2'>
          <div className='row'>
            <div className='col-xs-6'>EDIT</div>
            <div className='col-xs-6'>TAG</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogLine;
