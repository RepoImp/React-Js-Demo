import React, { useEffect } from 'react';
import classes from '../../styles/dashboard.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import EnhancedTableHead from '../EnhancedTableHead';
import { Box, Tooltip } from '@mui/material';
import { createGmtTableListData } from '../../constants/CreateTableListsData';
import Info from '../../assets/Images/info.png';
import { toast } from 'react-toastify';
import { getComparator, stableSort } from '../../constants/MuiTableHelper';
import { downloadFile } from '../../util/fetch';
import appConstant from '../../constants/appConstant';
import colors from '../../constants/colors';
var FileSaver = require('file-saver');

let rows = [];

const headCells = [
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'customer',
        numeric: false,
        disablePadding: false,
        label: 'Customer',
    },
    {
        id: 'gmtfile',
        numeric: false,
        disablePadding: false,
        label: 'GMT File',
    },
    {
        id: 'user',
        numeric: false,
        disablePadding: false,
        label: 'Upload By',
    },
    {
        id: 'remark',
        numeric: false,
        disablePadding: false,
        label: 'Remark',
    },
    {
        id: 'bucketStatus',
        numeric: false,
        disablePadding: false,
        label: 'GMT Status',
    },
    {
        id: 'ftpDestinationPath',
        numeric: false,
        disablePadding: false,
        label: 'GMT Path',
    },
];

const DisplayTable = (props) => {

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
        let user = `${item?.user?.firstName}${" "}${item?.user?.lastName}`;
        let createdAt = `${moment(item.createdAt).format("DD/MM/YYYY")},${" "}${moment(item.createdAt).format("hh:mm A")}`;
        rows.push(
            createGmtTableListData(
                item._id,
                user,
                item.bucketStatus,
                item.bucketUrl,
                item.ftpUrl,
                createdAt,
                item.customer.name,
                item.remark,
                item.bucketFailedReson,
                item.ftpDestinationPath
            )
        );
    });

    const fileSaver = (data) => {
        var file = new File([data], "download.csv", { type: "data:text/csv;charset=utf-8" });
        FileSaver.saveAs(file);
    }

    const downloadGmtFileHandler = async (id) => {
        const data = await downloadFile(id);
        if (data?.status === 200) {
            if (data?.data.status) {
                toast.error(`${data?.data.message}`);
            } else {
                toast.success(`${'Download successfully!'}`);
                fileSaver(data.data);
            }
        }
        else {
            toast.error(`${data?.data.message}`);
        }
    }

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
                                        >{row?.createdAt}
                                        </TableCell>
                                        <TableCell align="left" width={'18%'}>
                                            {" "}
                                            {row?.customer}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            style={{ width: '15%', color: colors.blue, cursor: 'pointer' }}
                                            onClick={() => downloadGmtFileHandler(row._id)}
                                        >
                                            {appConstant.view}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row.user}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.remark}
                                        </TableCell>
                                        <TableCell align="left" style={{ width: '30%' }}>
                                            {row?.bucketStatus === "success" ?
                                                <div className={classes.uploadbtn}>
                                                    <div className={classes.dot} />
                                                    {appConstant.uploaded}
                                                </div>
                                                :
                                                <Tooltip title={row?.bucketFailedReson}>
                                                    <div className={classes.uploadFailedbtn}>
                                                        <div className={classes.dot} style={{ background: row?.bucketStatus === "success" ? colors.green :colors.red }} />
                                                        {appConstant.failed}
                                                        <img className={classes.infoIcon} src={Info} alt="" />
                                                    </div>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.ftpDestinationPath}
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

export default DisplayTable