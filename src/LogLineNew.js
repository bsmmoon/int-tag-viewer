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
      newTag: '',
      tags: [],
      addNewLogLine: props.addNewLogLine,
      setTagsToLogLine: props.setTagsToLogLine,
      toggleTag: props.toggleTag,
    };
  }

  /**
   * convert string of tag into actual tag
   * TODO: consider using ENTER instead to allow , in tag name
   * @param {*} name tag name
   */
  addTag(name) {
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
  }

  /**
   * trigger addTag if , is passed
   * TODO: consider using ENTER instead to allow , in tag name
   * @param {*} newTag tag name
   */
  triggerAddTag(newTag) {
    newTag = newTag.replace(/[^0-9a-z,-_ ]/gi, '');
    if (newTag.trim().slice(-1) === ',') {
      newTag = newTag.slice(0, 20 + 1);
      const name = newTag.slice(0, -1).trim();
      this.addTag(name);
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
      return <Tag
        key={tag}
        name={tag}
        toggleTag={this.state.toggleTag}
      />;
    }.bind(this)) : <div
      style={Style.merge([this.style.base.margin.right.small, this.style.base.margin.bottom.tiny, {display: 'inline-block'}])}
    >No tag</div>;

    return (
      <span>{tagComponents}</span>
    );
  }

  /**
   * handle special keys at tag input
   * @param {*} keyCode key code passed from react event
   */
  onKeyDownAtTagInput(keyCode) {
    if (keyCode === 8) {
      if (this.state.newTag.length === 0) {
        let tags = this.state.tags;
        tags.pop();
        this.setState({
          tags: tags,
        });
      }
    } else if (keyCode === 13) {
      if (this.state.newTag.length > 0) {
        this.addTag(this.state.newTag);
      } else {
        this.onKeyDown(keyCode);
      }
    } else {
      this.onKeyDown(keyCode);
    }
  }

  /**
   * handle special keys at this component
   * @param {*} keyCode key code passed from react event
   */
  onKeyDown(keyCode) {
    if (keyCode === 13) {
      this.triggerSave();
    }
  }

  /**
   * Add new LogLine based on current description and tags
   */
  triggerSave() {
    let newLogLine = this.state.addNewLogLine(this.state.description);
    if (!newLogLine) return;
    this.state.setTagsToLogLine(newLogLine.id, this.state.tags);
    this.setState({
      description: '',
      newTag: '',
      tags: [],
    });
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
              <input
                type="text"
                value={this.state.description}
                onChange={(e) => this.setState({description: e.target.value})}
                onKeyDown={(e) => this.onKeyDown(e.keyCode)}
              ></input>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12' style={Style.merge([this.style.base.font.size.small])}>
              {tagComponents}
              <input
                type="text"
                value={this.state.newTag}
                onChange={(e) => this.triggerAddTag(e.target.value)}
                onKeyDown={(e) => this.onKeyDownAtTagInput(e.keyCode)}
              ></input>
            </div>
          </div>
        </div>
        <div className='col-xs-2'>
          <div className='row'>
            <div className='col-xs-6'><Icon type={'fas fa-save'} onClick={() => this.triggerSave()}/></div>
            <div className='col-xs-6'><Icon type={'fas fa-times-circle'} hoverColour={this.style.colours.red}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogLineNew;
