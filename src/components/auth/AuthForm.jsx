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
      usrnm: 'Kennith_Mayer10',
      passwd: 'W4Egy6IZ7E2G3q2',
      buttonLabel: this.props.buttonLabel
    };

    // Maurine42               6bUeeOIkHbXNFGA
    // Meagan.Luettgen35       iYbtFi7CAsQU7uL
    // Theodora.Schoen65       ULyVXI4eEbpYMgF
    // Evans.Hahn79            Y48KZdGv3Xdaszw
    // Fern.Williamson67       scBLyzpqpYTeVC6
    // Nico.Howell             8zMwBuN4HHtjogd
    // Nia.Bauch               MzlmD0j4M0xCsQO
    // Felicity_Jast           Zz8_0dwxFMMDZTo
    // Sadye_Denesik           1QrhFnv0CSCEm84
    // Aletha.Davis16          RBUbLbIVB_C305z
    // Elna.Blick              MIoz1vEKlS4JLOr
    // Shane20                 V8FRqjPYKhATavz
    // Shaylee_Wuckert24       7e5zLKFgn7ksETS
    // Sidney_Runolfsdottir    pC_8tBAKKriBHvJ
    // Lue.Heller84            KoFEk3LF1WIzeyK
    // Chelsey.Emmerich        OxdQMEVkkJxJ9qW
    // Leopoldo82              ogEzVp4IbsMjSr3
    // Rosario_Kertzmann0      COxj8hgpg_r7EUO
    // Delfina.Hilll75         oRr25YvHdmSNHHM
    // Sabina.Roberts93        nFI8rW9bf25zg62
    // Elissa11                CzF8lmuqbSiue2f
    // Ruth.Kilback            5ZLc_7m9dXYsbsz
    // Kennith_Mayer10         W4Egy6IZ7E2G3q2
    // Reese.Keeling           G_6or8p9flibSfL
    // Soledad.Adams           Vo6RvoFmnjqtmO1

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
