import React, {Component} from 'react';

import Style from './Style';

class Test extends Component {
  constructor(props) {
    super(props);

    this.style = Style.common();

    this.state = {
      name: props.name,
      message: 'This is my new test component',
    };
  }

  render () {
    return (
      <div>
        <p style={Style.merge([this.style.font.colour.red, this.style.font.bold])}>{this.state.name}</p>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Test
