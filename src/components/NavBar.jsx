import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { observer } from "mobx-react-lite";

import { Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import SettingsState from '../store/SettingsState';
import UserState from '../store/UserState';

const NavBar = observer(() => {
   const [anchorElNav, setAnchorElNav] = React.useState(null);

   const pages = UserState.isAuth ? [{
      title: <FormattedMessage id='nav.home' />,
      path: '/'
   }, {
      title: <FormattedMessage id='nav.profile' />,
      path: '/me'
   }, {
      title: <FormattedMessage id='nav.logout' />,
      path: '/signin',
      onClick: () => UserState.logout()
   }]
      : UserState.isAuth === false ? [{
         title: <FormattedMessage id='nav.home' />,
         path: '/'
      }, {
         title: <FormattedMessage id='nav.signin' />,
         path: '/signin'
      }, {
         title: <FormattedMessage id='nav.signup' />,
         path: '/signup'
      }]
         : [];

   if (UserState.userData?.role === 'ADMIN') {
      pages.unshift({
         title: <FormattedMessage id='nav.admin-panel' />,
         path: '/admin'
      });
   }

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
               aria-label="Menu"
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
                        onClick={page.onClick}
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
            }}
         >

            {pages.map((page) => (
               <Link
                  style={{
                     textDecoration: 'none'
                  }}
                  key={page.path}
                  to={page.path}
                  onClick={page.onClick}
               >
                  <Button
                     sx={{
                        my: 2,
                        color: 'white',
                        display: 'block'
                     }}
                     onClick={handleCloseNavMenu}
                  >
                     {page.title}
                  </Button>
               </Link>
            ))}
         </Box>
      </Box>
   )
});

export default NavBar;
