import React from 'react';
import { useSearchParams } from 'react-router-dom';

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

   const inputRef = React.useRef();
   const intl = useIntl();
   const [params, setParams] = useSearchParams();
   const [results, setResults] = React.useState([]);
   const [count, setCount] = React.useState(0);
   const [page, setPage] = React.useState(1);
   const [isLoading, setIsLoading] = React.useState(true);


   const fetchData = React.useCallback(async () => {
      setIsLoading(true);
      const results = await searchApi.fullTextSearch(params.get('keyword'), page, limit);
      setResults(results.result);
      setCount(results.count);
      setIsLoading(false);
   }, [page, params]);

   const handleSearchClick = (e) => {
      e.preventDefault();
      if (inputRef.current.value === '') return;

      setParams({
         keyword: inputRef.current.value
      });
      setPage(1);
   };

   React.useEffect(() => {
      fetchData();
   }, [page, fetchData]);

   if (isLoading) return <Loading />;

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
      </Container>
   );
};

export default Search;