import React from 'react';
import { Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const TableHeader = ({ columns, orderBy, order, handleRequestSort, handleSelectAllClick, selectedCount, rowsCount }) => {
    const createSortHandler = (property) => {
        if (property === 'Registration date') property = 'timestamp';

        return function (event) {
            handleRequestSort(property);
        }
    };


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={selectedCount > 0 && selectedCount < rowsCount}
                        checked={rowsCount > 0 && selectedCount === rowsCount}
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
                                active={orderBy === column.toLowerCase()}
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
    );
};

export default TableHeader;