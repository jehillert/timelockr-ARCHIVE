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
      email: 'Alivia77',
      password: 'utEs369H0Eb3abK',
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

/*
  Maurine42               6bUeeOIkHbXNFGA
  Adam.OKeefe             yVXI4eEbpYMgFMc
  Earline29               HuLyOXuUAPNuyf3
  Jaquan.Muller88         IDzsXxVshRDvpBG
  Willard.Keebler53       8yttFU_UE2M0RBU
  Vance_Leuschke          YsGUZsmaOcFoZ1_
  Arne_Little             _VP63OJWcmsAI2N
  Ismael50                _Y6_egqJCOxj8hg
  Dario_Bashirian54       sQtDoIAxnwKAujR
  Amaya_Reichel           9CEigbzawo0xTXU
  Buster_Feil             f1HL0Rh0l059ja1
  Crystal33               _RlHJdlloj5bK3f
  Pascale81               kcdMPEO2e34CXb0
  Holly.Lesch56           V8SJA6wv4TMBkIx
  Paris.Terry             QZCeQdMceSD_Fj1
  Laverne34               DiuldAjd77iI7Uk
  Vaughn.Nader            Njw9inzAYkW374b
  Nestor26                3Zrq4IVKreN2etN
  Willie_Rippin           ihisRO5WVPARMD6
  Eudora54                r3WPpU5Ynm3OwGI
  Gladyce_Nolan13         bqqusRch5Ig6CSM
  Ahmed.Beatty81          S_LRibJhh2bh5bX
  Alivia77                utEs369H0Eb3abK
  Christophe.Windler59    SY0qN0RCwVk360s
  Garfield13              m0ck5P_0Nvxej6s
*/
