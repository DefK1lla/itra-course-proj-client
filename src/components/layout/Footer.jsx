import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    Stack
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
   const links = [
      {
         href: 'https://github.com/defk1lla/',
         icon: <GitHubIcon />
      },
      {
         href: 'https://www.linkedin.com/in/defk1lla/',
         icon: <LinkedInIcon />
      },
      {
         href: 'https://www.facebook.com/defk1lla',
         icon: <FacebookIcon />
      },
      {
         href: 'https://www.instagram.com/defk1lla/',
         icon: <InstagramIcon />
      },
      {
         href: 'https://t.me/defk1lla',
         icon: <TelegramIcon />
      },
   ];

   return (
      <AppBar 
         component='footer'
         position='static'
         sx={{
            mt: 2
         }}
      >
         <Container>
            <Toolbar
               sx={{
                  py: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
               }}
            >
               <Button
                  href='https://github.com/DefK1lla/itra-course-project'
                  target='_blank'
                  sx={{
                     color: 'white'
                  }}
               >
                  Source Code
               </Button>

               <Stack
                  direction='row'
                  spacing={2}
                  flexWrap='wrap'
                  justifyContent='center'
               >
                  {links.map(link => 
                     <Button
                        href={link.href}
                        key={link.href}
                        target='_blank'
                        sx={{
                           color: 'white'
                        }}
                     >
                        {link.icon}
                     </Button>
                  )}
               </Stack>
            </Toolbar>
         </Container>
      </AppBar>
   );
};

export default Footer;