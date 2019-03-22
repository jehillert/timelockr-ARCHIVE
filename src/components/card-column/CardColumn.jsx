import React from 'react';
import { Box, ErrorBoundary } from 'Components';
import PropTypes from 'prop-types';

const CardColumn = (props) => (
  <Box id={props.id} m={3} marginTop={2}>
    <h3 style={{ paddingTop: '2rem' }}>{props.title}</h3>
    <ErrorBoundary>
      {props.entries.map((entry, index) => (
        <Box m={2} key={index} id={entry.id} >
          <props.Card
            entry={entry}
            refresh={props.refresh}
            delay={index * 50}
          />
        </Box>
      ))}
    </ErrorBoundary>
  </Box>
);

CardColumn.propTypes = {
  id: PropTypes.string.isRequired,
  Card: PropTypes.elementType.isRequired,
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default CardColumn;