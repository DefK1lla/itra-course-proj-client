import React from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { Container, Button } from '@mui/material';

import UserState from '../store/UserState';

import collectionApi from '../http/collectionAPI';

import Loading from '../components/Loading';
import FullCollection from '../components/FullCollection';

const Collection = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const [collection, setCollection] = React.useState({});
   const [isLoading, setIsLoading] = React.useState(true);

   const fetchData = React.useCallback(async () => {
      try {
         setIsLoading(true);
         const collection = await collectionApi.getOne(id);
         setCollection(collection);
         setIsLoading(false);
      } catch (e) {
         console.warn(e);
         navigate('/');
      }
   },[id, navigate]);

   React.useEffect(() => {
      fetchData();
   }, [fetchData]);

   if (isLoading) return <Loading />;

   return(
      <Container>
         <FullCollection 
            collection={collection}
         />

         {(UserState.userData?._id === collection.userRef._id || UserState.userData?.role === 'ADMIN') && 
            <Button
               component={Link}
               to='/add-item'
               state={{
                  userId: collection.userRef._id,
                  collectionId: collection._id
               }}               
            >
               Add item
            </Button>
         }

      </Container>
   );
};

export default Collection;