import React, {Component} from 'react';

import Test from './Test';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'This is my new react app',
    };
  }

  render () {
    return (
      <div>
        <p>{this.state.message}</p>
        <Test/>
      </div>
    )
  }
}

export default App
