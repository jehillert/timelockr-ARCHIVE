import React from 'react';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const ProgressBarDate = (props) => (
  <Col className="d-flex flex-column flex-nowrap progress-bar-dates" xs={2} sm={2} md={2} lg={2} xl={2}>
    <div className="center">{moment(props.date).format('MMM DD, YYYY')}</div>
    <div className="center">{moment(props.date).format('HH:mm A')}</div>
    <div className="center">{props.label}</div>
  </Col>
)

export default ProgressBarDate;