import React from 'react';
import { Link } from 'react-router-dom';

import { FormattedMessage, useIntl } from 'react-intl';

import { 
   Card, 
   CardHeader, 
   CardContent,  
   Typography,
   CardActions,
   FormControlLabel,
   Checkbox,
   useTheme  
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import UserState from '../store/UserState';

import itemApi from '../http/itemAPI';

const ItemCard = ({ id, title, likesCount, isLiked, user, collection, createdTimestamp }) => {
   const theme = useTheme();
   const intl = useIntl();

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
   }

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
                  <FormattedMessage id='item-card.collection' />: 
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