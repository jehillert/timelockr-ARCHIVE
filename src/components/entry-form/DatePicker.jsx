import React from 'react';
import { InlineDatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.InlineDatePicker = styled(InlineDatePicker)`
  width: 11rem;
  svg {
    fill: #839496;
  }
  label, input {
    color: #839496;
    fill: #839496;
  }
`;

const DatePicker = (props) => (
  <S.InlineDatePicker
    keyboard
    disablePast
    variant='filled'
    label='Release Date'
    value={props.selectedDate}
    onChange={props.handleDateChange}
    format={'MM/DD/YYYY'}
    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
  />
);


DatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired
};

export default DatePicker;
