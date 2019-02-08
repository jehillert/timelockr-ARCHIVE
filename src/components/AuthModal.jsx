import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import CredentialForm from './CredentialForm'
import ModalTabs from './ModalTabs'

// import Styles from './AuthModal.css';

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
    if (this.props.isAuth !== prevProps.isAuth) {
      if (this.props.isAuth === true) {
        this.handleClose();
      } else {
        this.handleShow();
      }
    }
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  // see note [1]
  setTitle = (newTitle) => {
    this.setState((state) => state.title = newTitle);
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalTabs
            handleSigninAttempt={this.props.handleSigninAttempt}
            handleCreateNewUserAttempt={this.props.handleCreateNewUserAttempt}
            isAuth={this.props.isAuth}
            setTitle={this.setTitle}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;

/*
  [1] THESE ARE VALID:

        this.setState((state, props) => ({
          title: newTitle
        }));

        this.setState((state) => state.title = newTitle);

        this.setState((state) => {
          return state.title = newTitle
        });

      THIS IS INVALID BECAUSE NO RETURN STATEMENT:

        this.setState((state) => {
          state.title = newTitle
        });

*/