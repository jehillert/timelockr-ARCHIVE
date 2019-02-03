import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FieldGroup from './FieldGroup';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      secret_label: '',
      secret_body: '',
      creation_date: null,
      release_date: null,
      releaseDate: '',
      releaseTime: '',
    };
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  render() {
    return (
      <Container className='secondary-container'>
        <h3 className='component-block-header'>New Entry</h3>
        <Card id='entry-form-card' className='shadow'>
          <Card.Body className='d-flex flex-column flex-nowrap'>
            <form id='entry-form'>
              <FieldGroup
                id='secret_label'
                label='Enter a description.'
                placeholder={`Ex-girlfriend's phone number`}
                value={this.state.secret_label}
                onChange={this.handleChange}
              />
              <FieldGroup
                id='secret_body'
                label='Enter something to lock away.'
                as='textarea'
                placeholder='555-555-5555'
                value={this.state.secret_body}
                onChange={this.handleChange}
                required
              />
              <Form.Row>
                <FieldGroup
                  id='releaseDate'
                  label='Unlock Date'
                  type='date'
                  value={this.state.releaseDate}
                  onChange={this.handleChange}
                  required
                />
                <FieldGroup
                  id='releaseTime'
                  label='Unlock Time'
                  type='time'
                  value={this.state.releaseTime}
                  onChange={this.handleChange}
                  required
                />
              </Form.Row>
              <Form.Group className='d-flex flex-row justify-content-md-end' as={Col} controlId='entrySubmit'>
                <Button type='submit' onSubmit={this.handleSubmit}>Submit</Button>
              </Form.Group>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default EntryForm;
