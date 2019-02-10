import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ProgressBarDate from './ProgressBarDate';
import RightCardControls from './RightCardControls';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import PropTypes from 'prop-types';

/*future change: use circular progress bars instead:
  https://www.npmjs.com/package/react-circular-progressbar
  https://kimmobrunfeldt.github.io/progressbar.js/
  https://bootsnipp.com/snippets/nrDmZ*/
const RightColumnCard = (props) => (
  <Container className='secondary-container right-column-card-container'>
    <Card className="mb-3 shadow" style={{ width: '25rem' }}>
      <Card.Header>
        <Row className='d-flex justify-content-between flex-nowrap'>
          {props.secret.label}
          <RightCardControls />
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <ProgressBar variant="danger" now={props.secret.fraction * 100} />
          </Col>
        </Row>
        <Row className='d-flex justify-content-between'>
          <ProgressBarDate label='Created' date={props.secret.creationDate} />
          <ProgressBarDate label='Today' date={props.secret.todaysDate} />
          <ProgressBarDate label='Release' date={props.secret.releaseDate} />
        </Row>
      </Card.Body>
    </Card>
  </Container>
)

RightColumnCard.propTypes = {
  key: PropTypes.number,
  secret: PropTypes.object.isRequired
}
export default RightColumnCard;