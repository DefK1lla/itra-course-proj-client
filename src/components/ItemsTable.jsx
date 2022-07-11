import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

import UserState from '../store/UserState';

import ItemsToolbar from '../components/ItemsToolbar';
import NoRowsOverlay from '../components/NoRowsOverlay';

const ItemsTable = React.memo(({ items, columns, userId, collection, collectionId, isLoading }) => {
   return (
      <DataGrid
         autoHeight
         components={{ Toolbar: ItemsToolbar }}
         componentsProps={{ toolbar: { userId, collection } }}
         getRowId={row => row._id}
         rows={items}
         columns={columns}
         loading={isLoading}
         checkboxSelection = {UserState.userData?._id === userId || UserState.userData?.role === 'ADMIN'}
      />
   );
});

export default ItemsTable;