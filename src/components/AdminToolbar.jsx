import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    GridApiContext,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

import { blockUsers, unblockUsers, deleteUsers, addAdmin, deleteAdmin } from '../http/userAPI';
import UserState from '../store/UserState';

const AdminToolbar = React.memo(({ fetchUsers }) => {
    const navigate = useNavigate();
    const gridContext = React.useContext(GridApiContext);

    const handleDeleteClick = (event) => {
        const selected = gridContext.current.state.selection;
        deleteUsers(selected).then(() => {
            if (selected.includes(UserState.userData._id)) return UserState.logout();
            fetchUsers();
        });
    };

    const handleBlockClick = (event) => {
        const selected = gridContext.current.state.selection;
        blockUsers(selected).then(() => {
            if (selected.includes(UserState.userData._id)) return UserState.logout();
            fetchUsers();
        });
    };

    const handleUnblockClick = (event) => {
        const selected = gridContext.current.state.selection;
        unblockUsers(selected).then(fetchUsers);
    };

    const handleAddAdminClick = (event) => {
        const selected = gridContext.current.state.selection;
        addAdmin(selected).then(fetchUsers);
    };

    const handleRemoveAdminClick = (event) => {
        const selected = gridContext.current.state.selection;
        deleteAdmin(selected).then(() => {
            if (selected.includes(UserState.userData._id)) {
                return UserState.login({
                    ...UserState.userData,
                    role: 'USER'
                });
            }
            fetchUsers();
        });
    };

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                printOptions={{ disableToolbarButton: true }}
            />

            <Button
                size='small'
                variant='text'
                startIcon={<DeleteForeverOutlinedIcon />}
                onClick={handleDeleteClick}
            >
                Delete
            </Button>

            <Button
                size='small'
                variant='text'
                startIcon={<LockOutlinedIcon />}
                onClick={handleBlockClick}
            >
                Block
            </Button>

            <Button
                size='small'
                variant='text'
                startIcon={<LockOpenOutlinedIcon />}
                onClick={handleUnblockClick}
            >
                Unblock
            </Button>

            <Button
                size='small'
                variant='text'
                startIcon={<VerifiedUserOutlinedIcon />}
                onClick={handleAddAdminClick}
            >
                Add admin
            </Button>

            <Button
                size='small'
                variant='text'
                startIcon={<SecurityOutlinedIcon />}
                onClick={handleRemoveAdminClick}
            >
                Remove admin
            </Button>
        </GridToolbarContainer>
    );
});

export default AdminToolbar;