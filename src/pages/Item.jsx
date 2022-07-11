import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Container, Paper, Stack, Typography, Pagination } from '@mui/material';

import UserState from '../store/UserState';

import itemApi from '../http/itemAPI';
import commentApi from '../http/commentAPI';

import Loading from '../components/Loading';
import ItemCard from '../components/ItemCard';
import ItemInfo from '../components/ItemInfo';
import TagCloud from '../components/TagCloud';
import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';

const Item = () => {
   const commentsPerPage = 5;

   const { id } = useParams();
   const navigate = useNavigate();

   const [item, setItem] = React.useState({});
   const [comments, setComments] = React.useState([]);
   const [commentsCount, setCommentsCount] = React.useState(0);
   const [page, setPage] = React.useState(1);
   const [isCommentsLoading, setIsCommentsLoading] = React.useState(true);
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

   const fetchComments = React.useCallback(async () => {
      setIsCommentsLoading(true);
      const {comments, count} = await commentApi.getItemComments(id, page - 1, commentsPerPage);
      setCommentsCount(count);
      setComments(comments);
      setIsCommentsLoading(false);
   }, [id, page, commentsPerPage]);

   const createSubmitHandler = reset => {
      return async data => {
         await commentApi.create(id, data);
         setPage(0);
         fetchComments();
         reset();
      };
   };

   const handlePageChange = (event, newPage) => {
      setPage(newPage);
   };

   React.useEffect(() => {
       fetchItem();
   }, [fetchItem]);

   React.useEffect(() => {
      fetchComments();
   }, [page, fetchComments]);

   if (isLoading) return <Loading />;

   return (
      <Container
         sx={{
            py: 3
         }}
      >
         <Stack
            spacing={5}
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

            {item.fields?.length > 0 &&
               <ItemInfo 
                  fields={item.fields}
               />
            }

            {item.tags?.length > 0 &&
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

            {comments.length  > 0 
               ?  <>
                     <Comments 
                        comments={comments}
                     />

                     <Pagination 
                        count={Math.ceil(commentsCount / commentsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                     />
                  </>
               : isCommentsLoading 
                  ?  <Loading />
                  :  <Typography
                        variant='h6'
                        component='h6'
                        sx={{
                           my: 4
                        }}
                     > 
                        <FormattedMessage id='comments.no-comments' /> 
                     </Typography>
            }

            <CommentForm 
               onSubmit={createSubmitHandler}
            />
         </Stack>
      </Container>
   );
};

export default Item;