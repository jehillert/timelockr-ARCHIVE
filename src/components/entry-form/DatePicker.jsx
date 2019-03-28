import React from 'react';
import { InlineDatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';

const DatePicker = (props) => (
  <InlineDatePicker
    keyboard
    disablePast
    variant='outlined'
    label='Release Date'
    format={'MM/DD/YYYY'}
    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
    value={props.selectedDate}
    onChange={props.handleDateChange}
  />
);


DatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired
};

export default DatePicker;
