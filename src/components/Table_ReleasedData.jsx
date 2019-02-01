import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// moment(scr.creation_date).format('DD/MM/YYYY MM:hh a')
class Table_ReleasedData extends React.Component {
  render() {
    let tbl;
    if (this.props.secrets.length > 0) {
      tbl = (
        <Table hover bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Contents</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.secrets.map(scr => (
              <tr key={scr.id}>
                <td>{scr.id}</td>
                <td>{scr.label}</td>
                <td>{scr.body}</td>
                <td>
                  <Button variant="dark">X</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      tbl = <div />;
    }
    return tbl;
  }
}

export default Table_ReleasedData;
