import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { InputBase, IconButton, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

function SearchForm() {
   const intl = useIntl();
   const navigate = useNavigate();
   const inputRef = React.useRef();

   const handleSearchClick = (e) => {
      if (inputRef.current.value === '') return;
      navigate(`/search?keyword=${inputRef.current.value}`);
   };

   const Search = styled('div')(({ theme }) => ({
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         width: 'auto'
      }
   }));

   const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
         paddingLeft: '1em',
         transition: theme.transitions.create('width'),
         width: '100%',
         [theme.breakpoints.up('md')]: { width: '20ch' }
      }
   }));

   return (
      <Box component='form' sx={{ mr: 'auto' }}>
         <Search>
            <StyledInputBase
               placeholder={intl.formatMessage({ id: 'header.search' })}
               inputRef={inputRef}
               inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
               color='inherit' 
               type='submit'
               onClick={handleSearchClick}
            >
               <SearchIcon />
            </IconButton>
         </Search>
      </Box>
   );
};

export default SearchForm;
