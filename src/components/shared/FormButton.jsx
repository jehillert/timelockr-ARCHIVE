import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

// display: table-cell;
S.Button = styled(Button)`
  background-color: #6A6A6A;
  border-color: #6A6A6A;
  width: 6em;

  :hover {
    background-color: #D93646;
    border-color: #D93646;
  }

  :focus {
    background-color: #D93646;
  }
`;

const FormButton = (props) => (
  <S.Button onClick={props.handleSubmit}>{props.children}</S.Button>
);

FormButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default FormButton;


//<S.Button className='d-flex align-self-end' type='submit' onClick={props.handleSubmit}>Submit</S.Button>