/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { LoginProps } from './types';
import { FormInputField } from '../../ui-kit/Input/FormInputFIeld';
import { Loader } from '../Loader';

export const Login: React.FC<LoginProps> = ({ onLogin, isError, setIsError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoader, setisLoader] = useState(false);

  useEffect(() => {
    if (username.length > 1 && password.length > 5) setButtonDisabled(false);
  }, [username, password]);

  useEffect(() => {
    isError && setisLoader(false);
  }, [isError]);

  const onSubmit = (evt: React.FormEvent) => {
    setisLoader(true);
    evt.preventDefault();
    onLogin({ username, password });
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIsError(null);
    evt.target.name === 'username' && setUsername(evt.target.value);
    evt.target.name === 'password' && setPassword(evt.target.value);
  };

  return (
    <Box component='form' onSubmit={onSubmit} css={styles.box} noValidate>
      <Paper elevation={3} css={styles.paper}>
        <Typography variant='h4' align='center'>
          Please login
        </Typography>
        <Grid container css={styles.gridContainer}>
          <Grid item xs={12}>
            <FormInputField
              name='username'
              label='Username'
              value={username}
              onChange={changeHandler}
              required
              inputProps={{ minLength: 2 }}
              data-testid='username-input'
              error={!!isError}
              helperText={!!isError && isError}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInputField
              name='password'
              label='Password'
              type={'password'}
              value={password}
              onChange={changeHandler}
              required
              inputProps={{ minLength: 5 }}
              data-testid='password-input'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              size='large'
              variant='contained'
              type='submit'
              disableElevation
              disabled={buttonDisabled}
              data-testid='submit-button'
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {isLoader && <Loader />}
    </Box>
  );
};
