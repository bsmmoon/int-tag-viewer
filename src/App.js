// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import LogLine from './LogLine';
import LogLineNew from './LogLineNew';
import ListSummary from './ListSummary';
/* eslint-enable no-unused-vars */

import DataAdapter from './adapters/DataAdapter';

/**
 * This is the base component.
 */
class App extends Component {
  /**
   * @param {*} props React props
   */
  constructor(props) {
    super(props);
    let state = {};
    Object.assign(state, {
      loaded: false,
    });
    this.state = state;

    this.dataAdapter = new DataAdapter();
    this.dataAdapter.import().then((data) => {
      Object.assign(state, {
        listDetails: data.listDetails,
        logLines: data.logLines,
        tags: data.tags,
        loaded: true,
      });
      this.setState(state);
    });
  }

  /**
   * toggle tag
   * @param {*} tag tag name
   */
  toggleTag(tag) {
    let state = this.state;
    let tags = state.listDetails.tags;
    const index = tags.indexOf(tag);
    if (index === -1) {
      tags.push(tag);
    } else {
      tags.splice(index, 1);
    }
    this.dataAdapter.reimport({
      tags: tags,
    }).then((data) => {
      Object.assign(state, {
        listDetails: data.listDetails,
        logLines: data.logLines,
        tags: data.tags,
      });
      this.setState(state);
    });
  }

  /**
   * method to create new LogLine
   * @param {string} description description of the new line
   * @return {object} object of new LogLine
   */
  addNewLogLine(description) {
    let logLines = this.state.logLines;
    let newLogLineData = {
      description: description,
      tags: [],
    };

    let newLog = this.dataAdapter.createLogLine(newLogLineData);
    if (!newLog) return;

    logLines[newLog.id] = newLog;
    this.setState({logLines: logLines});
    return newLog;
  }

  /**
   * set tags to LogLine. if necessary create new tags.
   * @param {*} logLineId id
   * @param {*} logLineTags list of name of tags
   */
  setTagsToLogLine(logLineId, logLineTags) {
    let response = this.dataAdapter.setTagsToLogLine(logLineId, logLineTags);
    this.setState({logLines: response.logLines, tags: response.tags});
  }

  /**
   * construct LogLing components
   * @param {object} listData with name, description, tags, filters, and time_range
   * @return {jsx} component
   */
  makeListSummaryComponent(listData) {
    return <ListSummary
      name={listData.name}
      description={listData.description}
      tags={listData.tags}
      filters={listData.filters}
      timeRange={listData.timeRange}
      toggleTag={this.toggleTag.bind(this)}
    />;
  }

  /**
   * construct LogLing components
   * @return {jsx} component
   */
  makeNewLogLineComponent() {
    const allTags = this.state.tags;
    const newLogLineComponent = <LogLineNew
      tags={allTags}
      addNewLogLine={this.addNewLogLine.bind(this)}
      setTagsToLogLine={this.setTagsToLogLine.bind(this)}
      toggleTag={this.toggleTag.bind(this)}
    />;
    return newLogLineComponent;
  }

  /**
   * construct LogLing components
   * @param {objects} logLines array of log data with id, description, and time
   * @return {jsx} component
   */
  makeLogLinesComponent(logLines) {
    const allTags = this.state.tags;
    const logLinesComponent = Object.values(logLines).sort(function(a, b) {
      if (a.time > b.time) {
        return -1;
      } else if (a.time < b.time) {
        return 1;
      }
      return 0;
    }).map(function(logLine) {
      const tags = logLine.tags.map(function(tagId) {
        return allTags[tagId].name;
      });
      return <LogLine
        key={logLine.id}
        id={logLine.id}
        description={logLine.description}
        time={logLine.time}
        tags={tags}
        toggleTag={this.toggleTag.bind(this)}
      />;
    }.bind(this));
    return logLinesComponent;
  }

  /**
   * construct loading component
   * @return {jsx} component
   */
  makeLoadingComponent() {
    return (
      <div>Loading...</div>
    );
  }

  /**
   * usual React render
   * @return {jsx} component
   */
  render() {
    if (!this.state.loaded) return this.makeLoadingComponent();
    const newLogLineComponent = this.makeNewLogLineComponent();
    const listSummaryComponent = this.makeListSummaryComponent(this.state.listDetails);
    const logLinesComponent = this.makeLogLinesComponent(this.state.logLines);

    return (
      <div className='container'>
        {listSummaryComponent}
        {newLogLineComponent}
        {logLinesComponent}
      </div>
    );
  }
}

export default App;
