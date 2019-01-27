// const rq = require('./ClientRequests');
import React from 'react';
import ReactDOM from 'react-dom';

import EntryForm from './EntryForm';
import Table from './Table';
const rp = require('request-promise');
const errors = require('request-promise/errors');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      username: '',
      secrets: []
    };
  }

  componentDidMount = () => {
    this.retrieveSecrets('Johnpaul_Kutch');
  }

  render() {
    return (
      <div>
        <Table secrets={this.state.secrets}/>
        <EntryForm />
      </div>
    );
  }

  retrieveSecrets = (username) => {
    var options = {
      uri: `http://localhost:3000/api/keepsafe/secrets/`,
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/json'
      },
      qs: {
          username: username
      },
      json: true
    };
    rp(options)
      .then(results => {
        // this.setState((state) => {
          // state.secrets = results;
          // state.isLoaded = true;
        // });
        this.setState({secrets: results})
      })
      .catch(errors.StatusCodeError, reason => {
        console.error(`ERROR @ function 'retrieveSecrets().'\n${reason.statusCode}`)})
      .catch(errors.RequestError, reason => {
        console.error(`ERROR @ function 'retrieveSecrets().'\n${reason.cause}`)}).bind;
  };

}

export default App;