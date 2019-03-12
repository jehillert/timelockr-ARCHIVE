import React from 'react';
import PropTypes from 'prop-types';
import { Col
       , Container } from 'Components';

const CardColumn = (props) => {
  const columnStyle = {
    padding: '0px',
    margin: '0px',
  };

  const titleHeaderStyle = {
    paddingTop: '2rem'
  }

  return (
    <Col style={columnStyle}>
      <Container id={props.id}>
        <h3 style={titleHeaderStyle}>{props.title}</h3>
        {props.entries.map(entry => (
          <props.Card key={entry.id} entry={entry} refresh={props.refresh} />
        ))}
      </Container>
    </Col>
  );
}

CardColumn.propTypes = {
  id: PropTypes.string.isRequired,
  Card: PropTypes.elementType.isRequired,
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired,
  showComponent: PropTypes.bool,
  title: PropTypes.string
};

export default CardColumn;


