import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.RightHead = styled(Box)`
  align-items: center;
  background-color: black;
  box-shadow: ${props => props.theme.boxShadowToLeft};
  display: flex;
  grid-area: ${props => props.gridArea};
  justify-content: flex-end;
  margin-left: 1rem;
  padding: 1rem 2rem;
`;

const RightHead = (props) => {
  const { children, gridArea } = props;
  return (
    <S.RightHead pt={2} pr={3} gridArea={gridArea}>
      {children}
    </S.RightHead>
  );
};

RightHead.defaultProps = {
  children: null,
};

RightHead.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
};

S.RightHead.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default RightHead;
