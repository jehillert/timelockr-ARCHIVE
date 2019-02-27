import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, LeftCard } from 'Components';

const LeftCardColumn = (props) => {
  let column = <div></div>;
  if (props.secrets.length > 0) {
    column = (
      <Container id='left-card-column-container' className='secondary-container'>
        <h3 className='component-block-header'>Unlocked</h3>
        {props.secrets.map(secret => (
          <LeftCard key={secret.id} capsule={secret} />
        ))}
      </Container>
    );
  }
  return column;
};

LeftCardColumn.propTypes = {
  secrets: PropTypes.array
}

export default LeftCardColumn;
