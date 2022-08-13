import React from 'react';
import { useIntl } from 'react-intl';

import { Container, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';

import userApi from '../http/userAPI';
import searchApi from '../http/searchAPI';

import AdminToolbar from '../components/AdminToolbar';

const Admin = () => {
   const intl = useIntl();
   const columns = [
      { field: '_id', headerName: 'ID', width: 250 },
      {
         field: 'username',
         headerName: intl.formatMessage({ id: 'admin-panel.username' }),
         width: 150
      },
      {
         field: 'email',
         headerName: intl.formatMessage({ id: 'admin-panel.email' }),
         width: 230
      },
      {
         field: 'role',
         headerName: intl.formatMessage({ id: 'admin-panel.role' }),
         width: 100
      },
      {
         field: 'status',
         headerName: intl.formatMessage({ id: 'admin-panel.status' }),
         width: 160
      },
      {
         field: 'timestamp',
         headerName: intl.formatMessage({ id: 'admin-panel.reg-date' }),
         width: 150,
         valueFormatter: params => new Date(params.value).toLocaleDateString(),
         renderCell: params => new Date(params.value).toLocaleDateString()
      }
   ];

   const inputRef = React.useRef();
   const [isSearch, setIsSearch] = React.useState(false);
   const [users, setUsers] = React.useState([]);
   const [usersCount, setUsersCount] = React.useState(0);
   const [sortModel, setSortModel] = React.useState({ username: 'desc' });
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [isLoading, setIsLoading] = React.useState(false);

   const handlePageSizeChange = value => {
      setRowsPerPage(value);
   };

   const handlePageChange = newPage => {
      setPage(newPage);
   };

   const handleSortModelChange = model => {
      setSortModel(model[0]);
   };

   const handleEnterPress = e => {
      if (e.key === 'Enter') {
         if (!isSearch && inputRef.current.value === '') return;

         if (!isSearch || page !== 0) {
            setIsSearch(true);
            setPage(0);
         } else {
            fetchUsers();
         }         
      }
   };

   const handleClearClick = e => {
      inputRef.current.value = '';
      setIsSearch(false);
      setPage(0);
   };

   const fetchUsers = React.useCallback(async () => {
      let data;

      if (isSearch) {
         data = await searchApi.userSearch(inputRef.current.value, sortModel, page, rowsPerPage);
      } else {
         setUsers([]);
         setIsLoading(true);
         data = await userApi.getAll(sortModel, page, rowsPerPage);
      }

      setUsers(data.users);
      setUsersCount(data.count);
      setIsLoading(false);
   }, [isSearch, sortModel, page, rowsPerPage]);

   React.useEffect(() => {
      fetchUsers();
   }, [fetchUsers]);

   return (
      <Container 
         sx={{ 
            height: 675, 
            my: 3 
         }}
      >
         <TextField
            sx={{ mb: 3 }}
            fullWidth
            variant='standard'
            label={intl.formatMessage({ id: 'admin-toolbar.search-placeholder' })}
            inputRef={inputRef}
            onKeyPress={handleEnterPress}
            InputProps={{ 
               endAdornment: 
                  <IconButton
                     onClick={handleClearClick}
                  >
                     <ClearIcon />
                  </IconButton>
            }}
         />
         <DataGrid
            components={{ Toolbar: AdminToolbar }}
            componentsProps={{ toolbar: { fetchUsers } }}
            getRowId={row => row._id}
            rows={users}
            columns={columns}
            checkboxSelection
            disableColumnFilter
            pagination
            paginationMode='server'
            rowCount={usersCount}
            rowsPerPageOptions={[10, 15]}
            pageSize={rowsPerPage}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            sortingMode='server'
            onSortModelChange={handleSortModelChange}
            loading={isLoading}
         />
      </Container>
   );
};

export default Admin;
