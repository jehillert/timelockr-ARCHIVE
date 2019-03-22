import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AuthForm
       , ErrorBoundary } from 'Components';

const S = {};
S.Tabs = styled(Tabs)`
  background-color: #6A6A6A;
  margin: -1rem;

  .nav-link {
    border-radius: 0rem;
    color: white;
    border: none;
  }

  a:hover {
    background-color: #D93646;
    border-color: #D93646;
  }
`;

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
      this.props.setTitle('TimeLockr');
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <S.Tabs
          id='modal-tabs'
          className='nav-justified'
          activeKey={this.state.key}
          transition={false}
          onSelect={key => this.setState({ key }, this.handleSelect)}
        >
          <Tab eventKey='signin' title='Sign In'>
            <ErrorBoundary>
              <AuthForm
                handleSubmit={this.props.handleSignin}
                viewState={this.props.viewState}
              />
            </ErrorBoundary>
          </Tab>
          <Tab eventKey='signup' title='Sign Up'>
            <ErrorBoundary>
              <AuthForm
                handleSubmit={this.props.handleCreateNewUserAttempt}
                viewState={this.props.viewState}
              />
            </ErrorBoundary>
          </Tab>
        </S.Tabs>
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


// <S.Tabs>
// </S.Tabs >
// import styled from 'styled-components';
