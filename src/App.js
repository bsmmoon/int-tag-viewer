import React, {Component} from 'react';

import Test from './Test';
import DataAdapter from './adapters/DataAdapter'

class App extends Component {
  constructor(props) {
    super(props);
    let data = DataAdapter.import();
    this.state = {
      data: data,
      message: 'This is my new react app',
    };
  }

  render () {
    console.log(this.state);
    return (
      <div>
        <p>{this.state.message}</p>
        <Test name="TEST 1"/>
        <Test name="TEST 2"/>
      </div>
    )
  }
}

export default App
