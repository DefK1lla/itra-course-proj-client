import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InputBase, IconButton, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

function SearchForm() {
    const Search = styled('div')(({ theme }) => ({
        display: 'flex',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            paddingLeft: '1em',
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    return (
        <Box
            component='form'
            sx={{ mr: 'auto' }}>

            <Search>
                <FormattedMessage id='header.search'>
                    {(msg) => (
                        <StyledInputBase
                            placeholder={msg[0]}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    )}
                </FormattedMessage>

                <IconButton
                    color='inherit'
                    type="submit"
                >
                    <SearchIcon />
                </IconButton>
            </Search>
        </Box>
    )
}

export default SearchForm;