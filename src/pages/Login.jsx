import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import { Snackbar, Alert, AlertTitle, Card, CardContent, CardActions, TextField, Button, Container, Typography } from '@mui/material';

import SettingsState from '../store/SettingsState';
import UserState from '../store/UserState';
import { login } from '../http/userAPI';

function Login() {
    const [open, setOpen] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    const intl = useIntl();

    const { register, setError, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
        mode: 'onBlur'
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
                    setOpen(true);
                    setErrorText('login-page.user-blocked');
                } else {
                    setOpen(true);
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
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}>
                <Alert
                    sx={{ width: '100%' }}
                    severity='error'
                    variant='filled'
                    onClose={() => setOpen(false)}
                >
                    <AlertTitle>
                        <FormattedMessage id='error' />
                    </AlertTitle>
                    <FormattedMessage id={errorText} />
                </Alert>
            </Snackbar>

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

                <CardActions
                >
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
}

export default Login;