import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.LeftSide = styled(Box)`
  background-color: black;
  box-shadow: ${props => props.theme.boxShadowToRight};
  color: #AEAEAA;
  display: flex;
  grid-area: ${props => props.gridArea};
  justify-content: flex-end;
  margin-right: 1rem;
`;

const LeftSide = (props) => {
  const { children, gridArea } = props;
  return (
    <S.LeftSide pt={2} pr={3} gridArea={gridArea}>
      {children}
    </S.LeftSide>
  );
};

LeftSide.defaultProps = {
  children: null,
};

LeftSide.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
};

S.LeftSide.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default LeftSide;
