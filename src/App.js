// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import LogLine from './LogLine';
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
      data: data,
    };
  }

  /**
   * construct LogLing components
   * @return {jsx} component
   */
  logLines() {
    const logLines = this.state.data.logs.map(function(logLine) {
      return <LogLine
        key={logLine.id}
        id={logLine.id}
        description={logLine.description}
        time={logLine.time}
      />;
    });
    return logLines;
  }

  /**
   * usual React render
   * @return {jsx} component
   */
  render() {
    console.log('App#render');
    console.log(this.state);

    const logLines = this.logLines();

    return (
      <div className='container'>
        <div className='row'><div className='col-xs-12'>Name of the Current List</div></div>
        <div className='row'><div className='col-xs-12'>Description of the Current List</div></div>
        <div className='row'><div className='col-xs-12'>Applied Tags / Rules</div></div>
        <div className='row'><div className='col-xs-12'>Additional Filters</div></div>
        <div className='row'><div className='col-xs-12'>Time Range Options</div></div>
        {logLines}
      </div>
    );
  }
}

export default App;
