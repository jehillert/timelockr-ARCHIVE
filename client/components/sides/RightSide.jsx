import React from 'react';
import { Box } from 'components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.RightSide = styled(Box)`
  background-color: black;
  box-shadow: ${props => props.theme.boxShadowToLeft};
  color: #AEAEAA;
  display: flex;
  grid-area: ${props => props.gridArea};
  margin-left: 1rem;
`;

const RightSide = (props) => {
  const { children, gridArea } = props;
  return (
    <S.RightSide gridArea={gridArea}>
      {children}
    </S.RightSide>
  );
};

RightSide.defaultProps = {
  children: null,
};

RightSide.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
};

S.RightSide.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default RightSide;
