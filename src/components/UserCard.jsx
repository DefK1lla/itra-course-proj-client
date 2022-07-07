import { Avatar, Stack, Typography, Link } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import MailIcon from '@mui/icons-material/Mail';

const UserCard = ({ user }) => {
   return (
      <Stack
         alignItems='center'
         spacing={2}
         sx={{
            mb: 3
         }}
      >
         <Stack
               spacing={1}
               direction='row'
               alignItems='center'
            >
            <Avatar
              sx={{ 
               bgcolor: deepOrange[500] 
               }}
            >
              {user.username[0]}
            </Avatar>

            <Typography>
               {user.username}
            </Typography>
         </Stack>

         <Stack
            spacing={1}
            direction='row'
            alignItems='center'
         >
            <MailIcon />   

            <Link
               href={`mailto: ${user.email}`}
            >
               <Typography>
                  {user.email}
               </Typography>
            </Link>
         </Stack>
      </Stack>
   );
};

export default UserCard;