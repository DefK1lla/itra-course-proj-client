import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Stack, Button, TextField } from '@mui/material';

import UserState from '../store/UserState';

import AuthRequired from './AuthRequired';

const CommentForm = ({ onSubmit }) => {
   const intl = useIntl();

   const {
      register,
      handleSubmit,
      reset,
      formState: {
         errors
      }
   } = useForm({
      defaultValues: {
         text: ''
      },
      mode: 'onSubmit'
   });


   return(
      <>
         {UserState.isAuth
            ?     <Stack
                  component='form'
                  spacing={1}
                  alignItems='start'
                  onSubmit={handleSubmit(onSubmit(reset))}
               >
                  <TextField
                     fullWidth
                     label={intl.formatMessage({ id: 'item-page.comment-form.placeholder' })}
                     multiline
                     rows={4}
                     { ...register('text', { required: true }) }
                     error={Boolean(errors?.text)}
                  />

                  <Button
                     variant='contained'
                     type='submit'
                  >
                     <FormattedMessage id='item-page.comment-form.submit-button' />
                  </Button>
               </Stack>
            : <AuthRequired />
         }
      </>
   );
};

export default CommentForm;