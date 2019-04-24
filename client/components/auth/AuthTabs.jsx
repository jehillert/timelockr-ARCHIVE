import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AuthForm } from 'components';

const S = {};
S.Tabs = styled(Tabs)`
  background-color: ${props => props.theme.primaryColor};
  margin: -1rem;

  .nav-link {
    border-radius: ${props => props.theme.tabBorderRadius};
    color: ${props => props.theme.primaryFontColor};
    border: none;
  }

  a:hover {
    background-color: ${props => props.theme.backgroundHoverColor};
    border-color: ${props => props.theme.backgroundBorderHoverColor};
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
    let title = '';
    const { key } = this.state;
    const { setTitle } = this.props;

    if (key === 'signin') {
      title = 'TimeLockr';
    } else {
      title = 'TimeLockr';
    }
    return setTitle(title);
  }

  render() {
    const {
      handleSignin,
      handleAddUser,
    } = this.props;
    return (
      <S.Tabs
        id='modal-tabs'
        className='nav-justified'
        // eslint-disable-next-line react/destructuring-assignment
        activeKey={this.state.key}
        transition={false}
        onSelect={key => this.setState({ key }, this.handleSelect)}
      >
        <Tab eventKey='signin' title='Sign In'>
          <AuthForm
            handleSubmit={handleSignin}
          />
        </Tab>
        <Tab eventKey='signup' title='Sign Up'>
          <AuthForm
            handleSubmit={handleAddUser}
          />
        </Tab>
      </S.Tabs>
    );
  }
}

AuthTabs.propTypes = {
  handleSignin: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default AuthTabs;
