import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { AuthTabs } from 'components';

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
      show: true,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { viewState } = this.props;
    if (viewState !== prevProps.viewState) {
      if (viewState < 2) {
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
    // eslint-disable-next-line no-return-assign
    this.setState(state => state.title = newTitle);
  }

  render() {
    const { show, title } = this.state;
    const { handleCreateNewUserAttempt, handleSignin, viewState } = this.props;

    return (
      <S.Modal backdrop='static' show={show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthTabs
            handleSignin={handleSignin}
            handleCreateNewUserAttempt={handleCreateNewUserAttempt}
            viewState={viewState}
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
  viewState: PropTypes.bool.isRequired,
};

export default AuthModal;
