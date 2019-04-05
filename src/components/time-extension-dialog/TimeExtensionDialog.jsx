/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable no-func-assign */
import React, { useState, useEffect } from 'react';
import { FormButton, IncrementInput } from 'components';
import { extendReleaseDate } from 'utilities';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const S = {};

S.Form = styled.form`
  display: 'flex',
  flexWrap: 'wrap',
`;

function TimeExtensionDialog(props) {
  // set state variables/handlers
  const [duration, setDurationValue] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });
  useEffect(() => console.log(`${duration.months}---------------------------`));

  // declare props
  const {
    entryId,
    open,
    setDialogVisibility,
    refresh,
    releaseDate,
  } = props;

  // get changes in child components
  function getChange(units, value) {
    console.log(`${units}: ${value}`);
    setDurationValue({
      ...duration,
      [units]: value,
    });
  }

  // hide dialog
  function handleClose() {
    setDialogVisibility(false);
  }

  // calculate and submit new release date
  function handleSubmit(event) {
    event.preventDefault();

    const mDuration = moment.duration(duration);
    const newReleaseDate = moment(releaseDate).add(mDuration);

    // .format('YYYY-MM-DD HH:mm');
    console.log(`
      releaseDate:    ${moment(releaseDate).format('YYYY-MM-DD HH:mm')}
      newReleaseDate: ${newReleaseDate.format('YYYY-MM-DD HH:mm')}
    `);

    return extendReleaseDate(entryId, newReleaseDate.format('YYYY-MM-DD HH:mm').toString())
      .then(() => refresh())
      .then(() => handleClose());
  }

  // bind functions
  getChange = getChange.bind(this);
  handleClose = handleClose.bind(this);
  handleSubmit = handleSubmit.bind(this);

  // set up array of child components
  const timeUnits = Object.keys(duration);
  const arrayOfInputs = timeUnits.map(unit => (
    <IncrementInput
      handleChange={getChange}
      key={unit}
      units={unit}
    />
  ));

  return (
    <Dialog
      aria-labelledby='extend-dialog-title'
      open={open}
      onClose={handleClose}
      width='26rem'
    >
      <DialogTitle id='form-dialog-title'>
        Extend Time
      </DialogTitle>
      <DialogContent>
        <S.Form noValidate autoComplete='off'>
          {arrayOfInputs}
        </S.Form>
      </DialogContent>
      <DialogActions>
        <FormButton
          type='button'
          handleSubmit={handleClose}
          color='primary'
        >
          Cancel
        </FormButton>
        <FormButton
          type='submit'
          handleSubmit={handleSubmit}
          color='primary'
        >
          Extend
        </FormButton>
      </DialogActions>
    </Dialog>
  );
}

TimeExtensionDialog.propTypes = {
  entryId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  releaseDate: PropTypes.string.isRequired,
  setDialogVisibility: PropTypes.func.isRequired,
};

export default TimeExtensionDialog;
