import React from 'react';
import { Box } from 'layout';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.RightSide = styled(Box)`
  color: #AEAEAA;
  background-color: black;
  grid-column: 4;
  grid-row: 1 / span 10;

`;

const RightSide = (props) => {
  const { children } = props;
  return (
    <S.RightSide>
      {children}
    </S.RightSide>
  );
};

RightSide.defaultProps = {
  children: null,
};

RightSide.propTypes = {
  children: PropTypes.node,
};

export default RightSide;
