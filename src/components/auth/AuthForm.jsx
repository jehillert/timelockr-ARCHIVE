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
      usrnm: 'Judson_Rogahn',
      passwd: 'eClNx4Tbr2VW1Qr',
      buttonLabel: this.props.buttonLabel
    };

    // Maurine42                6bUeeOIkHbXNFGA
    // Blaze_Kris60             TJAAHbastQLXpaS
    // Haylie33                 NURWXRx_wB4TKRv
    // Coby29                   ny7WLhNgQHd9pE0
    // Anderson_OHara           hjQWxcO_l3RIAka
    // Kaya48                   kJD2LRNAllY48KZ
    // Trisha.Nienow84          pYTeVC6t_CBTdV6
    // Johnathon.Gusikowski33   TZXCVa3eaU5PgXV
    // Emmanuelle.Sporer15      4yNNwRdoNIKXhFM
    // Rodolfo.Heller           _Zz8_0dwxFMMDZT
    // Elmo_Sauer51             rmGrxpAkYaJjyFg
    // Judson_Rogahn            eClNx4Tbr2VW1Qr
    // Lavern.Leffler           d_UNJjcdTtNMzLj
    // Claudie.Mertz            px0hzw0kIhT8ytt
    // Lilliana43               6hmMt8LICxZsmx0
    // Keagan77                 dJ3qANMIoz1vEKl
    // Juwan.Durgan             LOrAjKNgs5gSqYz
    // Nia_Hauck31              utg14V8FRqjPYKh
    // Kayden_Pacocha75         DTR1lv4SyK66Aqo
    // Gina.Wisoky43            OW5CojCJF3_rBKg
    // Alvera.Monahan65         AlqnuYN47wYCw1D
    // Neoma.Lesch43            BFK2C4DEevIoAnx
    // Clement.Towne53          pC_8tBAKKriBHvJ
    // Anthony.Greenholt54      P_VP63OJWcmsAI2
    // Enrique.Block            zeyK7SYaGvctbOT

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
