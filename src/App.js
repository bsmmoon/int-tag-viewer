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
    let data = DataAdapter.import();
    this.state = {
      list: data.list,
      tags: data.tags,
    };
  }

  /**
   * method to create new LogLine
   * @param {string} description description of the new line
   * @return {object} object of new LogLine
   */
  addNewLogLine(description) {
    let logs = this.state.list.logs;
    let newLogLineData = {
      description: description,
      tagIds: [],
    };

    let newLog = DataAdapter.createLogLine(newLogLineData);
    if (!newLog) return;

    logs = logs.unshift(newLog);
    this.setState({logs: logs});
    return newLog;
  }

  /**
   * set tags to LogLine. if necessary create new tags.
   * @param {*} logLine hi
   * @param {*} tags list of name of tags
   */
  setTagsToLogLine(logLine, tags) {
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
    />;
    return newLogLineComponent;
  }

  /**
   * construct LogLing components
   * @param {objects} logs array of log data with id, description, and time
   * @return {jsx} component
   */
  makeLogLinesComponent(logs) {
    const allTags = this.state.tags;
    const logLinesComponent = logs.map(function(logLine) {
      const tags = logLine.tagIds.map(function(tagId) {
        return allTags[tagId].name;
      });
      return <LogLine
        key={logLine.id}
        id={logLine.id}
        description={logLine.description}
        time={logLine.time}
        tags={tags}
      />;
    });
    return logLinesComponent;
  }

  /**
   * usual React render
   * @return {jsx} component
   */
  render() {
    const newLogLineComponent = this.makeNewLogLineComponent();
    const listSummaryComponent = this.makeListSummaryComponent(this.state.list);
    const logLinesComponent = this.makeLogLinesComponent(this.state.list.logs);

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
