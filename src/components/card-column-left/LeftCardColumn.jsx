import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, LeftCard } from 'Components';

const LeftCardColumn = (props) => {
  let column = <div></div>;
  if (props.entries.length > 0) {
    column = (
      <Container id='left-card-column-container' className='secondary-container'>
        <h3 className='component-block-header'>Unlocked</h3>
        {props.entries.map(entry => (
          <LeftCard key={entry.id} entry={entry} refresh={props.refresh} />
        ))}
      </Container>
    );
  }
  return column;
};

LeftCardColumn.propTypes = {
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired
};

export default LeftCardColumn;
