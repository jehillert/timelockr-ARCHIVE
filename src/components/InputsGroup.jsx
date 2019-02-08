import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
const { Octicon, Octicons } = require('octicons-react')
import PropTypes from 'prop-types';

const InputsGroup = (props) => (
  <InputGroup id={props.id} className="field-group mb-3">
    <Form.Row>
      <Form.Label>{props.label}</Form.Label>
    </Form.Row>
    <Form.Row>
      <Col className='d-flex flex-nowrap'>
        <InputGroup.Prepend>
          <button className='icon-btn' >
            <Octicon icon={Octicons[props.icon]} scale={1.5} />
          </button>
        </InputGroup.Prepend>
      <Form.Control {...props} /></Col>
    </Form.Row>
  </InputGroup>
)

InputsGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default InputsGroup;
// controlId: PropTypes.string,
// controlId={props.controlId}