// import Safe from '../../lib/getTime'
import React from 'react';
import EntryForm from './EntryForm';
import TestButton from './TestButton';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id='app'>
        <TestButton />
        <EntryForm />
      </div>
    )
  }
}

export default App;