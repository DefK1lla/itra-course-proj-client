import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import { Snackbar, Alert, AlertTitle, Card, CardContent, CardActions, TextField, Button, Container, Typography } from '@mui/material';

import SettingsState from '../store/SettingsState';
import UserState from '../store/UserState';
import { registration } from '../http/userAPI';

const Registration = () => {
    const [open, setOpen] = React.useState(false);

    const intl = useIntl();

    const { register, setError, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
        mode: 'all'
    });

    const onSubmit = (data) => {
        registration({ ...data })
            .then(user => UserState.login(user))
            .catch(e => e.response.status === 400 ?
                setError(e.response.data.error.field, {
                    type: 'custom',
                    message: intl.formatMessage({ id: `form.${e.response.data.error.field}.exists` })
                }, {
                    shouldFocus: true
                })
                : setOpen(true)
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
            <Card
                sx={{
                    maxWidth: 500,
                    width: '100%'
                }}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
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
                        <FormattedMessage id='form.something-wrong' />
                    </Alert>
                </Snackbar>

                <Typography
                    variant='h3'
                    component='h2'
                    textAlign='center'
                >
                    <FormattedMessage id='signup' />
                </Typography>

                <CardContent>
                    <TextField
                        sx={{
                            width: '100%',
                            mb: 5
                        }}
                        id='registration-username'
                        label={intl.formatMessage({ id: 'form.placeholder.username' })}
                        {...register('username', {
                            required: intl.formatMessage({ id: 'form.username.required' }),
                            minLength: {
                                value: 3,
                                message: intl.formatMessage({ id: 'form.username.min-length' })
                            },
                            maxLength: {
                                value: 13,
                                message: intl.formatMessage({ id: 'form.username.max-length' })
                            }
                        })}
                        error={Boolean(errors?.username?.message)}
                        helperText={errors?.username?.message}
                    />

                    <TextField
                        sx={{
                            mb: 5
                        }}
                        fullWidth
                        id='registration-email'
                        label={intl.formatMessage({ id: 'form.placeholder.email' })}
                        type='email'
                        {...register('email', {
                            required: intl.formatMessage({ id: 'form.email.required' }),
                        })}
                        error={Boolean(errors?.email?.message)}
                        helperText={errors?.email?.message}
                    />

                    <TextField
                        fullWidth
                        id='registration-password'
                        label={intl.formatMessage({ id: 'form.placeholder.password' })}
                        autoComplete='off'
                        type='password'
                        {...register('password', {
                            required: intl.formatMessage({ id: 'form.password.required' }),
                            minLength: {
                                value: 3,
                                message: intl.formatMessage({ id: 'form.password.min-length' })
                            },
                            maxLength: {
                                value: 13,
                                message: intl.formatMessage({ id: 'form.password.max-length' })
                            }
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
                        <FormattedMessage id='signup' />
                    </Button>

                    <Typography
                        sx={{
                            mx: 1
                        }}
                        variant='span'
                        component='span'
                        textAlign='center'
                    >
                        <FormattedMessage id='registration-page.not-account' />
                    </Typography>

                    <Link
                        style={{
                            color: SettingsState.theme.palette.primary.main
                        }}
                        to='/signin'
                    >
                        <FormattedMessage id='registration-page.signin' />
                    </Link>
                </CardActions>
            </Card>
        </Container >
    );
}

export default Registration;