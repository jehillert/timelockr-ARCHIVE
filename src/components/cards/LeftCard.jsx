import React from 'react';
// import ClientRequests from './../../scripts/ClientRequests.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card
  , Col
  , DeleteButton
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
    font-size: .85rem;
    padding-top: .75rem;
    padding-bottom: .75rem;
  }
`;

class LeftCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => (
    ClientRequests.deleteEntry(this.props.entry.id)
      .then(() => this.props.refresh())
  );

  render() {
    return (
      <S.Card width={'20rem'}>
        <Card id={this.props.entry.id} className='mb-3 shadow' bg='light' >
          <Card.Header>
            <Row className='d-flex justify-content-between flex-nowrap'>
              <Col >
                {this.props.entry.label}
              </Col>
              <Col xs={1}>
                <DeleteButton marginTop={'-.30rem'} handleClick={this.handleClick} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {this.props.entry.body}
            </Card.Text>
          </Card.Body>
        </Card>
      </S.Card>
    );
  }
}

LeftCard.propTypes = {
  entry: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

S.Card.propTypes = {
  width: PropTypes.string
};

export default LeftCard;