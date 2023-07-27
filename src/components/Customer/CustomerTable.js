import React from 'react';
import classes from '../../styles/dashboard.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead from '../common/EnhancedTableHead';
import { createCustomerTableListData } from '../../constants/CreateTableListsData';
import { getComparator, stableSort } from '../../constants/MuiTableHelper';

let rows = [];

const headCells = [
    {
        id: 'companyId',
        numeric: true,
        disablePadding: false,
        label: 'Company ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'contactName',
        numeric: false,
        disablePadding: false,
        label: 'Contact Name',
    },
    {
        id: 'contactNumber',
        numeric: false,
        disablePadding: false,
        label: 'Contact Number',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
];

const DisplayCustomerTable = (props) => {

    const { data, isFetching } = props;
    const [dense] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    rows = [];
    data?.map((item) => {
        rows.push(
            createCustomerTableListData(
                item._id,
                item.name,
                item.btCompanyId,
                item.primaryContactName,
                item.primaryContactPhone,
                item.phone,
                item.email,
            )
        );
    });

    return (
        <>
            <TableContainer className={classes.tableContainer}>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row._id}
                                        className={classes.maintd}
                                    >
                                        <TableCell
                                            width={'20%'}
                                            // style={{ paddingLeft: '3rem' }}
                                        >{row?.companyId}
                                        </TableCell>
                                        <TableCell align="left" width={'18%'}>
                                            {" "}
                                            {row?.name}
                                        </TableCell>
                                        <TableCell
                                            align="left" width={'15%'}
                                        >
                                            {""}
                                            {row?.contactName}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.contactNumber}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.phone}
                                        </TableCell>
                                        <TableCell align="left" style={{ width: '30%' }}>
                                            {""}
                                            {row?.email}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DisplayCustomerTable;