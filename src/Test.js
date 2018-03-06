import React, {Component} from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'This is my new test component',
    };
  }

  render () {
    return (
      <div>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Test
