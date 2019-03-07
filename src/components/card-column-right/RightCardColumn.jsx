import React from 'react';
import PropTypes from 'prop-types';
import { RightCard, Container } from 'Components';

const RightCardColumn = (props) => {
  let tbl = <div></div>;
  if (props.entries.length > 0) {
    tbl = (
      <Container className='secondary-container d-flex align-items-start flex-column'>
        <h3 className='component-block-header'>Locked</h3>
        {props.entries.map(entry => (
          <RightCard key={entry.id} entry={entry} refresh={props.refresh} />
        ))}
      </Container>
    );
  }
  return tbl;
}

RightCardColumn.propTypes = {
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired
}

export default RightCardColumn;
