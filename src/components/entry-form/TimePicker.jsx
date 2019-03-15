import React from 'react';
import { InlineTimePicker } from 'material-ui-pickers';
import AccessTime from '@material-ui/icons/AccessTime';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.InlineTimePicker = styled(InlineTimePicker)`
  width: 11rem;
  svg {
    fill: #839496;
  }
  label, input {
    color: #839496;
    fill: #839496;
  }
`;

const TimePicker = (props) => (
  <S.InlineTimePicker
    clearable
    keyboard
    keyboardIcon={<AccessTime />}
    label='Release Time'
    mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
    onChange={props.handleTimeChange}
    value={props.selectedTime}
    variant='filled'
  />
);


TimePicker.propTypes = {
  selectedTime: PropTypes.object.isRequired,
  handleTimeChange: PropTypes.func.isRequired
};

export default TimePicker;
