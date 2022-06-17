import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import SearchForm from '../SearchForm';
import NavBar from '../NavBar';
import Settings from '../Settings';

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Link
                            to={'/'}
                            style={{
                                textDecoration: 'none',
                                color: 'white'
                            }}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', md: 'block' } }}
                            >
                                MERN
                            </Typography>
                        </Link>

                        <SearchForm />

                        <NavBar />

                        <Settings />
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Header;