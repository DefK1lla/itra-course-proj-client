import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsState from '../store/SettingsState';

function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const pages = [{
        title: <FormattedMessage id='nav.home' />,
        path: '/'
    }, {
        title: <FormattedMessage id='nav.signin' />,
        path: '/signin'
    }, {
        title: <FormattedMessage id='nav.signup' />,
        path: '/signup'
    }];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem
                            key={page.path}
                            onClick={handleCloseNavMenu}>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: SettingsState.mode === 'dark' ? '#fff' : '#000'
                                }}
                                to={page.path}
                            >
                                {page.title}
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}>

                {pages.map((page) => (
                    <Link
                        style={{
                            textDecoration: 'none'
                        }}
                        key={page.path}
                        to={page.path}
                    >
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block'
                            }}
                        >
                            {page.title}
                        </Button>
                    </Link>
                ))}
            </Box>
        </Box>
    )
}

export default NavBar;