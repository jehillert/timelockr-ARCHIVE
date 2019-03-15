import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import styled from 'styled-components';

// Use marginLeft, marginRight, marginTop, marginBottom
// with positive/negative margins to fine-tune
// position of DeleteButton in upper l/r corner

const S = {};
S.DeleteButton = styled.button`
  WebkitAppearance: none;
  MozAppearance: none;
  appearance: none;
  background: transparent;
  border: 0;
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  outline: none;
  padding: 0;
  textAlign: top;

  svg {
    color: #AEAEAA;
  }

  :hover * {
    color: #D93646;
  }
`;

const DeleteButton = (props) => (
  <S.DeleteButton
    className='d-flex align-self-start ml-auto'
    marginLeft={props.marginLeft}
    marginRight={props.marginRight}
    marginTop={props.marginTop}
    marginBottom={props.marginBottom}
    onClick={props.handleClick}>
    <Close />
  </S.DeleteButton>
);

DeleteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string
};

S.DeleteButton.propTypes = {
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string
};

export default DeleteButton;