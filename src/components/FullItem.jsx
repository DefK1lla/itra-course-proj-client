import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { FormattedMessage, useIntl } from 'react-intl';

import { 
   Card, 
   CardHeader, 
   CardContent,  
   Typography,
   CardActions,
   FormControlLabel,
   Checkbox,
   Link,
   useTheme  
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import UserState from '../store/UserState';

import itemApi from '../http/itemAPI';

import CardMenu from './CardMenu';

const FullItem = ({ id, title, likesCount, isLiked, user, collection, createdTimestamp }) => {
   const theme = useTheme();
   const intl = useIntl();
   const navigate = useNavigate();

   const [like, setLike] = React.useState(isLiked);
   const [likes, setLikes] = React.useState(likesCount);

   const hendleLikeClick = (event) => {
      setLike(prevState => !prevState);

      if (!like) {
         setLikes(prevState => prevState+1);
         itemApi.like(id);
      } else {
         setLikes(prevState => prevState-1);
         itemApi.dislike(id);
      }
   };

   const handleDeleteClick = async (event) => {
      await itemApi.deleteOne(id);
      navigate(`/collection/${collection._id}`);
   };

   return (
      <Card
         sx={{
            position: 'relative'
         }}
      >
         <FormControlLabel
            sx={{
               position: 'absolute',
               bottom: 5,
               right: 15
            }}
            label={likes + ' ' + intl.formatMessage({ id: 'item-card.likes-count' })}
            labelPlacement='start'
            control={
               <Checkbox  
                  icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />}
                  onChange={hendleLikeClick}
                  disabled={!UserState.isAuth}
                  checked={like}
               />
            } 
         />

         <CardContent>
            <CardHeader
              title={title}
              subheader={new Date(createdTimestamp).toLocaleDateString()}
              action={
               (UserState.userData?._id === user._id || UserState.userData?.role === 'ADMIN') &&
                  <CardMenu 
                     onDeleteClick={handleDeleteClick}
                     editLink={`/item/${id}/edit`}
                     userId={user._id}
                  />
               }
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
                  <FormattedMessage id='item-card.user' />: 
                  <Link 
                     component={RouterLink}
                     sx={{ ml: 1 }}
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
                  <FormattedMessage id='item-card.collection' />: 
                  <Link 
                     component={RouterLink}
                     sx={{ ml: 1 }}
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

export default FullItem;