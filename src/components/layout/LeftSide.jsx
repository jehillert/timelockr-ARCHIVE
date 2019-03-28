import React from 'react';
import { Box } from 'layout';
import styled from 'styled-components';

const S = {};

S.LeftSide = styled(Box)`
  display: flex;
  color: #AEAEAA;
  background-color: black;
  grid-column: 1;
  grid-row: 1 / span 10;
  justify-content: flex-end;
`;

const LeftSide = (props) => (
  <S.LeftSide pt={2} pr={3}>
    {props.children}
  </S.LeftSide>
);

export default LeftSide;
