import React from 'react';
// import ClientRequests from './../../scripts/ClientRequests.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card
  , Col
  , DeleteButton
  , ProgressBar
  , RightCardDates
  , Row } from 'Components';
const ClientRequests = require('./../../scripts/ClientRequests.js');

const S = {};

S.Card = styled.div`
  .card {
    width: ${props => props.width};
  }
  .card-header {
    font-size: 1rem;
    background-color: #202020;
    padding-top: .75rem;
    padding-bottom: .75rem;
  }
  .card-body {
    font-size: .8rem;
    padding-top: .75rem;
    padding-bottom: .75rem;
  }
`;

S.ProgressBar = styled.div`

`;

/*future change: use circular progress bars instead:
  https://www.npmjs.com/package/react-circular-progressbar
  https://kimmobrunfeldt.github.io/progressbar.js/
  https://bootsnipp.com/snippets/nrDmZ*/
class RightCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => (req.
    ClientRequests.deleteEntry(this.props.entry.id)
    .then(() => this.props.refresh())
  );

  render() {
    return (
      <S.Card>
        <Card className="mb-3 shadow" style={{ width: '23rem' }}>
          <Card.Header>
            <Row className='d-flex justify-content-between flex-nowrap'>
              <Col >{this.props.entry.label}</Col>
              <Col xs={1}><DeleteButton marginTop={'-.3rem'} handleClick={this.handleClick} /></Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <ProgressBar variant="danger" now={this.props.entry.fraction * 100} style={{height: '1.3rem', margin: '.7rem'}} />
              </Col>
            </Row>
            <Row className='d-flex justify-content-between'>
              <RightCardDates label='Created' date={this.props.entry.creationDate} />
              <RightCardDates label='Today' date={this.props.entry.todaysDate} />
              <RightCardDates label='Release' date={this.props.entry.releaseDate} />
            </Row>
          </Card.Body>
        </Card>
      </S.Card>
    );
  }
}

RightCard.propTypes = {
  entry: PropTypes.object.isRequired,
  // id: PropTypes.string.isRequired
};

S.Card.propTypes = {
  width: PropTypes.string
};

export default RightCard;