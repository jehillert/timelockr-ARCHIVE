import React from 'react';
import { InlineTimePicker } from 'material-ui-pickers';
import AccessTime from '@material-ui/icons/AccessTime';
import PropTypes from 'prop-types';

const TimePicker = (props) => {
  const { selectedTime, handleTimeChange } = props;
  return (
    <InlineTimePicker
      clearable
      keyboard
      ampm
      keyboardIcon={<AccessTime />}
      label='Release Time'
      variant='outlined'
      onChange={handleTimeChange}
      value={selectedTime}
    />
  );
};

TimePicker.propTypes = {
  selectedTime: PropTypes.objectOf(PropTypes.number).isRequired,
  handleTimeChange: PropTypes.func.isRequired,
};

export default TimePicker;

// mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
