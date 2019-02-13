import React from 'react';
import { Button
       , Col
       , Form
       , InputGroup } from 'Components';
import PropTypes from 'prop-types';

const { Octicon, Octicons } = require('octicons-react')

const GroupOfInputs = (props) => (
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

GroupOfInputs.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default GroupOfInputs;
// controlId: PropTypes.string,
// controlId={props.controlId}