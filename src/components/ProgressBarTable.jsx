import React from 'react';
import { Button, ProgressBar, Glyphicon } from 'react-bootstrap';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import { PBTableRow } from './ProgressBarTable';
import moment from 'moment';

const ProgressBarTable = (props) => {
  let tbl;
  if (this.props.secrets.length > 0) {
    tbl = this.props.secrets.map((scr, key) => {
      <PBTableRow key={key} secret={scr}/>;
    });
  } else {
    tbl = <div></div>;
  }
  return (
    tbl
  );
};

export default ProgressBarTable;


