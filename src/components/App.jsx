import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as
         Router
       , Route
       , Link
       , Redirect
       , withRouter } from 'react-router-dom';
import { AuthModal, Main } from 'Components';
import Styles from './../styles/styles.css';

const req = require('./../scripts/ClientRequests');
const Promise = require('bluebird');

class App extends React.Component {
  constructor(props) {
    super(props);

    /*
      viewState:
        0 - Signin
        1 - Signin (invalid credentials)
        2 - Signup
        3 - Signup (username taken)
        4 - Entry Form (alone)
        5 - Entry Form + Entries
    */
    this.state = {
      username: '',
      locked: [],
      released: [],
      viewState: false
    };

    this.handleSignin = this.handleSignin.bind(this);
    this.handleCreateNewUserAttempt = this.handleCreateNewUserAttempt.bind(this);
  }


  handleSignin = (user, pass) => {
    req.verifyUser(user, pass)
      .then(result => {
        return this.setState((state, props) => ({
          username: user,
          viewState: result.userAuthenticated
        }));
    })
    // .then(() => req.retrieveEntries(user)
    // .then(results => {
    //   this.setState((state, props) => ({
    //     locked: results.locked,
    //     released: results.released
    //   }));
    // });)
  }

  handleCreateNewUserAttempt = (user, pass) => {
    req.createNewUser(user, pass)
      .then(response => {
        alert(response.data);
      });
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => (
          this.state.viewState ?
            ( <AuthModal
                handleSignin={this.handleSignin}
                handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
                viewState={this.state.viewState} />
        ) : ( <Main
                username={this.state.username}
                viewState={this.state.viewState} /> )
        )}/>
      </Router>
    );
  }
}

export default App;