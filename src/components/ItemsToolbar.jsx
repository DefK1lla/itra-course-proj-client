import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
   GridApiContext,
   GridToolbarContainer,
   GridToolbarColumnsButton,
   GridToolbarExport,
   GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddIcon from '@mui/icons-material/Add';

import itemApi from '../http/itemAPI';
import UserState from '../store/UserState';


const ItemsToolbar = React.memo(({ username, userId, collection, collectionId, fetchItems }) => {
   const gridContext = React.useContext(GridApiContext);

   const handleDeleteClick = async (event) => {
      const selected = gridContext.current.state.selection;
      const { count } = await itemApi.deleteMany(selected);
      collection.itemsCount = count;
      fetchItems();
   };

   if (UserState.userData?._id !== userId && UserState.userData?.role !== 'ADMIN') {
      return (
         <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport 
               printOptions={{ disableToolbarButton: true }} 
               csvOptions={{
                  fileName: 'collection',
                  utf8WithBom: true,
               }}
            />
         </GridToolbarContainer>
      )
   }

   return (
      <GridToolbarContainer>
         <GridToolbarColumnsButton />
         <GridToolbarDensitySelector />
         <GridToolbarExport 
            printOptions={{ disableToolbarButton: true }} 
            csvOptions={{
               fileName: 'collection',
               utf8WithBom: true,
            }}
         />
         <Button
            component={Link}
            to='/add-item'
            state={{
               userId,
               collectionId
            }}
            startIcon={<AddIcon />}            
         >
            <FormattedMessage id='toolbar.add' />
         </Button>

         <Button
            size='small'
            variant='text'
            startIcon={<DeleteForeverOutlinedIcon />}
            onClick={handleDeleteClick}
         >
            <FormattedMessage id='toolbar.delete' />
         </Button>
      </GridToolbarContainer>
   )
});

export default ItemsToolbar;