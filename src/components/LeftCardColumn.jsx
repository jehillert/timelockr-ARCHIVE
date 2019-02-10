import React from 'react';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import LeftColumnCard from './LeftColumnCard';
import PropTypes from 'prop-types';

const LeftCardColumn = (props) => {
  let column = <div></div>;
  if (props.secrets.length > 0) {
    column = (
      <Container id='left-card-column-container' className='secondary-container'>
        <h3 className='component-block-header'>Unlocked</h3>
        {props.secrets.map(secret => (
          <LeftColumnCard key={secret.id} secret={secret} />
        ))}
      </Container>
    );
  }
  return column;
};

LeftCardColumn.propTypes = {
  secrets: PropTypes.object.isRequired
}

export default LeftCardColumn;
