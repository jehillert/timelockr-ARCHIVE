import React from 'react';
import { AuthForm
       , Tabs
       , Tab } from 'Components';
import PropTypes from 'prop-types';

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
      <Tabs
        id='modal-tabs'
        className='nav-justified'
        activeKey={this.state.key}
        transition={false}
        onSelect={key => this.setState({ key }, this.handleSelect)}
      >
        <Tab eventKey='signin' title='Sign in'>
          <AuthForm
            buttonLabel='Sign in'
            handleSubmit={this.props.handleSignin}
            viewState={this.props.viewState}
          />
        </Tab>
        <Tab eventKey='signup' title='Sign Up'>
          <AuthForm
            buttonLabel='Sign up'
            handleSubmit={this.props.handleCreateNewUserAttempt}
            viewState={this.props.viewState}
          />
        </Tab>
      </Tabs>
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