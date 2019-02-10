import React from 'react';
import RightColumnCard from './RightColumnCard';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

class RightCardColumn extends React.Component {
  render() {
    let tbl = <div></div>;
    if (this.props.secrets.length > 0) {
      tbl = (
        <Container className='secondary-container d-flex align-items-start flex-column'>
          <h3 className='component-block-header'>Locked</h3>
          {this.props.secrets.map(secret => (
            <RightColumnCard key={secret.id} capsule={secret}/>
          ))}
        </Container>
      );
    }
    return tbl;
  }
}

RightCardColumn.propTypes = {
  secrets: PropTypes.array.isRequired
}


export default RightCardColumn;
