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
      usrnm: 'Irwin82',
      passwd: 'HMskh72U_VjIbC4',
      buttonLabel: this.props.buttonLabel
    };

    // Maurine42                           6bUeeOIkHbXNFGA
    // Leda.Grady                          AAHbastQLXpaSq1
    // Emerald.Ruecker18                   3OW5Ru0xeNYUQ0i
    // Jovani_Mayert                       x_wB4TKRvV9dVRm
    // Timmy.Fisher                        LhNgQHd9pE0mknb
    // Newell68                            r4owxOcFIsVJO4P
    // Terence_Paucek9                     MPOn7K7mvGDAnTS
    // Elisabeth_Jacobs                    GCiC0SN0UYJFpuN
    // Sid.Walter9                         dGtDTrMxaQvRZXn
    // Irwin82                             HMskh72U_VjIbC4
    // Estefania_Kohler61                  mD0j4M0xCsQOxna
    // Gaetano_Wehner28                    xVshRDvpBGO_Zz8
    // Adonis15                            dwxFMMDZTorN87G
    // Eunice_Satterfield                  JjyFgNVG7io5Kwk
    // Freida_Kemmer59                     jrqc5mmfLZqedRg
    // Toney_Cartwright39                  U_UE2M0RBUbLbIV
    // Richmond90                          EKlS4JLOrAjKNgs
    // Anthony.Koch                        bT8hAxVutg14V8F
    // Kayden_Pacocha75                    DTR1lv4SyK66Aqo
    // Emmalee.Kemmer38                    iJOW5CojCJF3_rB
    // Gayle_Rolfson                       YeGRUtgGvrDIf_Z
    // Aglae49                             L2hSsIJBFK2C4DE
    // Adrienne52                          7mGloQYNJE4dDMU
    // Raleigh_Stokes                      fFOKOsBlqKoFEk3
    // Antonette54                         csho8B8gPF425EF

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
        <Form.Row>
          <Form.Group className='d-flex justify-content-end' as={Col}>
            <Button type='submit' className='submit-btn'>
              {this.state.buttonLabel}
            </Button>
          </Form.Group>
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
