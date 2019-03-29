import React from 'react';
import MomentUtils from '@date-io/moment';
import { AuthModal, Main } from 'components';
import { createNewUser, verifyUser } from 'utilities';
import { defaultTheme } from 'theme';
import { hot } from 'react-hot-loader'
import { GlobalStyle } from 'theme';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ThemeProvider } from 'styled-components';
import {
    BrowserRouter as Router
  , Route
} from 'react-router-dom';

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
    verifyUser(user, pass) // non-zero value indicates authenticated
      .then(result => {
        this.setState((state, props) => ({
          user_id: result.user_id,
          username: user,
          viewState: result.viewState
        }));
      });
  }

  handleCreateNewUserAttempt = (user, pass) => {
    createNewUser(user, pass)
      .then(response => {
        alert(response.data);
      });
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Router>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Route exact path='/' render={() => (
              this.state.viewState ? (
                <ThemeProvider theme={defaultTheme}>
                  <Main
                    user_id={this.state.user_id}
                    username={this.state.username}
                    viewState={this.state.viewState}
                  />
                </ThemeProvider>
              ) : (
                <ThemeProvider theme={defaultTheme}>
                  <AuthModal
                    handleSignin={this.handleSignin}
                    handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
                    viewState={this.state.viewState}
                  />
                </ThemeProvider>
              )
            )}/>
          </MuiPickersUtilsProvider>
        </Router>
      </>
    );
  }
}

export default hot(module)(App);
// export default App;
