import { FormattedMessage } from 'react-intl';

import { Stack, Box, Typography, Button } from '@mui/material';

import { FileUploader } from "react-drag-drop-files";

const Filefield = ({ fileTypes, handleUpload, handleDelete, file }) => {
   return (
      <Stack
         direction='row'
         spacing={3}
      >
         <FileUploader
            handleChange={handleUpload}
            name="file"
            types={fileTypes}
            fileOrFiles={file}
         >
            <Box>
               {file 
                  ?  <>
                        <Button
                           sx={{ mr: 1 }}
                           ariant='outlined'
                           >
                              <FormattedMessage id='collection-editor.file-uploaded' /> 
                           </Button>
   
                        <Typography variant='caption'>
                           <FormattedMessage id='collection-editor.new-file-upload' /> 
                        </Typography>
                     </>
                  :  <Button
                        sx={{ mr: 1 }}
                        variant='outlined'
                     >
                        <FormattedMessage id='collection-editor.file-upload' /> 
                     </Button>
               }
            </Box>
         </FileUploader>

         {file &&
            <Button 
               color='error'
               onClick={handleDelete}
            >
               <FormattedMessage id='collection-editor.field-delete-button' /> 
            </Button>
         }
      </Stack>
   );
};

export default Filefield;