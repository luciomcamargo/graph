import React, { Component } from 'react';
import Chart from './components/Chart';
import Tags from './components/Tags';

const divStyle = {
  display: 'flex',
  border: 'solid',
  borderWidth: '0.07vw',
  marginLeft: '70vw'
};

class App extends Component {
  render() {
    return (
      <div>
        <div style={divStyle}>
          <Tags />
          <i className='fas fa-caret-down' />
        </div>

        <div>
          <Chart />
        </div>
      </div>
    );
  }
}

export default App;
