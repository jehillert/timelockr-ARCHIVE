import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'layout';
import styled from 'styled-components';

const S = {};

S.Header = styled(Box)`
  color: '#AEAEAA';
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  grid-column: 2 / span 2;
  div:nth-child(1) {
    flex: 1 1 auto;
  }
`;

const Header = (props) => {
  return (
    <S.Header
      as={ `h${props.level}` }
      mx={ props.mx }
      my={ props.my }
    >
      <div title={props.text}>{props.text}</div>
      {props.children}
    </S.Header>
  );
};

Header.defaultProps = {
  level: 'h1',
  mx: 1,
  my: 1
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.string,
  mx: PropTypes.number,
  my: PropTypes.number
};

export default Header;