import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Paper, Stack } from '@mui/material';

import itemApi from '../http/itemAPI';

import Loading from '../components/Loading';
import ItemCard from '../components/ItemCard';
import ItemInfo from '../components/ItemInfo';
import TagCloud from '../components/TagCloud';

const Item = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const [item, setItem] = React.useState({});
   const [isLoading, setIsLoading] = React.useState(true);

   const fetchItem = React.useCallback(async () => {
      try {
         setIsLoading(true);
         const item = await itemApi.getOne(id);
         setItem(item);
         setIsLoading(false);
      } catch (e) {
         console.warn(e);
         navigate('/');
      }
   }, [id, navigate]);

   React.useEffect(() => {
       fetchItem();
   }, [fetchItem]);

   if (isLoading) return <Loading />;

   return (
      <Container
         sx={{
            py: 3
         }}
      >
         <Stack
            spacing={3}
         >
            <ItemCard 
               title={item.title}
               user={item.userRef}
               collection={item.collectionRef}
               createdTimestamp={item.timestamp}
            />

            {item.fields.length !== 0 &&
               <ItemInfo 
                  fields={item.fields}
               />
            }

            <Paper
               sx={{
                  p: 2
               }}
            >
               {item.tags.length !== 0 &&
                  <TagCloud 
                     tags={item.tags}
                  />
               }
            </Paper>
         </Stack>
      </Container>
   );
};

export default Item;