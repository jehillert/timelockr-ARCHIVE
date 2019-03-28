import React from 'react';
import { InlineTimePicker } from 'material-ui-pickers';
import AccessTime from '@material-ui/icons/AccessTime';
import PropTypes from 'prop-types';

const TimePicker = (props) => (
  <InlineTimePicker
    clearable
    keyboard
    keyboardIcon={<AccessTime />}
    label='Release Time'
    mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
    variant='outlined'
    onChange={props.handleTimeChange}
    value={props.selectedTime}
  />
);

TimePicker.propTypes = {
  selectedTime: PropTypes.object.isRequired,
  handleTimeChange: PropTypes.func.isRequired
};

export default TimePicker;
