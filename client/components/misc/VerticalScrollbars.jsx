import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

function VerticalScrollbars(props) {
  const { children } = props;
  const scrollbarsRef = useRef();

  return (
    <Scrollbars
      hideTracksWhenNotNeeded
      ref={scrollbarsRef}
      renderView={p => <div {...p} className='view' />}
      renderTrackVertical={p => <div {...p} className='track-vertical' />}
      {...props}
    >
      {children}
    </Scrollbars>
  );
}

VerticalScrollbars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VerticalScrollbars;
