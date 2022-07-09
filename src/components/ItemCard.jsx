import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { 
   Card, 
   CardHeader, 
   CardMedia, 
   CardContent,  
   Typography,
   CardActions,
   Box,
   useTheme  
} from '@mui/material';

const ItemCard = ({ title, user, collection, createdTimestamp }) => {
   const theme = useTheme();
   return (
      <Card>
         <CardContent>
            <CardHeader
              title={title}
              subheader={new Date(createdTimestamp).toLocaleDateString()}
            />

            <CardActions
               sx={{ 
                  flexDirection: 'column',
                  alignItems: 'start'
               }}
            >
               <Typography 
                  variant='body2'
                  color='text.secondary'
                  component='div'
               >
                  User: 
                  <Link 
                     style={{
                        color: theme.palette.info.main,
                        marginLeft: 4
                     }}
                     to={`/user/${user._id}`}
                  >
                     {user.username}
                  </Link>
               </Typography>

               <Typography 
                  variant='body2' 
                  color='text.secondary'
                  component='div'
                  sx={{
                     ml: '0!important'
                  }}
               >
                  Collection: 
                  <Link 
                     style={{
                        color: theme.palette.info.main,
                        marginLeft: 4
                     }}
                     to={`/collection/${collection._id}`}
                  >
                     {collection.title}
                  </Link>
               </Typography>

            </CardActions>
         </CardContent>  
      </Card>
   );
};

export default ItemCard;