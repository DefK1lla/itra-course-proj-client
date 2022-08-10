import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { FormattedMessage, useIntl } from 'react-intl';

import { 
   Container, 
   Stack, 
   Typography, 
   IconButton, 
   TextField,
   Box 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import searchApi from '../http/searchAPI';

import Loading from '../components/Loading';
import CollectionCard from '../components/CollectionCard';
import ItemCard from '../components/ItemCard';

const Search = () => {
   const limit = 10;

   const intl = useIntl();
   const navigate = useNavigate();
   const [params, setParams] = useSearchParams();
   const inputRef = React.useRef();
   const [results, setResults] = React.useState([]);
   const [count, setCount] = React.useState(0);
   const [page, setPage] = React.useState(1);
   const [isLoading, setIsLoading] = React.useState(true);


   const fetchData = React.useCallback(async () => {
      try {
         const data = await searchApi.fullTextSearch(params.get('keyword'), page, limit);
         setResults([...results, ...data.result]);
         setPage(prevState => prevState + 1);
         setCount(data.count);
      } catch (e) {
         console.warn(e);
         navigate('/');
      } finally {
         setIsLoading(false);
      }
   }, [page, results, params, navigate]);

   const handleSearchClick = (e) => {
      e.preventDefault();
      if (inputRef.current.value === '') return;

      setParams({
         keyword: inputRef.current.value
      });
      setResults([]);
      setPage(1);
      setIsLoading(true);
   };

   const handleScroll = React.useCallback((e) => {
      if (!(count > results.length)) return;

      const scrollHeight = e.target.documentElement.scrollHeight,
         scrollTop = e.target.documentElement.scrollTop,
         viewportHeight = window.innerHeight;

      if (scrollHeight - (scrollTop + viewportHeight) < 300) setIsLoading(true); 
   }, [count, results.length]);

   React.useEffect(() => {
      document.addEventListener('scroll', handleScroll);

      return () => document.removeEventListener('scroll', handleScroll);

   }, [handleScroll]);

   React.useEffect(() => {
      const keyword = params.get('keyword');
      if (inputRef.current.value === keyword) return;
      
      inputRef.current.value = keyword;
      setResults([]);
      setPage(1);
      setIsLoading(true);
   }, [params]);

   React.useEffect(() => {
      if (isLoading) {
         fetchData();
      }
   }, [isLoading, fetchData]);

   return (
      <Container
         sx={{
            pt: 3
         }}
      >
         <Box
            component='form'
         >
            <TextField
               sx={{ mb: 3 }}
               fullWidth
               variant='standard'
               label={intl.formatMessage({ id: 'search-page.input-placeholder' })}
               defaultValue={params.get('keyword')}
               inputRef={inputRef}
               InputProps={{ 
                  endAdornment: 
                     <IconButton
                        type='submit'
                        onClick={handleSearchClick}
                     >
                        <SearchIcon />
                     </IconButton>
               }}
            />
         </Box>

         <Typography
            variant='h5'
            component='div'
            gutterBottom
         >
            <FormattedMessage id='search-page.results-count' />: {count}
         </Typography>

         {(results.length !== 0) && 
            <Stack
               spacing={3}
            >
               {results.map(res => {
                  if (res.collectionRef) {
                     return (
                        <ItemCard 
                           key={res._id}
                           item={res}
                           setItems={setResults}
                        />
                     );
                  }

                  return (
                     <CollectionCard
                        key={res._id}
                        collection={res}
                        setCollections={setResults}
                     />
                  );
               })}
            </Stack>
         }

         {isLoading &&
            <Loading />
         }
      </Container>
   );
};

export default Search;