import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom';
import AuthModal from './AuthModal'
import ProtectedView from './../views/ProtectedView'
import Styles from './../styles/styles.css';

const req = require('./../scripts/ClientRequests');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isAuth: false,
    };

    this.handleSigninAttempt = this.handleSigninAttempt.bind(this);
    this.handleCreateNewUserAttempt = this.handleCreateNewUserAttempt.bind(this);
  }

  handleSigninAttempt = (usernameEntered, passwordEntered) => {
    req.verifyUser(usernameEntered, passwordEntered)
  }

  handleCreateNewUserAttempt = (usernameEntered, passwordEntered) => {
    console.log('this space intentionally left blank');
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact path='/'
            render={(props) => (
              <AuthModal {...props}
                handleSigninAttempt={this.handleSigninAttempt}
                handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
                isAuth={this.state.isAuth}
              />)}
          />
          <Route
            path="/protected"
            render={(props) => (
              <ProtectedView {...props}
                username={this.state.username}
                password={this.state.password}
                isAuth={this.state.isAuth}
              />)}
          />
        </div>
      </Router>
    );
  }
}

export default App;