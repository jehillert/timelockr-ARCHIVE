import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button
       , Card
       , Col
       , Container
       , ErrorBoundary
       , Form
       , GroupOfInputs
       , GroupOfFields } from 'Components';
const req = require('./../../scripts/ClientRequests');

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      description: '',
      content: '',
      releaseDate: '',
      releaseTime: '',
    };
    this.state = this.initialState
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit = (e) => {
    // reformulate release date
    e.preventDefault();
    let releaseDateTime = this.state.releaseDate + ' ' + this.state.releaseTime;
    let release_date = moment(releaseDateTime, "YYYY-MM-DD h:mm").format("YYYY-MM-DD HH:mm");
    let newEntry = {
      user_id: this.props.user_id,
      creation_date: moment().format('YYYY-MM-DD HH:mm'),
      release_date: release_date,
      description: this.state.description,
      content: this.state.content
    }
    return req.createEntry(newEntry)
      .then(() => this.props.refresh())
      .then(this.setState((state) => state = this.initialState))
  }

  render() {
    return (
      <Container className='secondary-container'>
        <h3 className='component-block-header'>New Entry</h3>
        <Card id='entry-form-card' className='shadow'>
          <Card.Body className='d-flex flex-column flex-nowrap'>
            <form id='entry-form'>
              <ErrorBoundary>
                <GroupOfFields
                  id='description'
                  label='Enter a description.'
                  placeholder={`Ex-girlfriend's phone number`}
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <GroupOfFields
                  id='content'
                  label='Enter something to lock away.'
                  as='textarea'
                  placeholder='555-555-5555'
                  value={this.state.content}
                  onChange={this.handleChange}
                  required
                />
              </ErrorBoundary>
              <Col className='d-flex flex-nowrap'>
                <ErrorBoundary>
                  <GroupOfInputs
                    icon='calendar'
                    id='releaseDate'
                    label='Release Date'
                    type='date'
                    value={this.state.releaseDate}
                    onChange={this.handleChange}
                    required
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <GroupOfInputs
                    id='releaseTime'
                    label='Release Time'
                    type='time'
                    icon='clock'
                    value={this.state.releaseTime}
                    onChange={this.handleChange}
                    required
                  />
                </ErrorBoundary>
              </Col>
              <ErrorBoundary>
                <Form.Group className='d-flex justify-content-end' as={Col}>
                  <Button type='submit' className='submit-btn' onClick={this.handleSubmit}>Submit</Button>
                </Form.Group>
              </ErrorBoundary>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

EntryForm.propTypes = {
  refresh: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired
}

export default EntryForm;