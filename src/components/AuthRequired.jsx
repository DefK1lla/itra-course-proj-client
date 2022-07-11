import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useLocation } from 'react-router-dom';

import { Stack, ButtonGroup, Typography, Button } from '@mui/material';

const AuthRequired = () => {
   const location = useLocation();
   const backPath = location.pathname;

   return (
      <Stack
         spacing={3}
         alignItems='center'
      >
         <Typography
            variant='h5'
            component='h5'
            textAlign='center'
         >
            <FormattedMessage id='item-page.auth-required' />
         </Typography>
         <ButtonGroup 
            variant='text'
            size='large'
            aria-label='sign in or sign up'
         >
            <Button
               component={Link}
               to='/signin'
               state={{
                  backPath
               }}
            >
               <FormattedMessage id='nav.signin' />
            </Button>

            <Button
               component={Link}
               to='/signup'
               state={{
                  backPath
               }}
            >
               <FormattedMessage id='nav.signup' />
            </Button>
         </ButtonGroup>
      </Stack>
   );
};

export default AuthRequired;