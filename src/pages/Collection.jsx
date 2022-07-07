import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import FullCollection from '../components/FullCollection';

import collectionApi from '../http/collectionAPI';

const Collection = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const [collection, setCollection] = React.useState({});
   const [isCollectionLoading, setIsCollectionLoading] = React.useState(true);
   const [isItemsLoading, setItemsIsLoading] = React.useState(true);

   const fetchData = async () => {
      try {
         const collection = await collectionApi.getOne(id);
         setIsCollectionLoading(true);
         setCollection(collection);
         setIsCollectionLoading(false);
      } catch (e) {
         console.warn(e);
         navigate('/');
      }
   };

   React.useEffect(() => {
      fetchData();
   }, []);

   return(
      <Container>
         <FullCollection 
            collection={collection}
            isLoading={isCollectionLoading}
         />
      </Container>
   );
};

export default Collection;