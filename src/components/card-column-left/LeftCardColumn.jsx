import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, LeftCard } from 'Components';

const LeftCardColumn = (props) => {
  return (
    <Col>
      <Container id='left-card-column-container' className='secondary-container'>
        <h3 className='component-block-header'>Unlocked</h3>
        {props.entries.map(entry => (
          <LeftCard key={entry.id} entry={entry} refresh={props.refresh} />
        ))}
      </Container>
    </Col>
  );
};

LeftCardColumn.propTypes = {
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired
};

export default LeftCardColumn;
