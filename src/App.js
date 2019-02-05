import React, { Component } from 'react';
import Stopwatch from './components/timer'
import DocumentTitle from 'react-document-title'

class App extends Component {
  render() {
    return (
      <DocumentTitle title='Stopwatch Tracker'>
        <div>
          <Stopwatch />
        </div>
      </DocumentTitle>
    );
  }
}

export default App;
