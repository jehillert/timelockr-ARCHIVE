require('dotenv').config();
const rq = require('./ClientRequests');
import React from 'react';
import EntryForm from './EntryForm';
import Table from './Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      username: 'Johnpaul_Kutch',
      secrets: []
    };
  }

  componentDidMount() {
    rq.retrieveSecrets(this.state.username)
      .then(results => {
        this.setState(state => {
          state.secrets = results;
        });
      });
  }

  render() {
    return (
      <div id='app'>
        <EntryForm />
        <Table secrets={this.state.secrets}/>
      </div>
    );
  }
}

export default App;