/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { AuthTabs, Box } from 'components';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
});

class AuthModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'TimeLockr',
      open: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { isAuthorized } = this.props;

    if (isAuthorized !== prevProps.isAuthorized) {
      if (isAuthorized < 2) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setTitle = newTitle => (
    this.setState({ title: newTitle })
  )

  render() {
    const { open, title } = this.state;
    const {
      classes,
      handleAddUser,
      handleSignin,
      isAuthorized,
    } = this.props;

    return (
      <Modal
        aria-labelledby='auth-modal-title'
        aria-describedby='auth-modal-description'
        disableBackdropClick
        open={open}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Box ml={3} mt={3} mb={3}>
            <h3>{title}</h3>
          </Box>
          <AuthTabs
            handleSignin={handleSignin}
            handleAddUser={handleAddUser}
            isAuthorized={isAuthorized}
            setTitle={this.setTitle}
          />
        </div>
      </Modal>
    );
  }
}

AuthModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddUser: PropTypes.func.isRequired,
  handleSignin: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AuthModal);
