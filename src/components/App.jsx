/* eslint-disable react/jsx-indent */
import React from 'react';
import MomentUtils from '@date-io/moment';
import { AuthModal, Main } from 'components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createNewUser, verifyUser } from 'utilities';
import { defaultTheme, GlobalStyle } from 'theme';
import { hot } from 'react-hot-loader/root';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      username: '',
      viewState: false,
    };

    this.handleSignin = this.handleSignin.bind(this);
    this.handleCreateNewUserAttempt = this.handleCreateNewUserAttempt.bind(this);
  }

  handleSignin = (user, pass) => {
    console.log('signing in');
    return verifyUser(user, pass) // non-zero value indicates authenticated
      .then((result) => {
        this.setState((state, props) => ({
          userId: result.userId,
          username: user,
          viewState: result.viewState,
        }));
      });
  }

  handleCreateNewUserAttempt = (user, pass) => {
    return createNewUser(user, pass)
      .then((response) => {
        alert(response.data);
      });
  }

  render() {
    const { userId, username, viewState } = this.state;
    return (
      <>
        <SnackbarProvider maxSnack={3}>
        <GlobalStyle />
        <Router>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Route
            exact
            path='/'
            render={() => (
              viewState ? (
                <ThemeProvider theme={defaultTheme}>
                  <Main
                    userId={userId}
                    username={username}
                    viewState={viewState}
                  />
                </ThemeProvider>
              ) : (
                <ThemeProvider theme={defaultTheme}>
                  <AuthModal
                    handleSignin={this.handleSignin}
                    handleCreateNewUserAttempt={this.handleCreateNewUserAttempt}
                    viewState={viewState}
                  />
                </ThemeProvider>
              )
            )}
          />
        </MuiPickersUtilsProvider>
        </Router>
        </SnackbarProvider>
      </>
    );
  }
}

export default hot(App);
// export default hot(module)(App);
// export default App;
