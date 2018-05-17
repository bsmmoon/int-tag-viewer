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

    this.addNewLogLine = props.addNewLogLine;
    this.setTagsToLogLine = props.setTagsToLogLine;
    this.toggleTag = props.toggleTag;

    this.state = {
      description: '',
      tagInput: '',
      tags: [],
    };
  }

  /**
   * convert string of tag into actual tag
   * TODO: consider using ENTER instead to allow , in tag name
   * @param {*} name tag name
   */
  addTag(name) {
    this.addTags([name]);
  }

  /**
   * convert array of tags into actual tag
   * @param {*} newTags array of tags
   */
  addTags(newTags) {
    let tags = this.state.tags;
    if (newTags.length > 0) {
      for (let newTag of newTags) {
        if (tags.indexOf(newTag) === -1) {
          tags = tags.concat(newTag);
        }
      }
    }
    this.setState({
      tags: tags,
      tagInput: '',
    });
  }

  /**
   * trigger addTags if , exists
   * TODO: consider using ENTER instead to allow , in tag name
   * @param {*} tagInput tag name
   */
  triggerAddTag(tagInput) {
    tagInput = tagInput.replace(/[^0-9a-z,-_ ]/gi, '');
    if (tagInput.indexOf(',') !== -1) {
      let newTags = tagInput.split(',').map((e) => e.trim()).filter((e) => {
        return e.length > 0;
      });
      this.addTags(newTags);
    } else {
      tagInput = tagInput.slice(0, 20);
      this.setState({
        tagInput: tagInput,
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
        toggleTag={this.toggleTag}
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
      if (this.state.tagInput.length === 0) {
        let tags = this.state.tags;
        tags.pop();
        this.setState({
          tags: tags,
        });
      }
    } else if (keyCode === 13) {
      if (this.state.tagInput.length > 0) {
        this.triggerAddTag(this.state.tagInput);
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
    let newLogLine = this.addNewLogLine(this.state.description);
    if (!newLogLine) return;
    this.setTagsToLogLine(newLogLine.id, this.state.tags);
    this.setState({
      description: '',
      tagInput: '',
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
                value={this.state.tagInput}
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
