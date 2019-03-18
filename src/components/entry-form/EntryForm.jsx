
import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box
  , Button
  , DatePicker
  , ErrorBoundary
  , Form
  , GroupOfFields
  , TimePicker } from 'Components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const ClientRequests = require('./../../scripts/ClientRequests.js');
const S = {};

// className='shadow' add back shadows...
S.Card = styled(Card)`
  background-color: #202020;
  border-radius: 7px;
  display: flex;
  flex-flow: nowrap;
  width: ${props => props.width};
`;

S.CardContent = styled(CardContent)`
  font-size: .8rem;
  padding-top: .75rem;
  padding-bottom: .75rem;
`;


S.EntryForm = styled(Box)`
  .container {
    padding: 0px;
    margin: 0px;
  }


`;

S.SubmitButton = styled.div`
  .btn-primary.btn {
    background-color: #6A6A6A;
    border-color: #6A6A6A;
    display: table-cell;
    width: 6em;

    :hover {
      background-color: #D93646;
      border-color: #D93646;
    }

    :focus {
      background-color: #D93646;
    }
  }
`;

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      description: '',
      content: '',
      selectedDate: new Date(),
      selectedTime: new Date()
    };
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleTimeChange = (time) => {
    this.setState((state) => state.selectedTime = time);
  }

  handleDateChange = (date) => {
    this.setState((state) => state.selectedDate = date);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formattedTime = moment(this.state.selectedTime).format('HH:mm').toString();
    let formattedDate = moment(this.state.selectedDate).format('YYYY-MM-DD').toString();
    let releaseDateTime = formattedDate + ' ' + formattedTime;
    let release_date = moment(releaseDateTime, 'YYYY-MM-DD h:mm').format('YYYY-MM-DD HH:mm');
    let newEntry = {
      user_id: this.props.user_id,
      creation_date: moment().format('YYYY-MM-DD HH:mm'),
      release_date: release_date,
      description: this.state.description,
      content: this.state.content
    };
    return ClientRequests.createEntry(newEntry)
      .then(() => this.props.refresh())
      .then(this.setState((state) => state = this.initialState));
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <S.EntryForm>
        <h3 className='component-block-header'>New Entry</h3>
        <S.Card width='26rem'>
          <S.CardContent>
            <Form>
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
              <Box flexWrap='nowrap'>
                <ErrorBoundary>
                  <Fragment>
                    <DatePicker handleDateChange={this.handleDateChange} selectedDate={this.state.selectedDate} />
                    <TimePicker handleTimeChange={this.handleTimeChange} selectedTime={this.state.selectedTime} />
                  </Fragment>
                </ErrorBoundary>
              </Box>
              <ErrorBoundary>
                <Form.Group className='d-flex justify-content-end' as={Box}>
                  <S.SubmitButton>
                    <Button type='submit' className='submit-btn' onClick={this.handleSubmit}>Submit</Button>
                  </S.SubmitButton>
                </Form.Group>
              </ErrorBoundary>
            </Form>
          </S.CardContent>
        </S.Card>
      </S.EntryForm>
    );
  }
}

EntryForm.propTypes = {
  refresh: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired
};

S.Card.propTypes = {
  width: PropTypes.string
};

export default EntryForm;