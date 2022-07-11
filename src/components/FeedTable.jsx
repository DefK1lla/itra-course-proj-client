import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';


const FeedTable = ({ items }) => {
   const columns = [
      'ID', 
      'feed-page.items-table-title', 
      'feed-page.items-table-collection', 
      'feed-page.items-table-user', 
      'feed-page.items-table-timestamp'
   ];

   return (
      <TableContainer
         component={Paper}
      >
         <Table>
            <TableHead>
               <TableRow>
                  {columns.map(column => (
                        <TableCell
                           key={column}
                        >
                           <FormattedMessage id={column} />
                        </TableCell>
                     ))
                  }
               </TableRow>
            </TableHead>

            <TableBody>
               {items.map(item => {
                     return (
                        <TableRow
                           key={item._id}
                        >
                           <TableCell>
                              {item._id}
                           </TableCell>

                           <TableCell>
                              <Link
                                 component={RouterLink}
                                 to={`/item/${item._id}`}
                              >
                                 {item.title}
                              </Link>
                           </TableCell>

                           <TableCell>
                              <Link
                                 component={RouterLink}
                                 to={`/collection/${item.collectionRef._id}`}
                              >
                                 {item.collectionRef.title}
                              </Link>
                           </TableCell>

                           <TableCell>
                              <Link
                                 component={RouterLink}
                                 to={`/user/${item.userRef._id}`}
                              >
                                 {item.userRef.username}
                              </Link>
                           </TableCell>

                           <TableCell>
                              {new Date(item.timestamp).toLocaleString()}
                           </TableCell>
                        </TableRow>
                     );
                  })
               }   
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default FeedTable;