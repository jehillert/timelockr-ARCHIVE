import React from 'react';
import RowLD from './RowLD';

class Table_LockedData extends React.Component {
  render() {
    let tbl;
    if (this.props.secrets.length > 0) {
      tbl = (
        this.props.secrets.map(scr => (
          <RowLD key={scr.id} secret={scr}/>
        ))
      );
    } else {
      tbl = <div></div>
    }
    return tbl
  }
}

export default Table_LockedData;