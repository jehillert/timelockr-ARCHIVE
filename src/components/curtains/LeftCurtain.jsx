import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.LeftCurtain = styled(Box)`
  /* General Properties */
  display: flex;
  color: #AEAEAA;
  background-color: black;
  grid-column: 1;
  grid-row: 1 / span 100;
  justify-content: flex-end;
`;

const LeftCurtain = (props) => {
  const { children } = props;
  return (
    <S.LeftCurtain pt={2} pr={3}>
      {children}
    </S.LeftCurtain>
  );
};

LeftCurtain.defaultProps = {
  children: null,
};

LeftCurtain.propTypes = {
  children: PropTypes.node,
};

export default LeftCurtain;
