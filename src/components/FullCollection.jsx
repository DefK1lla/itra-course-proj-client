import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
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
import ReactMarkdown from 'react-markdown';

import UserState from '../store/UserState';

import collectionApi from '../http/collectionAPI';

import CardMenu from '../components/CardMenu';

const FullCollection = ({ collection, isLoading }) => {
   const theme = useTheme();
   const navigate = useNavigate();

   const handleDeleteClick = async (event) => {
      await collectionApi.delete(collection._id);
      navigate(`/user/${collection.userRef._id}`);
   };

   return (
      <Card 
         sx={{ 
            width: '100%',
            my: 3
         }}
      >
         <CardContent>
            <CardHeader
              title={collection.title}
              subheader={new Date(collection.timestamp).toLocaleDateString()}
              action={
               (UserState.userData?._id === collection.userRef._id  || UserState.userData?.role === 'ADMIN') &&
                  <CardMenu 
                     onDeleteClick={handleDeleteClick}
                     editLink={`/collection/${collection._id}/edit`}
                     collectionId={collection._id}
                     userId={collection.userRef._id}
                  />
               }
            />

            {collection.imgSrc &&
               <CardMedia
                  component='img'
                  width='100%'
                  image={collection.imgSrc}
               />
            }

            <CardActions>
               <Typography 
                  variant='body2' 
                  color='text.secondary'
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

            <Box
               sx={{
                  pl: 1
               }}
            >
               <Typography 
                  variant='caption' 
                  component='div'
                  color='text.secondary'
               >
                  <FormattedMessage id='collection-card.items-count' />: {collection.itemsCount}
               </Typography>

               <Typography 
                  variant='caption' 
                  color='text.secondary'
               >
                  <FormattedMessage id='collection-card.theme' />: {collection.theme}
               </Typography>
            </Box>

            <ReactMarkdown children={collection.description} />
         </CardContent>  
      </Card>
   );
};

export default FullCollection;