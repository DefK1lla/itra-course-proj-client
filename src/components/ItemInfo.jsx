
import { Paper, Box, Stack, Typography, Checkbox } from '@mui/material';

const ItemInfo = ({ fields }) => {
   return (
      <Paper
         sx={{
            p: 2
         }}
      >
         <Stack
            spacing={2}
         >
            {fields.map(field => {
                  if (field.fieldRef.type === 'textarea') {
                     return (
                        <Box
                           key={field._id}
                        >
                           <Typography
                              sx={{
                                 fontWeight: 600
                              }}
                              gutterBottom   
                           >
                              {field.fieldRef.title}
                           </Typography>

                           <Typography>
                              {field.value}
                           </Typography>
                        </Box>
                     )
                  }

                  if (field.fieldRef.type === 'checkbox') {
                     return (
                        <Box
                           key={field._id}
                        >
                           <Checkbox 
                              checked={JSON.parse(field.value)}
                           />

                           <Typography
                              component='span'
                           >
                              {field.fieldRef.title}
                           </Typography>
                        </Box>
                     );
                  }

                  if (field.fieldRef.type === 'date') {
                     return (
                        <Typography
                           key={field._id}
                        >
                           <b>{field.fieldRef.title}</b>: {new Date(field.value).toLocaleDateString()}
                        </Typography>
                     );
                  }

                  return (
                     <Typography
                        key={field._id}
                     >
                        <b>{field.fieldRef.title}</b>: {field.value}
                     </Typography>
                  );
               })
            }

         </Stack>
      </Paper>
   );
};

export default ItemInfo;