import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

function RowLD(props) {
  return (
    <Container>
      <Row>
        <Col>{props.secret.label}</Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button>X</Button>
          <Button>+</Button>
        </Col>
      </Row>
      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4">
          <ProgressBar animated now={props.secret.fractionCompleted * 100} />
        </Col>
      </Row>
      <Row>
        <Col>
          {props.secret.creationDate}
          {props.secret.creationTime}
        </Col>
        <Col xs="4" sm="4" md="4" lg="4" xl="4"></Col>
        <Col>
          {moment(props.secret.todaysDate).format('MMM DD, YYYY')}
          {moment(props.secret.todaysDate).format('h:mm A')}
        </Col>
        <Col xs="4" sm="4" md="4" lg="4" xl="4"></Col>
        <Col>
          {props.secret.releaseDate}
          {props.secret.releaseTime}
        </Col>
      </Row>
    </Container>
  );
}

export default RowLD;

/*
  this.props.locked

  moment().isBefore(Moment|String|Number|Date|Array);
  moment().isBefore(Moment|String|Number|Date|Array, String);
  moment().format("MMM DD, YYYY, [at] H:mm a")
Contents of time capsule will be available at:

xs="4" sm="4" md="4" lg="4" xl="4"
*/