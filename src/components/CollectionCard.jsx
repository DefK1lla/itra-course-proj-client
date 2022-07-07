import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { 
   Card, 
   CardActionArea, 
   CardHeader, 
   CardMedia, 
   CardContent, 
   Typography,
   CardActions,
   useTheme  
} from '@mui/material';

const CollectionCard = ({ collection }) => {
   const theme = useTheme();

   return(
      <Card 
         sx={{ 
            width: '100%'
         }}
      >
         <Link
            to={`/collection/${collection._id}`}
            style={{
               textDecoration: 'none',
               color: theme.palette.text.primary,
            }}
         >
            <CardActionArea>
               <CardHeader
                 title={collection.title}
                 subheader={new Date(collection.timestamp).toLocaleDateString()}
               />

               {collection.imgSrc &&
                  <CardMedia
                     component="img"
                     width="100%"
                     image={collection.imgSrc}
                  />
               }

               <CardContent>
                  <Typography 
                     variant='caption'
                     component='div'
                     color='text.secondary'
                     gutterBottom 
                  >
                     <FormattedMessage id='collection-card.theme' />: {collection.theme}
                  </Typography>

                  <Typography 
                     variant='caption' 
                     component='div'
                     color='text.secondary'
                  >
                     <FormattedMessage id='collection-card.items-count' />: {collection.itemsCount}
                  </Typography>
               </CardContent>  
            </CardActionArea>
         </Link>  
         <CardActions>
            <Typography 
               variant="body2" 
               color="text.secondary"
            >
               <FormattedMessage id='collection-card.user' />: 
               <Link 
                  style={{
                     color: theme.palette.info.main,
                     marginLeft: 4
                  }}
                  to={`/user/${collection.userRef._id}`}
               >
                  {collection.userRef.username}
               </Link>
            </Typography>
         </CardActions>
      </Card>
   );
};

export default CollectionCard;