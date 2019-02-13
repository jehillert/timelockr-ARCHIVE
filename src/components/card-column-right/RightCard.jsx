import React from 'react';
import moment from 'moment';
import { Card
       , Col
       , Container
       , ProgressBar
       , RightCardButtons
       , RightCardDates
       , Row } from 'Components'
import PropTypes from 'prop-types';

/*future change: use circular progress bars instead:
  https://www.npmjs.com/package/react-circular-progressbar
  https://kimmobrunfeldt.github.io/progressbar.js/
  https://bootsnipp.com/snippets/nrDmZ*/
const RightCard = (props) => (
  <Container className='secondary-container right-column-card-container'>
    <Card className="mb-3 shadow" style={{ width: '25rem' }}>
      <Card.Header>
        <Row className='d-flex justify-content-between flex-nowrap'>
          {props.secret.label}
          <RightCardButtons />
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <ProgressBar variant="danger" now={props.secret.fraction * 100} />
          </Col>
        </Row>
        <Row className='d-flex justify-content-between'>
          <RightCardDates label='Created' date={props.secret.creationDate} />
          <RightCardDates label='Today' date={props.secret.todaysDate} />
          <RightCardDates label='Release' date={props.secret.releaseDate} />
        </Row>
      </Card.Body>
    </Card>
  </Container>
)

RightCard.propTypes = {
  key: PropTypes.number,
  secret: PropTypes.object.isRequired
}
export default RightCard;