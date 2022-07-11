import React from 'react';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { 
   Card, 
   CardHeader, 
   CardMedia, 
   CardContent, 
   Typography,
   CardActions,
   useTheme  
} from '@mui/material';

import UserState from '../store/UserState';

import collectionApi from '../http/collectionAPI';

import CardMenu from './CardMenu';

const CollectionCard = ({ collection, setCollections }) => {
   const theme = useTheme();

   const handleDeleteClick = (event) => {
      collectionApi.delete(collection._id);
      setCollections(prevState => prevState.filter(item => item._id !== collection._id));
   };

   return(
      <Card 
         sx={{ 
            width: '100%'
         }}
      >
         <CardHeader
            title={
               <Link
                  to={`/collection/${collection._id}`}
                  style={{
                     wordBreak: 'break-word',
                     textDecoration: 'none',
                     color: theme.palette.info.main,
                  }}
               >
                  {collection.title}
               </Link>
           }
           subheader={new Date(collection.timestamp).toLocaleDateString()}
           action={
            (UserState.userData?._id === collection.userRef._id || UserState.userData?.role === 'ADMIN') &&
               <CardMenu 
                  sx={{
                     position: 'relative',
                     zIndex: '9999'
                  }}
                  onDeleteClick={handleDeleteClick}
                  editLink={`/collection/${collection._id}/edit`}
               />
            }
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