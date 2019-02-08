import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const FieldsGroup = (props) => (
  <Form.Group as={Col} id={props.id} className='field-group'>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control {...props} />
  </Form.Group>
)

FieldsGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default FieldsGroup;
// controlId={props.controlId}
// controlId: PropTypes.string,