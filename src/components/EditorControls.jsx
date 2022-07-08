import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Stack, Button } from '@mui/material';

const EditorControls = () => {
   const navigate = useNavigate();
   const goBack = () => navigate(-1);

   return (
      <Stack
         direction='row'
         spacing={2}
      >
         <Button
            variant='contained'
            type='submit'
         >
            <FormattedMessage id='collection-editor.save-button' />
         </Button>

         <Button
            size='small'
            onClick={goBack}
         >
            <FormattedMessage id='collection-editor.cancell-button' />
         </Button>
      </Stack>
   );
};

export default EditorControls;