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
      timeRange: props.timeRange,
    };
  }

  /**
   * usual React render
   * @return {jsx} component with row class
   */
  render() {
    return (
      <div className='row' style={Style.merge([this.style.base.margin.bottom.medium, this.style.base.font.size.small])}>
        <div className='row' style={Style.merge([this.style.base.font.size.medium])}>
          <div className='col-xs-2'>List Name:</div>
          <div className='col-xs'>{this.state.name}</div>
        </div>
        <div className='row'>
          <div className='col-xs-2'>List Description:</div>
          <div className='col-xs'>{this.state.description}</div>
        </div>
        <div className='row'>
          <div className='col-xs-2'>Applied Tags:</div>
          <div className='col-xs'>{this.state.tags}</div>
        </div>
        <div className='row'>
          <div className='col-xs-2'>Applied Filters:</div>
          <div className='col-xs'>{this.state.filters}</div>
        </div>
        <div className='row'>
          <div className='col-xs-2'>Time Range:</div>
          <div className='col-xs'>{this.state.timeRange}</div>
        </div>
      </div>
    );
  }
}

export default ListSummary;
