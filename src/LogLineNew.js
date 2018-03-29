// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import Tag from './Tag';
import Icon from './Icon';
/* eslint-enable no-unused-vars */

import Style from './Style';

/**
 * LogLineNew
 */
class LogLineNew extends Component {
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
   * TODO: consider using ENTER instead to allow , in tag name
   * @param {*} newTag String of tag
   */
  addTag(newTag) {
    newTag = newTag.replace(/[^0-9a-z,-_ ]/gi, '');
    if (newTag.trim().slice(-1) === ',') {
      newTag = newTag.slice(0, 20 + 1);
      const name = newTag.slice(0, -1).trim();
      let tags = this.state.tags;
      if (name.length > 0) {
        if (tags.indexOf(name) === -1) {
          tags = tags.concat(name);
        }
      }
      this.setState({
        tags: tags,
        newTag: '',
      });
    } else {
      newTag = newTag.slice(0, 20);
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
    }) : <div style={Style.merge([this.style.base.margin.right.small, this.style.base.margin.bottom.tiny, {display: 'inline-block'}])}>No tag</div>;

    return (
      <span>{tagComponents}</span>
    );
  }

  /**
   * handle special keys
   * @param {*} keyCode key code passed from react event
   */
  onKeyDown(keyCode) {
    if (keyCode === 8) {
      if (this.state.newTag.length === 0) {
        let tags = this.state.tags;
        tags.pop();
        this.setState({
          tags: tags,
        });
      }
    }
  }

  /**
   * usual React render
   * @return {jsx} component with row class
   */
  render() {
    const tagComponents = this.makeTagComponents(this.state.tags);

    return (
      <div className='row' style={this.style.presets.logLineNew}>
        <div className='col-xs-1'>Add</div>
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
                onKeyDown={(e) => this.onKeyDown(e.keyCode)}
              ></input>
            </div>
          </div>
        </div>
        <div className='col-xs-2'>
          <div className='row'>
            <div className='col-xs-6'><Icon type={'fas fa-save'}/></div>
            <div className='col-xs-6'><Icon type={'fas fa-times-circle'} hoverColour={this.style.colours.red}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogLineNew;
