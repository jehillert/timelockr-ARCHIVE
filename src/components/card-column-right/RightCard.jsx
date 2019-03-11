import React from 'react';
import moment from 'moment';
import { Card
       , Col
       , DeleteButton
       , ProgressBar
       , RightCardDates
       , Row } from 'Components'
import PropTypes from 'prop-types';
const req = require('./../../scripts/ClientRequests');

/*future change: use circular progress bars instead:
  https://www.npmjs.com/package/react-circular-progressbar
  https://kimmobrunfeldt.github.io/progressbar.js/
  https://bootsnipp.com/snippets/nrDmZ*/
class RightCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /*consider moving all req.___ to Main.jsx*/
  handleClick = () => (
    req.deleteEntry(this.props.entry.id)
      .then(() => this.props.refresh())
  );

  render() {
    return (
      <Card className="mb-3 shadow" style={{ width: '25rem' }}>
        <Card.Header>
          <Row className='d-flex justify-content-between flex-nowrap'>
            {this.props.entry.label}
            <DeleteButton handleClick={this.handleClick}/>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <ProgressBar variant="danger" now={this.props.entry.fraction * 100} />
            </Col>
          </Row>
          <Row className='d-flex justify-content-between'>
            <RightCardDates label='Created' date={this.props.entry.creationDate} />
            <RightCardDates label='Today' date={this.props.entry.todaysDate} />
            <RightCardDates label='Release' date={this.props.entry.releaseDate} />
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

RightCard.propTypes = {
  entry: PropTypes.object.isRequired,
  // id: PropTypes.string.isRequired
}
export default RightCard;