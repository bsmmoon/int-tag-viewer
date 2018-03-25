// React and component classes are not cught by Eslint.
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import Test from './Test';
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
      message: 'This is my new react app',
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
    return (
      <div className='container'>{logLines}</div>
    );
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
      <div>
        <p>{this.state.message}</p>
        <Test name="TEST 1"/>
        <Test name="TEST 2"/>

        {logLines}
      </div>
    );
  }
}

export default App;
