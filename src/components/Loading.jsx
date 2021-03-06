import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = ({ height }) => {
   return (
      <Box
         sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: height ?? '100vh',
            mt: '-70px'
         }}
      >
         <CircularProgress /> 
      </Box>
   );
};
 
export default Loading;
