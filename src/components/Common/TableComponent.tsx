import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Typography,
   TablePagination,
} from "@mui/material";
import { useState } from "react";

export const TableComponent = ({ data, label }) => {
   const [page, setPage] = useState(0);
   const rowsPerPage = 5;
   const items = Object.values(data);

   if (!Array.isArray(items)) return null;
   const keys = Object.keys(items[0] || {});

   const handleChangePage = (_event, newPage) => {
      setPage(newPage);
   };

   const paginatedItems = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

   return (
      <TableContainer component={Paper} sx={{ my: 2 }}>
         <Typography variant="h6" sx={{ p: 2 }}>
            {label}
         </Typography>
         <Table size="small">
            <TableHead>
               <TableRow>
                  {keys.map((key) => (
                     <TableCell key={key}>{key}</TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {paginatedItems.map((item, idx) => (
                  <TableRow key={idx}>
                     {keys.map((key) => (
                        <TableCell key={key}>{item[key]}</TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         {items.length > rowsPerPage && (
            <TablePagination
               component="div"
               count={items.length}
               page={page}
               onPageChange={handleChangePage}
               rowsPerPage={rowsPerPage}
               rowsPerPageOptions={[]}
               labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
            />
         )}
      </TableContainer>
   );
};
