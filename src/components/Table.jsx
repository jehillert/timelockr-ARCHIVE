import React from 'react';
import moment from 'moment';

// class Table extends React.Component {
const Table = (props) => {
  return (
    <div className="scr-list">
      <div className="scr-header scr-row">
        <div className="scr-data">Id</div>
        <div className="scr-data">Label</div>
        <div className="scr-data">Content</div>
        <div className="scr-data">Date Created</div>
        <div className="scr-data">Release Date</div>
      </div>
      <div>{props.secrets}</div>
    </div>
  );
}

export default Table;