import React from 'React';
import {ProgressBar, Well, Table} from 'react-bootstrap';
import moment from 'moment';
/*
  this.props.locked

  moment().isBefore(Moment|String|Number|Date|Array);
  moment().isBefore(Moment|String|Number|Date|Array, String);
  moment().format("MMM DD, YYYY, [at] H:mm a")

  [ { id: '0047',
      label: 'deleniti totam',
      creationDate: 'Nov 01, 2018, at 22:15 pm',
      releaseDate: 'May 30, 2019, at 16:07 pm' },
    { id: '0048',
      label: 'autem omnis',
      creationDate: 'Nov 13, 2018, at 4:05 am',
      releaseDate: 'Aug 28, 2019, at 3:15 am' },
    { id: '0049',
      label: 'voluptatum quia',
      creationDate: 'Jan 26, 2018, at 17:17 pm',
      releaseDate: 'Mar 22, 2019, at 10:23 am' } ]

  scr.label
  scr.todaysDate
  scr.creationDate
  scr.releaseDate
  <Well>{}</Well>;

*/

class ProgressBarTable extends React.Component {
  render() {
    let tbl;
    if (this.props.secrets.length > 0) {
      tbl = (
        {this.props.secrets.map(scr => (
          <h3>{scr.label}</h3>
          <div></div>
        ))}
      );
    } else {
      tbl = <div></div>
    }
    return (
      tbl
    );
  }
}

export default ProgressBarTable;
