import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, RightCard } from 'Components';

const RightCardColumn = (props) => {
  return (
    <Col className = 'd-flex justify-content-center'>
      <Container className='secondary-container'>
        <h3 className='component-block-header'>Locked</h3>
        {props.entries.map(entry => (
          <RightCard key={entry.id} entry={entry} refresh={props.refresh} />
        ))}
      </Container>
    </Col>
  );
}

RightCardColumn.propTypes = {
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired
}

export default RightCardColumn;

// <Container id='left-card-column-container' className='secondary-container'>
// <h3 className='component-block-header'>{props.columnTitle}</h3>