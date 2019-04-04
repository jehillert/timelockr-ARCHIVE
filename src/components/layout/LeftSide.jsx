import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'layout';

const S = {};

S.LeftSide = styled(Box)`
  display: flex;
  color: #AEAEAA;
  background-color: black;
  grid-column: 1;
  grid-row: 1 / span 10;
  justify-content: flex-end;
`;

const LeftSide = (props) => {
  const { children } = props;
  return (
    <S.LeftSide pt={2} pr={3}>
      {children}
    </S.LeftSide>
  );
};

LeftSide.defaultProps = {
  children: null,
};

LeftSide.propTypes = {
  children: PropTypes.node,
};

export default LeftSide;
