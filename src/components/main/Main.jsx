/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ActionBar,
  Box,
  CardArea,
  LeftCurtain,
  RightCurtain,
} from 'components';

// function Main({ props) {
const Main = (props) => {
  const { entries, refresh } = props;
  return (
    <Box className='primary-grid curtain'>
      <LeftCurtain>
        <h1>TimeLockr</h1>
      </LeftCurtain>
      <CardArea
        entries={entries}
        refresh={refresh}
      />
      <RightCurtain>
          <ActionBar
            {...props}
          />
      </RightCurtain>
    </Box>
  );
};

Main.defaultProps = {
  entries: {},
};

Main.propTypes = {
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }),
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default Main;
