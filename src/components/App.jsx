import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom';
import AuthModal from './AuthModal'
import Protected from './../views/Protected'
import Styles from './../styles/styles.css';
const req = require('./../scripts/ClientRequests');
const Promise = require('bluebird');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isAuth: false,
    };

    this.handleSigninAttempt = this.handleSigninAttempt.bind(this);
    this.handleCreateNewUserAttempt = this.handleCreateNewUserAttempt.bind(this);
  }

  handleSigninAttempt = (user, pass) => {
    req.verifyUser(user, pass)
      .then(result => {
        console.log(result.message);
        this.setState((state, props) => ({
          username: user,
          isAuth: result.userAuthenticated
        }));
    });
  }

  handleCreateNewUserAttempt = (user, pass) => {
    req.createNewUser(user, pass)
      .then(result => {
        alert(result.userCreated);
        if (result.userCreated) {
          <Redirect to="/protected"/>
        }
      });
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => (
          this.state.isAuth ? (
            <Protected
              username={this.state.username}
              isAuth={this.state.isAuth}
            />
          ) : (
            <AuthModal
              handleSigninAttempt={this.handleSigninAttempt}
              handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
              isAuth={this.state.isAuth}
            />
          )
        )}/>
      </Router>
    );
  }
}

export default App;
// <Route
//   exact path='/'
//   render={(props) => (
//     <AuthModal {...props}
//       handleSigninAttempt={this.handleSigninAttempt}
//       handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
//       isAuth={this.state.isAuth}
//     />)}
// />
// <Route
//   path="/protected"
//   render={(props) => (
//     <Protected {...props}
//       username={this.state.username}
//       isAuth={this.state.isAuth}
//     />)}
// />