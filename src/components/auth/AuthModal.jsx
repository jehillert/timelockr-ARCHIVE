import React from 'react';
import PropTypes from 'prop-types';
import { AuthTabs
       , ErrorBoundary
       , Modal } from 'Components';

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
      <Modal backdrop='static' show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorBoundary>
            <AuthTabs
              handleSignin={this.props.handleSignin}
              handleCreateNewUserAttempt={this.props.handleCreateNewUserAttempt}
              viewState={this.props.viewState}
              setTitle={this.setTitle}
            />
          </ErrorBoundary>
        </Modal.Body>
      </Modal>
    );
  }
}

AuthModal.propTypes = {
  handleSignin: PropTypes.func.isRequired,
  handleCreateNewUserAttempt: PropTypes.func.isRequired,
  viewState: PropTypes.bool.isRequired
};

export default AuthModal;

// import styled from 'styled-components';
// const Modal = ({ className, children }) => (
//   <a className={className}>
//     {children}
//   </a>
// );
// const S = {};
// S.Modal = styled.div`
//   .modal-content {
//      border-radius: 0rem;
//      box-shadow: 0 0 100px rgba(24,29,39,.1), 0 15px 30px rgba(24,29,39,.1), 0 5px 10px rgba(24,29,39,.05);
//   }
// `;
// <S.Modal backdrop='static' show={this.state.show} onHide={this.handleClose}>
// </S.Modal>