import React from 'react';
import RightColumnCard from './RightColumnCard';
import Container from 'react-bootstrap/Container';

class Table_LockedData extends React.Component {
  render() {
    let tbl = <div></div>;
    if (this.props.secrets.length > 0) {
      tbl = (
        <Container className='secondary-container d-flex align-items-start flex-column'>
          <h3 className='component-block-header'>Locked</h3>
          {this.props.secrets.map(scr => (
            <RightColumnCard key={scr.id} capsule={scr}/>
          ))}
        </Container>
      );
    }
    return tbl;
  }
}

export default Table_LockedData;
