import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { observer } from "mobx-react-lite";

import { Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import UserState from '../store/UserState';

const NavBar = observer(() => {
   const [anchorElNav, setAnchorElNav] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const pages = UserState.isAuth ? [{
      title: <FormattedMessage id='nav.profile' />,
      path: `/user/${UserState.userData._id}`,
      onClick: handleCloseNavMenu
   }, {
      title: <FormattedMessage id='nav.add-collection' />,
      path: '/add-collection',
      onClick: handleCloseNavMenu
   }, {
      title: <FormattedMessage id='nav.add-item' />,
      path: '/add-item',
      onClick: handleCloseNavMenu
   }, {
      title: <FormattedMessage id='nav.logout' />,
      path: '/signin',
      onClick: () => { 
         UserState.logout();
         handleCloseNavMenu();
      }
   }]
      : UserState.isAuth === false ? [{
         title: <FormattedMessage id='nav.home' />,
         path: '/',
         onClick: handleCloseNavMenu
      }, {
         title: <FormattedMessage id='nav.signin' />,
         path: '/signin',
         onClick: handleCloseNavMenu
      }, {
         title: <FormattedMessage id='nav.signup' />,
         path: '/signup',
         onClick: handleCloseNavMenu
      }]
         : [];

   if (UserState.userData?.role === 'ADMIN') {
      pages.unshift({
         title: <FormattedMessage id='nav.admin-panel' />,
         path: '/admin'
      });
   }


   return (
      <Box>
         <Box sx={{ 
            flexGrow: 1, 
            display: { 
               xs: 'flex', 
               lg: 'none' 
            } 
         }}
         >
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
                  display: { 
                     xs: 'block', 
                     lg: 'none' 
                  },
               }}
            >
               <MenuItem
                  component={Link}
                  to='/'
                  onClick={handleCloseNavMenu}
               >
                  <FormattedMessage id='nav.home' />
               </MenuItem>

               {pages.map((page) => (
                  <MenuItem
                     key={page.path}
                     component={Link}
                     to={page.path}
                     onClick={page.onClick}
                  >
                     {page.title}
                  </MenuItem>
               ))}
            </Menu>
         </Box>

         <Box
            sx={{
               flexGrow: 1,
               display: {
                  xs: 'none',
                  lg: 'flex'
               }
            }}
         >
            {pages.map((page) => (
               <Button
                  sx={{
                     my: 2,
                     color: 'white',
                     display: 'block'
                  }}
                  key={page.path}
                  component={Link}
                  to={page.path}
                  onClick={page.onClick}
               >
                  {page.title}
               </Button>
            ))}
         </Box>
      </Box>
   )
});

export default NavBar;
