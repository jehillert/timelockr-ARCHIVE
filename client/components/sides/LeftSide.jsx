import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.LeftSide = styled.div`
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.rightBoxShadow};
  color: ${props => props.theme.textColor2};
  display: flex;
  grid-area: ${props => props.gridArea};
  justify-content: flex-end;
  margin-right: 1.5rem;
  padding-right: 1rem;
  padding-top: 1rem;
`;

const LeftSide = (props) => {
  const { children, gridArea, title } = props;
  return (
    <S.LeftSide pt={2} pr={3} gridArea={gridArea}>
      {title && (
        <h2>{title}</h2>
      )}
      {children}
    </S.LeftSide>
  );
};

LeftSide.defaultProps = {
  children: null,
  title: null
};

LeftSide.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
  title: PropTypes.string,
};

S.LeftSide.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default LeftSide;
