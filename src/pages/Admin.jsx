import React from 'react';

import { Container, Paper, Checkbox, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, TablePagination } from '@mui/material';

import { getUsers } from '../http/userAPI';

const Admin = () => {
    const [users, setUsers] = React.useState([]);
    const [valueToOrderBy, setValueToOrderBy] = React.useState('username');
    const [order, setOrder] = React.useState('asc');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState([]);

    const columns = ['ID', 'Username', 'Email', 'Role', 'Status', 'Regstration date'];
    const cells = ['_id', 'username', 'email', 'role', 'status', 'timestamp'];

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((user) => user._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleItemClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        switch (selectedIndex) {
            case -1:
                newSelected = newSelected.concat(selected, id);
                break;
            case 0:
                newSelected = newSelected.concat(selected.slice(1));
                break;
            case (selected.length - 1):
                newSelected = newSelected.concat(selected.slice(0, -1));
                break;
            default:
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
        }

        setSelected(newSelected);
    };

    const createSortHandler = (property) => {
        if (property === 'Registration date') property = 'timestamp';

        return function (event) {
            const isAscending = (valueToOrderBy === property && order === 'asc');
            setValueToOrderBy(property);
            setOrder(isAscending ? 'desc' : 'asc');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

    React.useEffect(() => {
        getUsers(valueToOrderBy, order, page, rowsPerPage).then(setUsers);
    }, [valueToOrderBy, order, page, rowsPerPage]);

    return (
        <Container>
            <Paper sx={{
                mt: 3
            }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < users.length}
                                        checked={users.length > 0 && selected.length === users.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all users',
                                        }}
                                    />
                                </TableCell>
                                {columns.map(column => {
                                    return (
                                        <TableCell
                                            key={column}
                                        >
                                            <TableSortLabel
                                                active={valueToOrderBy === column.toLowerCase()}
                                                direction={order}
                                                onClick={createSortHandler(column.toLowerCase())}
                                            >
                                                {column}
                                            </TableSortLabel>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.map((user, index) => {
                                const isItemSelected = isSelected(user._id);
                                const labelId = `users-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        key={`row-${user._id}`}
                                        hover
                                        onClick={(event) => handleItemClick(event, user._id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                        id={labelId}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                key={index}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>

                                        {cells.map(cell => {
                                            return (
                                                <TableCell key={user[cell]} align="left">
                                                    {cell === 'timestamp'
                                                        ? new Date(user[cell]).toLocaleDateString()
                                                        : user[cell]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })

                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={-1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};

export default Admin;