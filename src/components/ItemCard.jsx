import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { 
   Card, 
   CardHeader, 
   CardContent, 
   Typography,
   CardActions,
   Link  
} from '@mui/material';

import UserState from '../store/UserState';

import collectionApi from '../http/collectionAPI';

import CardMenu from './CardMenu';
import TagCloud from './TagCloud';

const itemCard = ({ item, setItems }) => {
   const handleDeleteClick = (event) => {
      collectionApi.delete(item._id);
      setItems(prevState => prevState.filter(elem => elem._id !== item._id));
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
                  to={`/item/${item._id}`}
                  component={RouterLink}
                  sx={{
                     wordBreak: 'break-word',
                     textDecoration: 'none',
                  }}
               >
                  {item.title}
               </Link>
           }
           subheader={new Date(item.timestamp).toLocaleDateString()}
           action={
            (UserState.userData?._id === item.userRef._id || UserState.userData?.role === 'ADMIN') &&
               <CardMenu 
                  sx={{
                     position: 'relative',
                     zIndex: '9999'
                  }}
                  onDeleteClick={handleDeleteClick}
                  editLink={`/item/${item._id}/edit`}
               />
            }
         />
         <CardContent>
            <Typography 
               variant='body2'
               color='text.secondary'
               component='div'
            >
               <FormattedMessage id='item-card.user' />: 
               <Link 
                  sx={{ ml: 1 }}
                  component={RouterLink}
                  to={`/user/${item.userRef._id}`}
               >
                  {item.userRef.username}
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
               <FormattedMessage id='item-card.collection' />: 
               <Link 
                  sx={{ ml: 1 }}
                  component={RouterLink}
                  to={`/collection/${item.collectionRef._id}`}
               >
                  {item.collectionRef.title}
               </Link>
            </Typography>
         </CardContent>  
         <CardActions>
            {item.tags?.length > 0 &&
               <TagCloud 
                  tags={item.tags}
               />
            }
         </CardActions>
      </Card>
   );
};

export default itemCard;