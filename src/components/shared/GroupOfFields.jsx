import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'Components';

const GroupOfFields = (props) => (
  <Form.Group as={Col} id={props.id} className='field-group'>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control {...props} />
  </Form.Group>
)

GroupOfFields.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default GroupOfFields;
// controlId={props.controlId}
// controlId: PropTypes.string,