import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const FieldGroup = (props) => {
  return (
    <Form.Group as={Col} id={props.id}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props} />
    </Form.Group>
  );
}

EntryForm.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
}

export default FieldGroup;