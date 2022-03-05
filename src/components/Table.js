import { TableFooter, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from '../constants/string';

export default function CustomTable(props) {

    const { title, data, total, columns, handleChangePageSize, pagination } = props
    const [page, setPage] = React.useState(DEFAULT_PAGE_INDEX);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_PAGE_SIZE);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (handleChangePageSize) {
            handleChangePageSize(newPage, rowsPerPage)
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        if (handleChangePageSize) {
            handleChangePageSize(page, event.target.value)
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {title}
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!!(data && data.length > 0) && data?.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.render
                                                    ? column.render(value)
                                                    : column.action ? column.action(row._id) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <TablePagination
                    rowsPerPageOptions={[DEFAULT_PAGE_SIZE, 25, 100]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
}
