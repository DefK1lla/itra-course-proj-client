import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Stack, Paper, Typography, Link, Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const Comments = ({ comments }) => {
   return (
      <Stack
         spacing={1}
      >
         <Typography
            component='h6'
            variant='h6'
         >
            <FormattedMessage id='comments.title' />
         </Typography>

         {comments.map(comment => (
               <Paper
                  key={comment._id}
                  sx={{ 
                     p: 2,
                     display: 'flex',
                     flexDirection: 'column' 
                  }}
               >
                  <Stack
                     spacing={1}
                     direction='row'
                     alignItems='center'
                     sx={{ mb: 3 }}
                  >
                     <Avatar
                       sx={{ 
                           bgcolor: deepOrange[500] 
                        }}
                     >
                       {comment.userRef.username[0]}
                     </Avatar>

                     <Link
                        component={RouterLink}
                        to={`/user/${comment.userRef._id}`}
                     >
                        {comment.userRef.username}
                     </Link>
                  </Stack>

                  <Typography>
                     {comment.text}
                  </Typography>

                  <Typography
                     sx={{
                        alignSelf: 'end'
                     }}
                  >
                     {new Date(comment.timestamp).toLocaleString()}
                  </Typography>
               </Paper>
            ))
         }
      </Stack>
   );
};

export default Comments;