import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.CardArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  grid-column: 2 / span 2;
`;

const CardArea = (props) => {
  const { children } = props;
  return (
    <S.CardArea>
      {children}
    </S.CardArea>
  );
};

CardArea.defaultProps = {
  children: null,
};

CardArea.propTypes = {
  children: PropTypes.node,
};

export default CardArea;
