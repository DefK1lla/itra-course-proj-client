import { FormattedMessage } from 'react-intl';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

const ErrorAlert = ({ open, setOpen, errorText }) => {
   return (
      <Snackbar
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         open={open}
         autoHideDuration={6000}
         onClose={() => setOpen(false)}
      >
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
   );
};

export default ErrorAlert;
