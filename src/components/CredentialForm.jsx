import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FieldsGroup from './FieldsGroup';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

class CredentialForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usrnm: '',
      passwd: '',
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
          <FieldsGroup
            id='usrnm'
            label='Username'
            type='text'
            placeholder='Username'
            value={this.state.usrnm}
            onChange={this.handleChange}
            />
        </Form.Row>
        <Form.Row>
          <FieldsGroup
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

CredentialForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};
export default CredentialForm;
