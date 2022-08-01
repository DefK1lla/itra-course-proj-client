import React from 'react';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

import {
   IconButton,
   Menu,
   MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const CardMenu = ({ editLink, onDeleteClick, collectionId, userId }) => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return(
      <>
         <IconButton 
            aria-label='settings'
            onClick={handleClick}
         >
           <MoreVertIcon />
         </IconButton>

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <MenuItem
               component={Link}
               to={editLink}
               state={{
                  userId,
                  collectionId
               }}
               onClick={handleClose}
            >
               <FormattedMessage id='card-menu.edit' />
            </MenuItem>

            <MenuItem
               onClick={onDeleteClick}
            >
               <FormattedMessage id='card-menu.delete' />
            </MenuItem>

            {collectionId &&
               <MenuItem
               component={Link}
               to={`/add-item`}
               state={{
                  userId,
                  collectionId
               }}
            >
               <FormattedMessage id='collection-page.add-item' />
            </MenuItem>
            }
         </Menu>
      </>
   );
};

export default CardMenu;