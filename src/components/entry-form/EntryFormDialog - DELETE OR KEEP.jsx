import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import moment from 'moment';
import { createEntry, ErrorBoundary } from 'utilities';
import {
  Box,
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

function EntryFormDialog(props) {
  const [textFields, setTextField] = useState({
    description: '',
    content: '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  const dbms = process.env.DBMS || 'mysql';
  const { classes, refresh, userId } = props;

  const handleTextFieldChange = event => (
    setTextField({
      ...textFields,
      [event.target.id]: event.target.value,
    })
  );
  const { content, description } = textFields;

  const handleClickOpen = async () => {
    await setSelectedDate(new Date());
    await setSelectedTime(new Date());
    await setTextField({
      description: '',
      content: '',
    });
    return setOpen(true);
   };

  const handleDateChange = date => setSelectedDate(date);
  const handleTimeChange = time => setSelectedTime(time);

  const handleSubmit = (event) => {
    event.preventDefault();

    const creationDate = moment().format('YYYY-MM-DD HH:mm');

    const formattedTime = moment(selectedTime).utc().format('HH:mm').toString();
    const formattedDate = moment(selectedDate).utc().format('YYYY-MM-DD').toString();

    const releaseDateTime = `${formattedDate} ${formattedTime}`;
    let releaseDate = moment(releaseDateTime, 'YYYY-MM-DD h:mm').format('YYYY-MM-DD HH:mm');

    if (dbms === 'postgres') {
      releaseDate += '+00';
    }

    return createEntry({
      userId,
      creationDate,
      releaseDate,
      description,
      content,
    })
    .then(() => refresh())
    .then(setOpen(false));
  };

  return (
    <>
      <ErrorBoundary>
        <Fab
          onClick={handleClickOpen}
          size='small'
          color='primary'
          aria-label='New Entry'
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </ErrorBoundary>
      <ErrorBoundary>
        <Dialog
          aria-labelledby='form-dialog-title'
          open={open}
          onClose={setOpen(false)}
          width='26rem'
        >
          <DialogTitle id='form-dialog-title'>New Entry</DialogTitle>
          <DialogContent>
            <ErrorBoundary>
              <TextField
                id='description'
                autoComplete='off'
                css='margin: 8;'
                fullWidth
                label='Enter a description.'
                margin='dense'
                placeholder='(555) 555-5555'
                variant='outlined'
                className={classNames(classes.dense, classes.textField)}
                onChange={handleTextFieldChange}
                value={description}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <TextField
                id='content'
                autoComplete='off'
                fullWidth
                label='Enter something to lock away.'
                margin='dense'
                multiline
                placeholder={'Ex-girlfriend\'s phone number'}
                rows='4'
                rowsMax='10'
                variant='outlined'
                className={classNames(classes.dense, classes.textField)}
                onChange={handleTextFieldChange}
                value={content}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <Box flexWrap='nowrap'>
                <>
                  <DatePicker
                    handleDateChange={handleDateChange}
                    selectedDate={selectedDate}
                  />
                  <TimePicker
                    handleTimeChange={handleTimeChange}
                    selectedTime={selectedTime}
                  />
                </>
              </Box>
            </ErrorBoundary>
          </DialogContent>
          <ErrorBoundary>
            <DialogActions>
              <FormButton
                type='button'
                handleSubmit={setOpen(false)}
                color='primary'
              >
                Cancel
              </FormButton>
              <FormButton
                type='submit'
                handleSubmit={handleSubmit}
                color='primary'
              >
                Submit
              </FormButton>
            </DialogActions>
          </ErrorBoundary>
        </Dialog>
      </ErrorBoundary>
    </>
  );
}

EntryFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default withStyles(styles)(EntryFormDialog);
