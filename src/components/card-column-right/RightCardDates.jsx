import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col } from 'Components';

const RightCardDates = (props) => (
  <Col className="d-flex flex-column flex-nowrap progress-bar-dates" xs={2} sm={2} md={2} lg={2} xl={2}>
    <div className="center">{moment(props.date).format('MMM DD, YYYY')}</div>
    <div className="center">{moment(props.date).format('HH:mm A')}</div>
    <div className="center">{props.label}</div>
  </Col>
)

RightCardDates.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default RightCardDates;