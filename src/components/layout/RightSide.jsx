import React from 'react';
import { Box } from 'layout';
import styled from 'styled-components';

const S = {};

S.RightSide = styled(Box)`
  color: #AEAEAA;
  background-color: black;
  grid-column: 4;
  grid-row: 1 / span 10;

`;

const RightSide = (props) => (
  <S.RightSide>
    {props.children}
  </S.RightSide>
);

export default RightSide;