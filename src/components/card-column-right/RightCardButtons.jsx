import React from 'react';
import Octicon, { calendar, trashcan } from 'octicons-react';
import { Button, ButtonGroup, Col } from 'Components';

const RightCardButtons = (props) => (
  <ButtonGroup size="sm" className='progress-row-controls'>
    <button className='icon-btn' >
      <Octicon icon={calendar} className='octicon-controls calendar' scale={1.75} />
    </button>
    <button className='icon-btn' >
      <Octicon icon={trashcan} className='trashcan' scale={1.75} />
    </button>
  </ButtonGroup>
)

export default RightCardButtons;
