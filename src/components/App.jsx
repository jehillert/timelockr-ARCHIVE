import React from 'react';
import { AuthModal, Main } from 'Components';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
// import ClientRequests from './../scripts/ClientRequests.js';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import Styles from './../styles/styles.css';

const ClientRequests = require('./../scripts/ClientRequests.js')
const Promise = require('bluebird');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      username: '',
      viewState: false
    };

    this.handleSignin = this.handleSignin.bind(this);
    this.handleCreateNewUserAttempt = this.handleCreateNewUserAttempt.bind(this);
  }

  handleSignin = (user, pass) => {
    console.log(`signing in`);
    // auth indicated by non-zero value for result.user_id
    ClientRequests.verifyUser(user, pass)
      .then(result => {
        this.setState((state, props) => ({
          user_id: result.user_id,
          username: user,
          viewState: result.viewState
        }));
      });
  }

  handleCreateNewUserAttempt = (user, pass) => {
    // createNewUser(user, pass)
    //   .then(response => {
    //     alert(response.data);
    //   });
  }

  render() {
    return (
      <Router>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Route exact path="/" render={() => (
            this.state.viewState ? (
              <Main
                user_id={this.state.user_id}
                username={this.state.username}
                viewState={this.state.viewState}
              />
            ) : (
              <AuthModal
                handleSignin={this.handleSignin}
                handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
                viewState={this.state.viewState}
              />
            )
          )}/>
        </MuiPickersUtilsProvider>
      </Router>
    );
  }
}

export default App;
