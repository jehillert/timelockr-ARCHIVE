import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as EmailValidator from 'email-validator';
import { Box, FormButton } from 'components';
import { withStyles } from '@material-ui/core/styles';
import Promise from 'bluebird';

const S = {};
S.Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  padding-bottom: 1.5rem;
`;

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  onRight: {
    alignSelf: 'flex-end',
  },
});

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      showPassword: false,
    };
  }

  handleSubmit = (event) => {
    const { handleSubmit } = this.props;
    const { email, password } = this.state;
    const handleSubmitAsync = Promise.promisify(handleSubmit);

    if (!EmailValidator.validate(email) || password === '') {
      return this.setState({
        emailError: !EmailValidator.validate(email),
        passwordError: !password,
      });
    }

    event.preventDefault();
    return handleSubmitAsync(email, password)
      .then(this.setState({
        email: '',
        emailError: false,
        password: '',
        passwordError: false,
        showPassword: false,
      }));
  }

  handleChange = prop => (event) => {
    const { emailError, passwordError } = this.state;

    if (prop === 'email' && emailError === true) {
      this.setState({ emailError: !EmailValidator.validate(event.target.value) });
    } else if (prop === 'password' && passwordError) {
      this.setState({ passwordError: !event.target.value });
  }

    return this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => (
    this.setState(state => ({ showPassword: !state.showPassword }))
  );

  render() {
    const { classes } = this.props;
    const {
      email,
      emailError,
      password,
      passwordError,
      showPassword,
    } = this.state;

    return (
      <S.Form autoComplete='off'>
        <TextField
          id='outlined-email-input'
          label='Email'
          className={classNames(classes.dense, classes.margin, classes.textField)}
          error={emailError}
          type='email'
          name='email'
          autoComplete='email'
          margin='dense'
          value={email}
          variant='outlined'
          onChange={this.handleChange('email')}
        />
        <TextField
          id='outlined-adornment-password'
          className={classNames(classes.dense, classes.margin, classes.textField)}
          error={passwordError}
          margin='dense'
          variant='outlined'
          type={showPassword ? 'text' : 'password'}
          label='Password'
          value={password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='Toggle password visibility'
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          className={classNames(classes.dense, classes.textField, classes.onRight)}
        >
          <FormButton
            type='submit'
            handleSubmit={this.handleSubmit}
          >
            Submit
          </FormButton>
        </Box>
      </S.Form>
    );
  }
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AuthForm);

// email: 'Rita_Barrows',
// password: 'MgFMcT_XhjQWxcO',
//
// email: 'Llewellyn_Hegmann',
// password: 'ODjCg5Id5qL4yNN',
//
// email: 'Tevin29',
// password: 'hzw0kIhT8yttFU_',
//
// email: 'Erwin_Roob94',
// password: 'pz0H844baOYBKTA',
//
// email: 'Hollie.Leffler',
// password: 'KPnALOGwR0P7_Qz',
//
// email: 'Alaina1',
// password: 'zlanxFN0oogEzVp',
//
// email: 'Arnaldo1',
// password: 'rgrGynFI8rW9bf2',
//
// email: 'Lance_Moore',
// password: 'O94LUj15a7uM3Qe',
//
// email: 'Julian.Orn71',
// password: '5TgMtja6px7EzNn',
//
// email: 'Jaylon_Price1',
// password: 'xszHdFn9IHB4OgG',
//
// email: 'Vernie.Dickens2',
// password: 'hMru5_RlHJdlloj',
//
// email: 'Doris70',
// password: 'MPEO2e34CXb010L',
//
// email: 'Kailee_Flatley',
// password: 'NAdvsapLG7ZGEco',
//
// email: 'Theresia5',
// password: 'umWkGi0q6KUdprF',
//
// email: 'Hettie.Stracke20',
// password: 'TXHqfanfn0g2Jj3',
//
// email: 'Uriah61',
// password: 'ZQ2Njw9inzAYkW3',
//
// email: 'Timmy.Braun',
// password: 'RTjGiAthvJXhbAD',
//
// email: 'Roosevelt.Parker28',
// password: '2Td85JyhuOvMJ2b',
//
// email: 'Rozella_Rau12',
// password: 'NuSPmT05SHtKnOO',
//
// email: 'Chandler82',
// password: 'lPX8MqJaFWe9Ggg',
//
// email: 'Elisa37',
// password: 'v2oLh1uLDdgwQzA',
//
// email: 'Oliver_Kassulke76',
// password: 'neIB8LPYZ3vwl2e',
//
// email: 'Joan.Nolan78',
// password: '74L55sT5ufpGxZ9',
//
// email: 'Karlee_Yost',
// password: 'JieiYho5a4Zh2BU',
