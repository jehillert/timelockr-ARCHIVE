import SignInView from './Auth/SignInView';
<SignInView
  validatedUser={this.state.username}
  validatedPassword={this.state.password}
  setAuthorization={this.setAuthorization}>
/>





import React form 'react';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

class SignInView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  /*<> ??? </>*/

  render() {
    return (
      <Button variant='primary' onClick={this.handleShow}>
        Launch demo modal
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

SignInView.PropTypes = {
  validatedUser: PropTypes.string.isRequired,
  validatedPassword: PropTypes.string.isRequired,
  setAuthorization: PropTypes.string.isRequired
}

export default SignInView;
