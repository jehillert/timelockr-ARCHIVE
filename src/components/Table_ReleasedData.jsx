import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Styles from './styles.css';
// import './Table.css'

// moment(scr.creation_date).format('DD/MM/YYYY MM:hh a')
class Table_ReleasedData extends React.Component {
  render() {
    let tbl;
    if (this.props.secrets.length > 0) {
      tbl = (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='tbl-hdr'>ID</th>
              <th className='tbl-hdr'>Description</th>
              <th className='tbl-hdr'>Contents</th>
              <th className='tbl-hdr'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.secrets.map(scr => (
              <tr className='tbl-row' key={scr.id}>
                <td className='tbl-cell'>{scr.id}</td>
                <td className='tbl-cell'>{scr.label}</td>
                <td className='tbl-cell'>{scr.body}</td>
                <td className='tbl-btn-cell'>
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
