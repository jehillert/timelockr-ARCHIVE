import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.LeftHead = styled(Box)`
  align-items: center;
  background-color: black;
  box-shadow: ${props => props.theme.boxShadowToRight};
  color: #AEAEAA;
  display: flex;
  grid-area: ${props => props.gridArea};
  justify-content: flex-end;
  margin-right: 1rem;
  padding: 1rem 2rem;
`;

const LeftHead = (props) => {
  const { children, gridArea } = props;
  return (
    <S.LeftHead pt={2} pr={3} gridArea={gridArea}>
      {children}
    </S.LeftHead>
  );
};

LeftHead.defaultProps = {
  children: null,
};

LeftHead.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
};

S.LeftHead.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default LeftHead;
