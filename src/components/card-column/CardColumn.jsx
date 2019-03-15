import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col
       , Container } from 'Components';

const S = {};
S.CardColumn = styled.div`
  .container {
    padding: 0px;
    margin: 0px;
  }
`;

const CardColumn = (props) => {
  const titleHeaderStyle = {
    paddingTop: '2rem'
  }

  return (
    <S.CardColumn>
      <Col >
        <Container id={props.id}>
          <h3 style={titleHeaderStyle}>{props.title}</h3>
          {props.entries.map(entry => (
            <props.Card key={entry.id} entry={entry} refresh={props.refresh} />
          ))}
        </Container>
      </Col>
    </S.CardColumn>
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


