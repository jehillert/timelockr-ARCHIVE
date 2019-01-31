import React from 'react';
import Button from 'react-bootstrap/Button'
import Glyphicon from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hi: ''
    };
  }

  render() {
    return (
      <form>
        <Form.Row >
          <Col>
            <Form.Label>New Entry</Form.Label>
          </Col>
        </Form.Row>
        {/* secrets_label */}
        <Form.Row >
          <Form.Group controlId="validationCustom01">
            <Form.Label>Enter Title</Form.Label>
            <Form.Control placeholder="Ex-girlfriend's phone number" />
          </Form.Group>
        </Form.Row>
        {/* secrets_body */}
        <Form.Row >
          <Form.Group controlId="validationCustom02">
            <Form.Label>Enter Information</Form.Label>
            <Form.Control as="textarea" placeholder="555-555-5555" />
          </Form.Group>
        </Form.Row>
        {/* Date & Time --- Labels */}
        <Form.Row>
          <Form.Group as={Col} xs="6" sm="6" md="6" lg="6" xl="6" controlId="validationCustom03">
            <Form.Label>Enter Release Date</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>
          <Form.Group as={Col} xs="6" sm="6" md="6" lg="6" xl="6" controlId="validationCustom04">
            <Form.Label>Enter Release Time</Form.Label>
            <Form.Control type="time" required />
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-md-end">
          <Form.Group as={Col} controlId="validationCustom05">
            <Button type='submit' >Submit</Button>
          </Form.Group>
        </Form.Row>
      </form>
    );
  }
}

export default EntryForm;
