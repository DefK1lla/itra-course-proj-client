import { FormattedMessage } from 'react-intl';

import { Box } from '@mui/material';

const NoItemsOverlay = () => {
   return(
      <Box
         sx={{
            minWidth: '100%',
            minHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
         }}
      >
         <FormattedMessage id='collection-page.item-table.now-rows'/>
      </Box>
   );
};

export default NoItemsOverlay;