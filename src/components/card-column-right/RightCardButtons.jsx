import React from 'react';
import Octicon, { calendar, x } from 'octicons-react';
import { Button, ButtonGroup, Col } from 'Components';

const RightCardButtons = (props) => (
  <ButtonGroup size="sm" className='progress-row-controls ml-auto'>
    <button className='icon-btn' >
      <Octicon icon={calendar} className='octicon-controls' scale={1.50} />
    </button>
    <button className='icon-btn' >
      <Octicon icon={x} className='octicon-controls' scale={1.50} />
    </button>
  </ButtonGroup>
)

export default RightCardButtons;
