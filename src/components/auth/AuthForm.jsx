import React from 'react';
import { Button
       , Col
       , Form
       , GroupOfFields
       , Row } from 'Components';
import PropTypes from 'prop-types';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usrnm: 'Maurine42',
      passwd: '6bUeeOIkHbXNFGA',
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
      <Form className='credential-form' onSubmit={this.handleSubmit}>
        <Form.Row>
          <GroupOfFields
            id='usrnm'
            label='Username'
            type='text'
            placeholder='Username'
            value={this.state.usrnm}
            onChange={this.handleChange}
            />
        </Form.Row>
        <Form.Row>
          <GroupOfFields
            id='passwd'
            label='Password'
            type='password'
            placeholder='Password'
            value={this.state.passwd}
            onChange={this.handleChange}
          />
        </Form.Row>
        <Form.Group className='d-flex flex-row justify-content-md-end' as={Col}>
          <Button type='submit'>
            {this.state.buttonLabel}
          </Button>
        </Form.Group>
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
