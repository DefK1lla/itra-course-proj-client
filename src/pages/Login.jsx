import React from 'react';
import { Card, CardContent, CardActions, TextField, Button, Container, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function Login() {
    return (

        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 10
            }}
        >
            <Card
                component='form'
                sx={{
                    maxWidth: 600,
                    width: '100%'
                }}>
                <Typography
                    variant='h3'
                    component='h2'
                    textAlign='center'
                >
                    <FormattedMessage id='signin' />
                </Typography>

                <CardContent>
                    <FormattedMessage id='form.username'>
                        {(msg) => (
                            <TextField
                                sx={{
                                    width: '100%',
                                    mb: 5
                                }}
                                id='outlined-uncontrolled'
                                label={msg[0]}
                            />
                        )}
                    </FormattedMessage>

                    <FormattedMessage id='form.password'>
                        {(msg) => (
                            <TextField
                                sx={{
                                    width: '100%'
                                }}
                                id='outlined-uncontrolled'
                                label={msg[0]}
                                type='password'
                            />
                        )}
                    </FormattedMessage>
                </CardContent>

                <CardActions>
                    <Button
                        variant='contained'
                        size='large'
                        type='submit'
                    >
                        <FormattedMessage id='signin' />
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}

export default Login;