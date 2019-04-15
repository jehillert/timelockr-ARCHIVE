import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Box,
  FormButton,
} from 'components';
import { withStyles } from '@material-ui/core/styles';

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
      email: 'Gladyce_Nolan13',
      password: 'bqqusRch5Ig6CSM',
      showPassword: false,
    };
  }

  handleSubmit = (event) => {
    const { handleSubmit } = this.props;
    const { email, password } = this.state;

    event.preventDefault();

    return handleSubmit(email, password);
  }

  handleChange = prop => event => (
    this.setState({ [prop]: event.target.value })
  );

  handleClickShowPassword = () => (
    this.setState(state => ({ showPassword: !state.showPassword }))
  );

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      showPassword,
    } = this.state;

    return (
      <S.Form autoComplete='off'>
        <TextField
          id='outlined-email-input'
          label='Email'
          className={classNames(classes.dense, classes.margin, classes.textField)}
          type='email'
          name='email'
          autoComplete='email'
          margin='dense'
          value={email}
          variant='outlined'
        />
        <TextField
          id='outlined-adornment-password'
          className={classNames(classes.dense, classes.margin, classes.textField)}
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
