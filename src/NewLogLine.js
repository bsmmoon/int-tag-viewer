// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import Tag from './Tag';
/* eslint-enable no-unused-vars */

import Style from './Style';

/**
 * NewLogLine
 */
class NewLogLine extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);

    this.style = Style.import();

    this.state = {
      description: '',
      tags: [],
      newTag: '',
    };
  }

  /**
   * convert string of tag into actual tag
   * @param {*} newTag String of tag
   */
  addTag(newTag) {
    if (newTag.slice(-1) === ',') {
      const name = newTag.slice(0, -1);
      let tags = this.state.tags;
      if (tags.indexOf(name) === -1) {
        tags = tags.concat(name);
      }

      this.setState({
        tags: tags,
        newTag: '',
      });
    } else {
      this.setState({
        newTag: newTag,
      });
    }
  }

  /**
   * construct LogLing components
   * @param {object} tags with name
   * @return {jsx} span component
   */
  makeTagComponents(tags) {
    const tagComponents = tags.length > 0 ? tags.map(function(tag) {
      return <Tag key={tag} name={tag}/>;
    }) : 'Tag: ';

    return (
      <span>{tagComponents}</span>
    );
  }

  /**
   * usual React render
   * @return {jsx} component with row class
   */
  render() {
    console.log('NewLogLine#render');
    console.log(this.state);

    const tagComponents = this.makeTagComponents(this.state.tags);

    return (
      <div className='row' style={this.style.presets.newLogLine}>
        <div className='col-xs-1'>{this.state.id}</div>
        <div className='col-xs-9'>
          <div className='row' style={Style.merge([this.style.base.align.vc])}>
            <div className='col-xs-9' style={Style.merge([this.style.base.font.size.medium])}>
              <input type="text" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></input>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12' style={Style.merge([this.style.base.font.size.small])}>
              {tagComponents}
              <input
                type="text"
                value={this.state.newTag}
                onChange={(e) => this.addTag(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className='col-xs-2'>
          <div className='row'>
            <div className='col-xs-6'>Save</div>
            <div className='col-xs-6'>Close</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewLogLine;
