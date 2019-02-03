import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Octicon, { calendar, trashcan } from 'octicons-react';
import Col from 'react-bootstrap/Col';

const RightCardControls = (props) => {
  return (
      <ButtonGroup size="sm" className='progress-row-controls'>
        <button className='icon-btn' >
          <Octicon icon={calendar} className='octicon-controls calendar' scale={1.75} />
        </button>
        <button className='icon-btn' >
          <Octicon icon={trashcan} className='octicon-controls trashcan' scale={1.75} />
        </button>
      </ButtonGroup>
  );
}

export default RightCardControls;

// <span role="button" class="glyphicon glyphicon-trash btn-lg" onclick="yourFunction()"></span>
