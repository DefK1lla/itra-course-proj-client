import React from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Container, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import UserState from '../store/UserState';

import collectionApi from '../http/collectionAPI';
import itemApi from '../http/itemAPI';

import Loading from '../components/Loading';
import NoItemsOverlay from '../components/NoItemsOverlay';
import FullCollection from '../components/FullCollection';
import ItemsToolbar from '../components/ItemsToolbar';

const Collection = () => {
   const intl = useIntl();

   const columns = [
      { field: '_id', headerName: 'ID', width: 250 },
      {
         field: 'title',
         headerName: intl.formatMessage({ id: 'collection-page.item-table.title' }),
         width: 200
      },
      {
         field: 'likesCount',
         headerName: intl.formatMessage({ id: 'collection-page.item-table.likes' }),
         width: 200
      },
      {
         field: 'timestamp',
         headerName: intl.formatMessage({ id: 'collection-page.item-table.date' }),
         width: 200,
         valueFormatter: params => new Date(params.value).toLocaleDateString(),
         renderCell: params => new Date(params.value).toLocaleDateString()
      }, 
      {
         field: 'link',
         headerName: intl.formatMessage({ id: 'collection-page.item-table.link' }),
         width: 200,
         valueFormatter: params => `mern-collections.herokuapp.com${params.value}`,
         renderCell: params => (
            <Button
               component={Link}
               to={params.value}
            >
               View
            </Button>
         )
      }
   ];

   const { id } = useParams();
   const navigate = useNavigate();

   const [collection, setCollection] = React.useState({});
   const [items, setItems] = React.useState([]);
   const [isItemsLoading, setIsItemsLoading] = React.useState(true);
   const [isLoading, setIsLoading] = React.useState(true);
   const [itemsCount, setItemsCount] = React.useState(0);
   const [sortModel, setSortModel] = React.useState({ title: 'desc' });
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const fetchCollection = React.useCallback(async () => {
      try {
         setIsLoading(true);
         const collection = await collectionApi.getOne(id);
         setCollection(collection);
         setIsLoading(false);
      } catch (e) {
         console.warn(e);
         navigate('/');
      }
   },[id, navigate]);

   const handlePageSizeChange = value => {
      setRowsPerPage(value);
   };

   const handlePageChange = newPage => {
      setPage(newPage);
   };

   const handleSortModelChange = model => {
      setSortModel(model[0]);
   };

   const fetchItems = React.useCallback(async () => {
      setItems([]);
      setIsItemsLoading(true);
      let { items, count } = await itemApi.getCollectionItems(id, sortModel, page, rowsPerPage);
      setItemsCount(count);
      items = items.map(item => {
         item.link = `/item/${item._id}`;
         return item;
      });
      setItems(items);
      setIsItemsLoading(false);
   }, [id, sortModel, page, rowsPerPage]);


   React.useEffect(() => {
      fetchCollection();
   }, [fetchCollection]);

   React.useEffect(() => {
      fetchItems();
   }, [fetchItems, sortModel, page, rowsPerPage]);

   if (isLoading) return <Loading />;

   return(
      <Container>
         <FullCollection 
            collection={collection}
         />

         <DataGrid
            autoHeight
            components={{ 
               Toolbar: ItemsToolbar,
               NoRowsOverlay: NoItemsOverlay
            }}
            componentsProps={{ toolbar: { 
               fetchItems,
               userId: collection.userRef._id, 
               collection: collection, 
               collectionId: collection._id
            } }}
            getRowId={row => row._id}
            rows={items}
            columns={columns}
            checkboxSelection={
               UserState.userData?._id === collection.userRef._id || UserState.userData?.role === 'ADMIN'
            }
            disableColumnFilter
            pagination
            paginationMode='server'
            rowCount={itemsCount}
            rowsPerPageOptions={[10, 15, 100]}
            pageSize={rowsPerPage}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            sortingMode='server'
            onSortModelChange={handleSortModelChange}
            loading={isItemsLoading}
         />
      </Container>
   );
};

export default Collection;