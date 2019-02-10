import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Octicon, { x } from 'octicons-react';
import PropTypes from 'prop-types';

const LeftColumnCard = (props) => (
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

LeftColumnCard.propTypes = {
  key: PropTypes.number,
  secret: PropTypes.object.isRequired
}

export default LeftColumnCard;
