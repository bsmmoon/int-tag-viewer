// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import Tag from './Tag';
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

    this.toggleTag = props.toggleTag;

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
    const tags = this.state.tags;
    const tagComponents = tags.length > 0 ? tags.map(function(tag) {
      return <Tag
        key={tag}
        name={tag}
        toggleTag={this.toggleTag}
      />;
    }.bind(this)) : <div
      style={Style.merge([this.style.base.margin.right.small, this.style.base.margin.bottom.tiny, {display: 'inline-block'}])}
    >No tag</div>;
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
          <div className='col-xs'>{tagComponents}</div>
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
