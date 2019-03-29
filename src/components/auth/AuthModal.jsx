import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { AuthTabs } from 'components';

// box-shadow: 0 0 100px rgba(24,29,39,.1), 0 15px 30px rgba(24,29,39,.1), 0 5px 10px rgba(24,29,39,.05);
const S = {};
S.Modal = styled(Modal)`
  div .modal-content {
    border-radius: ${props => props.theme.modalBorderRadius};
    border-shadow: ${props => props.theme.boxShadow};
  }
`;

class AuthModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      title: 'TimeLockr',
      show: true
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewState !== prevProps.viewState) {
      if (this.props.viewState < 2) {
        this.handleShow();
      } else {
        this.handleClose();
      }
    }
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  setTitle = (newTitle) => {
    this.setState((state) => state.title = newTitle);
  }

  render() {
    return (
      <S.Modal backdrop='static' show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AuthTabs
              handleSignin={this.props.handleSignin}
              handleCreateNewUserAttempt={this.props.handleCreateNewUserAttempt}
              viewState={this.props.viewState}
              setTitle={this.setTitle}
            />
        </Modal.Body>
      </S.Modal>
    );
  }
}

AuthModal.propTypes = {
  handleSignin: PropTypes.func.isRequired,
  handleCreateNewUserAttempt: PropTypes.func.isRequired,
  viewState: PropTypes.bool.isRequired
};

export default AuthModal;

