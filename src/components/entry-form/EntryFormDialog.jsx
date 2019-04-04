import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import moment from 'moment';
import { Box } from 'layout';
import { createEntry } from 'utilities';
import {
  DatePicker,
  FormButton,
  TimePicker,
} from 'components';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  dense: {
    marginTop: 16,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
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
      open: false,
    };
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = (date) => {
    this.setState((state) => { state.selectedDate = date; });
  };

  handleSubmit = (event) => {
    // dates stored in UTC
    event.preventDefault();
    const {
      content,
      description,
      selectedDate,
      selectedTime,
    } = this.state;
    const { refresh } = this.props;
    // console.log(formattedTime);
    const formattedTime = moment(selectedTime).utc().format('HH:mm').toString();
    const formattedDate = moment(selectedDate).utc().format('YYYY-MM-DD').toString();
    const releaseDateTime = `${formattedDate} ${formattedTime}`;
    const releaseDate = moment(releaseDateTime, 'YYYY-MM-DD h:mm').format('YYYY-MM-DD HH:mm');
    const newEntry = {
      userId: this.props.userId,
      creationDate: moment().format('YYYY-MM-DD HH:mm'),
      releaseDate: releaseDate,
      description,
      content,
    };

    return createEntry(newEntry)
      .then(() => refresh())
      .then(this.setState((state) => state = this.initialState));
  }

  handleTimeChange = (time) => {
    this.setState((state) => state.selectedTime = time);
  }

  render() {
    const { classes } = this.props;

    return (
      <Box>
        <Fab onClick={this.handleClickOpen}
          size='medium'
          color='primary'
          aria-label='New Entry'
          className={classes.fab}>
          <AddIcon />
        </Fab>
        <Dialog
          aria-labelledby='form-dialog-title'
          open={this.state.open}
          onClose={this.handleClose}
          width='26rem'
        >
          <DialogTitle id='form-dialog-title'>New Entry</DialogTitle>
          <DialogContent>
            <TextField
              id='description'
              autoComplete='off'
              fullWidth
              label='Enter a description.'
              margin='dense'
              placeholder='(555) 555-5555'
              style={{ margin: 8 }}
              variant='outlined'
              className={classNames(classes.dense, classes.textField)}
              onChange={this.handleChange}
              value={this.state.description}
              />
            <TextField
              id='content'
              autoComplete='off'
              fullWidth
              label='Enter something to lock away.'
              margin='dense'
              multiline
              placeholder={`Ex-girlfriend's phone number`}
              rows='4'
              rowsMax='10'
              variant='outlined'
              className={classNames(classes.dense, classes.textField)}
              onChange={this.handleChange}
              value={this.state.content}
            />
            <Box flexWrap='nowrap'>
                <>
                  <DatePicker
                    handleDateChange={this.handleDateChange}
                    selectedDate={this.state.selectedDate}
                  />
                  <TimePicker
                    handleTimeChange={this.handleTimeChange}
                    selectedTime={this.state.selectedTime}
                  />
                </>
            </Box>
          </DialogContent>
          <DialogActions>
            <FormButton
              type='button'
              handleSubmit={this.handleClose}
              color='primary'
            >
              Cancel
            </FormButton>
            <FormButton
              type='submit'
              handleSubmit={this.handleSubmit}
              color='primary'
            >
              Submit
            </FormButton>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

EntryFormDialog.propTypes = {
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default withStyles(styles)(EntryFormDialog);