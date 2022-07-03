import React from 'react';

import { Container, Paper, Checkbox, Table, TableBody, TableContainer, TableRow, TableCell, TableFooter, TablePagination } from '@mui/material';

import { getUsers } from '../http/userAPI';
import TableHeader from '../components/TableHeader';

const Admin = () => {
   const [items, setItems] = React.useState([]);
   const [itemsCount, setItemsCount] = React.useState(0);
   const [orderBy, setOrderBy] = React.useState('username');
   const [order, setOrder] = React.useState('asc');
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [selected, setSelected] = React.useState([]);

   const columns = ['ID', 'Username', 'Email', 'Role', 'Status', 'Regstration date'];
   const cells = ['_id', 'username', 'email', 'role', 'status', 'timestamp'];

   const isSelected = (id) => selected.indexOf(id) !== -1;

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = items.map((item) => item._id);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   const handleRequestSort = (property) => {
      const isAscending = (orderBy === property && order === 'asc');
      setOrderBy(property);
      setOrder(isAscending ? 'desc' : 'asc');
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

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRows = (event) => {
      setRowsPerPage(event.target.value);
   };

   React.useEffect(() => {
      getUsers(orderBy, order, page, rowsPerPage).then(data => {
         setItems(data.users);
         setItemsCount(data.count);
      });
   }, [orderBy, order, page, rowsPerPage]);

   return (
      <Container>
         <Paper sx={{
            mt: 3
         }}>
            <TableContainer>
               <Table>
                  <TableHeader
                     columns={columns}
                     orderBy={orderBy}
                     order={order}
                     handleRequestSort={handleRequestSort}
                     handleSelectAllClick={handleSelectAllClick}
                     selectedCount={selected.length}
                     rowsCount={items.length}
                  />

                  <TableBody>
                     {items.map((item, index) => {
                        const isItemSelected = isSelected(item._id);
                        const labelId = `items-table-checkbox-${index}`;

                        return (
                           <TableRow
                              key={`row-${item._id}`}
                              hover
                              onClick={(event) => handleItemClick(event, item._id)}
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
                                    <TableCell key={item[cell]} align="left">
                                       {cell === 'timestamp'
                                          ? new Date(item[cell]).toLocaleDateString()
                                          : item[cell]}
                                    </TableCell>
                                 );
                              })}
                           </TableRow>
                        );
                     })}
                  </TableBody>

                  <TableFooter>
                     <TableRow>

                        <TablePagination
                           rowsPerPageOptions={[5, 10, 15]}
                           count={itemsCount}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           onPageChange={handleChangePage}
                           onRowsPerPageChange={handleChangeRows}
                        />
                     </TableRow>
                  </TableFooter>
               </Table>
            </TableContainer>
         </Paper>
      </Container>
   );
};

export default Admin;