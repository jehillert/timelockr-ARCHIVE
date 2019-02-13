import React from 'react';
import moment from 'moment';
import { Button
       , Card
       , Col
       , Container
       , Form
       , GroupOfInputs
       , GroupOfFields } from 'Components';

const req = require('./../../scripts/ClientRequests');

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secret_label: '',
      secret_body: '',
      creation_date: null,
      release_date: null,
      releaseDate: '',
      releaseTime: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = () => {

  }

  render() {
    return (
      <Container className='secondary-container'>
        <h3 className='component-block-header'>New Entry</h3>
        <Card id='entry-form-card' className='shadow'>
          <Card.Body className='d-flex flex-column flex-nowrap'>
            <form id='entry-form'>
              <GroupOfFields
                id='secret_label'
                label='Enter a description.'
                placeholder={`Ex-girlfriend's phone number`}
                value={this.state.secret_label}
                onChange={this.handleChange}
              />
              <GroupOfFields
                id='secret_body'
                label='Enter something to lock away.'
                as='textarea'
                placeholder='555-555-5555'
                value={this.state.secret_body}
                onChange={this.handleChange}
                required
              />
              <Col className='d-flex flex-nowrap'>
                <GroupOfInputs
                  icon='calendar'
                  id='releaseDate'
                  label='Release Date'
                  type='date'
                  value={this.state.releaseDate}
                  onChange={this.handleChange}
                  required
                />
                <GroupOfInputs
                  id='releaseTime'
                  label='Release Time'
                  type='time'
                  icon='clock'
                  value={this.state.releaseTime}
                  onChange={this.handleChange}
                  required
                />
              </Col>
              <Form.Group className='d-flex flex-row justify-content-md-end' as={Col}>
                <Button type='submit'>Submit</Button>
              </Form.Group>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default EntryForm;