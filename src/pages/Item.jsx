import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Paper, Stack } from '@mui/material';

import UserState from '../store/UserState';

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
         const item = await itemApi.getOne(id, UserState.userData?._id);
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
               id={item._id}
               title={item.title}
               user={item.userRef}
               collection={item.collectionRef}
               createdTimestamp={item.timestamp}
               likesCount={item.likesCount}
               isLiked={item.isLiked}
            />

            {item.fields.length !== 0 &&
               <ItemInfo 
                  fields={item.fields}
               />
            }

            {item.tags.length !== 0 &&
               <Paper
                  sx={{
                     p: 2
                  }}
               >
                  <TagCloud 
                     tags={item.tags}
                  />
               </Paper>
            }
         </Stack>
      </Container>
   );
};

export default Item;