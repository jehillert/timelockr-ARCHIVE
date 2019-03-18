import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button
  , Box
  , Form
  , InputGroup } from 'Components';

const S = {};
S.Icon = styled.div`
  .btn-primary.btn {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    padding: 0;
    vertical-align: middle;

    :hover {
      background-color: #D93646;
      border-color: #D93646;
    }
  }
  svg {
    color: #FFFFFF;
    height: 28px;
    width: 28px;
  }
`;

const GroupOfInputs = (props) => (
  <InputGroup id={props.id} className="mb-3">
    <Form.Row>
      <Box><Form.Label>{props.label}</Form.Label></Box>
    </Form.Row>
    <Form.Row>
      <Box className='d-flex flex-nowrap'>
        <InputGroup.Prepend>
          <S.Icon>
            <Button>{props.iconElement}</Button>
          </S.Icon>
        </InputGroup.Prepend>
        <Form.Control {...props} className='align-self-stretch' />
      </Box>
    </Form.Row>
  </InputGroup>
);

GroupOfInputs.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default GroupOfInputs;