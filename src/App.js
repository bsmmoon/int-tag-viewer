// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import LogLine from './LogLine';
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
   * @param {objects} logs array of log data with id, description, and time
   * @return {jsx} component
   */
  makeLogLinesComponent(logs) {
    console.log('makeLogLinesComponent');
    const allTags = this.state.tags;
    const logLinesComponent = logs.map(function(logLine) {
      const tags = logLine.tagIds.map(function(tagId) {
        return allTags[tagId];
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
    console.log('App#render');
    console.log(this.state);

    const listSummaryComponent = this.makeListSummaryComponent(this.state.list);
    const logLinesComponent = this.makeLogLinesComponent(this.state.list.logs);

    return (
      <div className='container'>
        {listSummaryComponent}
        {logLinesComponent}
      </div>
    );
  }
}

export default App;
