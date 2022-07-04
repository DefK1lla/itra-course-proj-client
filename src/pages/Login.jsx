import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import { Card, CardContent, CardActions, TextField, Button, Container, Typography } from '@mui/material';

import SettingsState from '../store/SettingsState';
import UserState from '../store/UserState';
import { login } from '../http/authAPI';
import ErrorAlert from '../components/ErrorAlert';

function Login() {
   const [alert, setAlert] = React.useState(false);
   const [errorText, setErrorText] = React.useState('');

   const intl = useIntl();

   const {
      register,
      setError,
      handleSubmit,
      formState: {
         errors
      }
   } = useForm({
      defaultValues: {
         username: '',
         email: '',
         password: ''
      },
      mode: 'all'
   });

   const onSubmit = (data) => {
      login({ ...data })
         .then(user => UserState.login(user))
         .catch(e => {
            if (e.response.status === 404) {
               setError('password', {
                  type: 'custom',
                  message: intl.formatMessage({ id: 'login-page.error' })
               });

               setError('username', {
                  type: 'custom',
                  message: intl.formatMessage({ id: 'login-page.error' })
               });
            } else if (e.response.status === 403) {
               setAlert(true);
               setErrorText('login-page.user-blocked');
            } else {
               setAlert(true);
               setErrorText('form.something-wrong');
            }
         }
         );
   }

   return (
      <Container
         sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 10
         }}
      >
         <ErrorAlert
            open={alert}
            setOpen={setAlert}
            errorText={errorText}
         />

         <Card
            sx={{
               maxWidth: 500,
               width: '100%'
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
         >

            <Typography
               variant='h3'
               component='h2'
               textAlign='center'
            >
               <FormattedMessage id='signin' />
            </Typography>

            <CardContent>
               <TextField
                  sx={{
                     mb: 5
                  }}
                  fullWidth
                  id='login-username'
                  label={intl.formatMessage({ id: 'form.placeholder.username' })}
                  {...register('username', {
                     required: intl.formatMessage({ id: 'form.username.required' }),
                  })}
                  error={Boolean(errors?.username?.message)}
                  helperText={errors?.username?.message}
               />

               <TextField
                  fullWidth
                  id='login-password'
                  label={intl.formatMessage({ id: 'form.placeholder.password' })}
                  autoComplete='on'
                  type='password'
                  {...register('password', {
                     required: intl.formatMessage({ id: 'form.password.required' }),
                  })}
                  error={Boolean(errors?.password?.message)}
                  helperText={errors?.password?.message}
               />
            </CardContent>

            <CardActions>
               <Button
                  variant='contained'
                  size='large'
                  type='submit'
               >
                  <FormattedMessage id='signin' />
               </Button>

               <Typography
                  sx={{
                     mx: 1
                  }}
                  variant='span'
                  component='span'
                  textAlign='center'
               >
                  <FormattedMessage id='login-page.not-account' />
               </Typography>

               <Link
                  style={{
                     color: SettingsState.theme.palette.primary.main
                  }}
                  to='/signup'
               >
                  <FormattedMessage id='login-page.signup' />
               </Link>
            </CardActions>
         </Card>
      </Container>
   );
};

export default Login;
