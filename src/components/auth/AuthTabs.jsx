import React from 'react';
import PropTypes from 'prop-types';
import { AuthForm
       , ErrorBoundary
       , Tabs
       , Tab } from 'Components';

class AuthTabs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'signin',
    };
  }

  handleSelect = () => {
    if (this.state.key === 'signin') {
      this.props.setTitle('TimeLockr');
    } else {
      this.props.setTitle('Create New User');
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <Tabs
          id='modal-tabs'
          className='nav-justified'
          activeKey={this.state.key}
          transition={false}
          onSelect={key => this.setState({ key }, this.handleSelect)}
        >
          <Tab eventKey='signin' title='Sign In'>
            <ErrorBoundary>
              <AuthForm
                buttonLabel='Submit'
                handleSubmit={this.props.handleSignin}
                viewState={this.props.viewState}
              />
            </ErrorBoundary>
          </Tab>
          <Tab eventKey='signup' title='Sign Up'>
            <ErrorBoundary>
              <AuthForm
                buttonLabel='Submit'
                handleSubmit={this.props.handleCreateNewUserAttempt}
                viewState={this.props.viewState}
              />
            </ErrorBoundary>
          </Tab>
        </Tabs>
      </ErrorBoundary>
    );
  }
}

AuthTabs.propTypes = {
  handleSignin: PropTypes.func.isRequired,
  handleCreateNewUserAttempt: PropTypes.func.isRequired,
  viewState: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired
};

export default AuthTabs;