import React from 'react';
import { useIntl } from 'react-intl';

import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import user from '../http/userAPI';
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

   const fetchUsers = () => {
      setUsers([]);
      setIsLoading(true);
      user.getAll(sortModel, page, rowsPerPage).then(data => {
         setUsers(data.users);
         setUsersCount(data.count);
         setIsLoading(false);
      });
   };

   React.useEffect(fetchUsers, [sortModel, page, rowsPerPage]);

   return (
      <Container 
         sx={{ 
            height: 675, 
            my: 3 
         }}
      >
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
