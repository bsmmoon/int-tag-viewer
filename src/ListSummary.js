// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
/* eslint-enable no-unused-vars */

import Style from './Style';

/**
 * LogLine
 */
class ListSummary extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);

    this.style = Style.import();

    this.state = {
      name: props.name,
      description: props.description,
      tags: props.tags,
      filters: props.filters,
      time_range: props.time_range,
    };
  }

  /**
   * usual React render
   * @return {jsx} component with row class
   */
  render() {
    console.log('ListSummary#render');
    console.log(this.state);
    return (
      <div className='row' style={[]}>
        <div className='row'><div className='col-xs-12'>{this.state.name}</div></div>
        <div className='row'><div className='col-xs-12'>{this.state.description}</div></div>
        <div className='row'><div className='col-xs-12'>{this.state.tags}</div></div>
        <div className='row'><div className='col-xs-12'>{this.state.filters}</div></div>
        <div className='row'><div className='col-xs-12'>{this.state.time_range}</div></div>
      </div>
    );
  }
}

export default ListSummary;
