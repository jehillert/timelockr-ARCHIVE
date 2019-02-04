import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const FieldsGroup = (props) => {
  return (
    <Form.Group as={Col} controlId={props.id} className='field-group'>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props} />
    </Form.Group>
  );
}

FieldsGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

InputsGroup.propTypes = {
  controlId: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default FieldsGroup;