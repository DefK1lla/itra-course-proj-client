import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
   GridApiContext,
   GridToolbarContainer,
   GridToolbarColumnsButton,
   GridToolbarExport,
   GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

import userApi from '../http/userAPI';
import UserState from '../store/UserState';

const AdminToolbar = React.memo(({ fetchUsers }) => {
   const gridContext = React.useContext(GridApiContext);

   const handleDeleteClick = event => {
      const selected = gridContext.current.state.selection;
      userApi.deleteUsers(selected).then(() => {
         if (selected.includes(UserState.userData._id)) return UserState.logout();
         fetchUsers();
      });
   };

   const handleBlockClick = event => {
      const selected = gridContext.current.state.selection;
      userApi.blockUsers(selected).then(() => {
         if (selected.includes(UserState.userData._id)) return UserState.logout();
         fetchUsers();
      });
   };

   const handleUnblockClick = event => {
      const selected = gridContext.current.state.selection;
      userApi.unblockUsers(selected).then(fetchUsers);
   };

   const handleAddAdminClick = event => {
      const selected = gridContext.current.state.selection;
      userApi.addAdmin(selected).then(fetchUsers);
   };

   const handleRemoveAdminClick = event => {
      const selected = gridContext.current.state.selection;
      userApi.deleteAdmin(selected).then(() => {
         if (selected.includes(UserState.userData._id)) {
            return UserState.login({ ...UserState.userData, role: 'USER' });
         }
         fetchUsers();
      });
   };

   return (
      <GridToolbarContainer>
         <GridToolbarColumnsButton />
         <GridToolbarDensitySelector />'
         <GridToolbarExport 
            printOptions={{ disableToolbarButton: true }} 
            csvOptions={{
               fileName: 'Users table',
               utf8WithBom: true,
            }}
         />
         <Button
            size='small'
            variant='text'
            startIcon={<DeleteForeverOutlinedIcon />}
            onClick={handleDeleteClick}
         >
            <FormattedMessage id='toolbar.delete' />
         </Button>
         <Button
            size='small'
            variant='text'
            startIcon={<LockOutlinedIcon />}
            onClick={handleBlockClick}
         >
            <FormattedMessage id='admin-toolbar.block' />
         </Button>
         <Button
            size='small'
            variant='text'
            startIcon={<LockOpenOutlinedIcon />}
            onClick={handleUnblockClick}
         >
            <FormattedMessage id='admin-toolbar.unblock' />
         </Button>
         <Button
            size='small'
            variant='text'
            startIcon={<VerifiedUserOutlinedIcon />}
            onClick={handleAddAdminClick}
         >
            <FormattedMessage id='admin-toolbar.add-admin' />
         </Button>
         <Button
            size='small'
            variant='text'
            startIcon={<SecurityOutlinedIcon />}
            onClick={handleRemoveAdminClick}
         >
            <FormattedMessage id='admin-toolbar.remove-admin' />
         </Button>
      </GridToolbarContainer>
   )
});

export default AdminToolbar;