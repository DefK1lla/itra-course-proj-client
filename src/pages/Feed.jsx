import React from 'react';

import {  Container, Stack, Paper, Grid } from '@mui/material';

import collectionApi from '../http/collectionAPI';
import itemApi from '../http/itemAPI';
import tagApi from '../http/tagAPI';

import Loading from '../components/Loading';
import TagCloud from '../components/TagCloud';
import CollectionCard from '../components/CollectionCard';
import FeedTable from '../components/FeedTable';

const Feed = () => {
   const [collections, setCollections] = React.useState([]);
   const [items, setItems] = React.useState([]);
   const [tags, setTags] = React.useState([]);
   const [isCollectionsLoading, setIsCollectionsLoading] = React.useState(true);
   const [isItemsLoading, setIsItemsLoading] = React.useState(true);
   const [isTagsLoading, setIsTagsLoading] = React.useState(true);

   const fetchCollections = async () => {
      setIsCollectionsLoading(true);
      const collections = await collectionApi.getLargest();
      setCollections(collections);
      setIsCollectionsLoading(false);
   };

   const fetchItems = async () => {
      setIsItemsLoading(true);
      const items = await itemApi.getLatest();
      setItems(items);
      setIsItemsLoading(false);
   };

   const fetchTags = async () => {
      setIsTagsLoading(true);
      const tags = await tagApi.getAll();
      setTags(tags.map(tag => tag.title));
      setIsTagsLoading(false);
   };
 
   const fetchData = () => {
      fetchCollections();
      fetchItems();
      fetchTags();
   };

   React.useEffect(fetchData, []);

   if (isCollectionsLoading || isItemsLoading || isTagsLoading) return <Loading />;

   return (
      <Container
         sx={{
            pt: 3
         }}
      >
         <Stack
            spacing={3}
         >
            {items.length !== 0 && 
               <FeedTable 
                  items={items}
               />
            }

            {collections.length !== 0 &&
               <Grid 
                  container
                  spacing={3}
                  sx={{
                     ml: '-24px!important',
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
                              setCollections={setCollections}
                           />
                        </Grid>
                     );
                  })}
               </Grid>
            }

            {tags.length !== 0 &&
               <Paper
                  sx={{
                     p: 2
                  }}
               >
                  <TagCloud 
                     tags={tags}
                  />
               </Paper>
            }
         </Stack>
      </Container>
   );
};

export default Feed;
