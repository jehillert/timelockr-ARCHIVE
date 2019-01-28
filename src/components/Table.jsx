import React from 'react';
import { Table } from 'react-bootstrap';

// moment(scr.creation_date).format("DD/MM/YYYY MM:hh a")
class UserTable extends React.Component {
  render() {
    let tbl;
    if (this.props.secrets.length > 0) {
      tbl = (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Label</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {this.props.secrets.map(scr => (
              <tr className="scr-row" key={scr.id}>
                <td className="scr-data">{scr.label}</td>
                <td className="scr-data">{scr.body}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      tbl = <div></div>
    }
    return (
      tbl
    );
  }
}

export default UserTable;
