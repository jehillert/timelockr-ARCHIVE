import React from 'react';
import PropTypes from 'prop-types';
import { ReactCalendar } from 'Components';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true
    };

  }
}

Calendar.propTypes = {
  releaseDate: PropTypes.string.isRequired,
};

export default Calendar;