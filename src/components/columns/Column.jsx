import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, LeftCard } from 'Components';

/*
const CardColumn = (props) => {
  return (
    <Col>
      <Container id={props.id} className='secondary-container'>
        <h3 className='component-block-header'>Unlocked</h3>
        {props.entries.map(entry => (
          <LeftCard key={entry.id} entry={entry} refresh={props.refresh} />
        ))}
      </Container>
    </Col>
  );
};

*/
class CardColumn {
  constructor(props) {
    super(props);
  }

  render() {
    const columnStyle = {
      padding: '0px',
      margin: '0px',
    };
    return (
      <Col style={columnStyle}>
        <Container id={props.id}>
          <h3 className='component-block-header'>Unlocked</h3>
          {props.entries.map(entry => (
            <LeftCard key={entry.id} entry={entry} refresh={props.refresh} />
          ))}
        </Container>
      </Col>
    )
  }
}

CardColumn.propTypes = {
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired
};

export default CardColumn;