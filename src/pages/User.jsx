import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Container, Grid, Typography } from '@mui/material';

import CollectionCard from '../components/CollectionCard';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';

import userApi from '../http/userAPI';


const User = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const [user, setUser] = React.useState({});
   const [collections, setCollections] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      userApi.getOneWithCollections(id).then(data => {
         setUser(data.user);
         setCollections(data.collections);
         setIsLoading(false);
      }).catch(e => {
         console.warn(e);
         navigate('/');
      });
   }, [id, navigate]);

   if (isLoading) return <Loading />;

   return (
      <Container
         sx={{
            my: 3
         }}
      >
         <UserCard 
            user={user}
         />

         {collections.length 
            ?  <Grid 
                  container
                  spacing={4}
                  sx={{
                     justifyContent: {
                        xs: 'space',
                        lg: 'start'
                     }
                  }}
               >
                  {collections.map(col => {
                     return (
                        <Grid 
                           item
                           xs={12}
                           sm={6}
                           md={4}
                           key={col._id}
                        >
                           <CollectionCard
                              collection={col}
                           />
                        </Grid>
                     );
                  })}
               </Grid>
            :  <Typography
                  variant='h4'
                  component='div'
                  textAlign='center'
               >
                  <FormattedMessage id='user-page.no-collections' />
               </Typography>
         }
      </Container>
   );
};

export default User;