import React from 'react';
import Octicon, { x } from 'octicons-react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'Components';

const LeftCard = (props) => (
  <Card id={props.secret.id} className="mb-3 shadow" bg="light" style={{ width: '20rem' }}>
    <Card.Header className='d-flex justify-content-between flex-nowrap'>
      {props.secret.label}
      <Octicon icon={x} className='x' scale={1.5} />
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {props.secret.body}
      </Card.Text>
    </Card.Body>
  </Card>
)

LeftCard.propTypes = {
  key: PropTypes.number,
  secret: PropTypes.object.isRequired
}

export default LeftCard;
