import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CredentialForm from './CredentialForm';

class ModalTabs extends React.Component {
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
          <CredentialForm
            buttonLabel='Sign in'
            handleSubmit={this.props.handleSigninAttempt}
            isAuth={this.props.isAuth}
          />
        </Tab>
        <Tab eventKey='signup' title='Sign Up'>
          <CredentialForm
            buttonLabel='Sign up'
            handleSubmit={this.props.handleCreateNewUserAttempt}
            isAuth={this.props.isAuth}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default ModalTabs;
