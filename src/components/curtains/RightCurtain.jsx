import React from 'react';
import { Box } from 'components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.RightCurtain = styled(Box)`
  /* General Properties */
  color: #AEAEAA;
  background-color: black;
  grid-column: 4;
  grid-row: 1 / span 100;
`;

const RightCurtain = (props) => {
  const { children } = props;
  return (
    <S.RightCurtain>
      {children}
    </S.RightCurtain>
  );
};

RightCurtain.defaultProps = {
  children: null,
};

RightCurtain.propTypes = {
  children: PropTypes.node,
};

export default RightCurtain;
