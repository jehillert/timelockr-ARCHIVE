import React from 'react';
import { AuthForm
       , AuthTabs
       , Container
       , Row
       , Modal
       , ModalHeader
       , ModalTitle
       , ModalBody } from 'Components';
import PropTypes from 'prop-types';

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

  // see note [1]
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
          <AuthTabs
            handleSignin={this.props.handleSignin}
            handleCreateNewUserAttempt={this.props.handleCreateNewUserAttempt}
            viewState={this.props.viewState}
            setTitle={this.setTitle}
          />
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