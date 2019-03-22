import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Form from 'react-bootstrap/Form';
import { Box
  , DatePicker
  , ErrorBoundary
  , GroupOfFields
  , FormButton
  , TimePicker } from 'Components';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const ClientRequests = require('./../../scripts/ClientRequests.js');

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class EntryFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      description: '',
      content: '',
      selectedDate: new Date(),
      selectedTime: new Date(),
      open: false
    };
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this)
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = (date) => {
    this.setState((state) => state.selectedDate = date);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formattedTime = moment(this.state.selectedTime).format('HH:mm').toString();
    let formattedDate = moment(this.state.selectedDate).format('YYYY-MM-DD').toString();
    let releaseDateTime = formattedDate + ' ' + formattedTime;
    let release_date = moment(releaseDateTime, 'YYYY-MM-DD h:mm').format('YYYY-MM-DD HH:mm');
    let newEntry = {
      user_id: this.props.user_id,
      creation_date: moment().format('YYYY-MM-DD HH:mm'),
      release_date: release_date,
      description: this.state.description,
      content: this.state.content
    };

    return ClientRequests.createEntry(newEntry)
      .then(() => this.props.refresh())
      .then(this.setState((state) => state = this.initialState));
  }

  handleTimeChange = (time) => {
    this.setState((state) => state.selectedTime = time);
  }

  render() {
    const { classes } = this.props;

    return (
      <Box>
        <ErrorBoundary>
          <Fab onClick={this.handleClickOpen}
            size='medium'
            color='primary'
            aria-label='New Entry'
            className={classes.fab}>
            <AddIcon />
          </Fab>
        </ErrorBoundary>
        <Dialog
          aria-labelledby='form-dialog-title'
          open={this.state.open}
          onClose={this.handleClose}
          width='26rem'
        >
          <DialogTitle id='form-dialog-title'>New Entry</DialogTitle>
          <DialogContent >
            <ErrorBoundary>
              <GroupOfFields
                id='description'
                label='Enter a description.'
                placeholder={`Ex-girlfriend's phone number`}
                value={this.state.description}
                onChange={this.handleChange}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <GroupOfFields
                id='content'
                label='Enter something to lock away.'
                as='textarea'
                placeholder='555-555-5555'
                value={this.state.content}
                onChange={this.handleChange}
                required
              />
            </ErrorBoundary>
            <Box flexWrap='nowrap'>
              <ErrorBoundary>
                <React.Fragment>
                  <DatePicker handleDateChange={this.handleDateChange} selectedDate={this.state.selectedDate} />
                  <TimePicker handleTimeChange={this.handleTimeChange} selectedTime={this.state.selectedTime} />
                </React.Fragment>
              </ErrorBoundary>
            </Box>
          </DialogContent>
          <ErrorBoundary>
            <DialogActions>
              <FormButton type='button' handleSubmit={this.handleClose} color='primary'>
                Cancel
              </FormButton>
              <FormButton type='submit' handleSubmit={this.handleSubmit} color='primary'>
                Submit
              </FormButton>
            </DialogActions>
          </ErrorBoundary>
        </Dialog>
      </Box>
    );
  }
}

EntryFormDialog.propTypes = {
  // classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired
};

export default withStyles(styles)(EntryFormDialog);
