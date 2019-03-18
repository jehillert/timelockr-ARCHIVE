import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box
  , Button
       , ErrorBoundary
       , Form
       , GroupOfFields } from 'Components';

const S = {};
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

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usrnm: 'Kennith_Mayer10',
      passwd: 'W4Egy6IZ7E2G3q2',
      buttonLabel: this.props.buttonLabel
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.usrnm, this.state.passwd);
  }

  render() {
    return (
      <Form style={{paddingTop: '40px'}} onSubmit={this.handleSubmit}>
        <Form.Row>
          <ErrorBoundary>
            <GroupOfFields
              id='usrnm'
              label='Username'
              type='text'
              placeholder='Username'
              value={this.state.usrnm}
              onChange={this.handleChange}
            />
          </ErrorBoundary>
        </Form.Row>
        <Form.Row>
          <ErrorBoundary>
            <GroupOfFields
              id='passwd'
              label='Password'
              type='password'
              placeholder='Password'
              value={this.state.passwd}
              onChange={this.handleChange}
            />
          </ErrorBoundary>
        </Form.Row>
        <Form.Row>
          <ErrorBoundary>
            <Form.Group className='d-flex justify-content-end' as={Box}>
              <S.SubmitButton>
                <Button type='submit'>
                  {this.state.buttonLabel}
                </Button>
              </S.SubmitButton>
            </Form.Group>
          </ErrorBoundary>
        </Form.Row>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  viewState: PropTypes.bool.isRequired
};

export default AuthForm;