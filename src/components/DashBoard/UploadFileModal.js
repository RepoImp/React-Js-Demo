import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, InputBase, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Select from 'react-select';
import classes from '../../styles/dashboard.module.css';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import appConstant from '../../constants/appConstant';
import colors from '../../constants/colors';

const platforms = [
    {
        label: "TEST/Inbound",
        value: "TEST/Inbound",
    },
    {
        label: "PROD/Inbound",
        value: "PROD/Inbound",
    }
]

const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor:  colors.white,
            color: colors.black,
            width: '100%',
            height: '46px',
            border: 'none',
            borderRadius: '10px',
            paddingLeft: '4px'
        };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? colors.white :  colors.white,
            color: colors.black,
            width: '100%',
            height: '46px',
            marginBottom: '3px'
        };
    },
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: '10px',
        position: 'relative',
        backgroundColor: colors.white,
        color: 'black',
        fontSize: 16,
        padding: '12px 14px',
        '&:focus': {
            border: '1px solid #007bff',
        },
    },
}));

const UploadFileModal = (props) => {
    const { handleClose, isLoading, onUploadHandler, file, onFileChange, isValidFile, inputpdfFile, isCheckValid, customers } = props;
    const [customer, setCustomer] = useState(null);
    const [remark, setRemark] = useState('');
    const [customerList, setCustomerList] = useState([]);
    const [ftpDestinationPath, setFtpDestinationPath] = useState(null);

    React.useEffect(() => {
        let data = customers?.slice().sort((a, b) => {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB)
                return -1;
        });
        setCustomerList(data);
    }, [customers]);

    const isValidCustomer = isCheckValid && customer === null;
    const isValidPath = isCheckValid && ftpDestinationPath === null;
    let options = customerList?.map(function (item) {
        return {
            label: item.name,
            value: item._id,
        };
    });

    return (
        <>
            <div className={classes.uploadDiv}>
                <Typography className={classes.uploadText}>
                    {appConstant.uploadFile}
                </Typography>
                <div onClick={() => handleClose(setCustomer, setRemark, setFtpDestinationPath)} style={{ cursor: 'pointer' }}>
                    <CloseRoundedIcon fontSize='medium' style={{ color: colors.white }} />
                </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
                <Typography className={classes.labelText} >
                   {appConstant.customers}
                </Typography>
                <Select
                    placeholder='Select Customer'
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    onChange={(val) => setCustomer(val)}
                    value={customer}
                    options={options}
                    styles={colourStyles}
                />
                {isValidCustomer && (
                    <div className={classes.helperText}>
                        {appConstant.selectCustomer}
                    </div>
                )}
                <Typography className={classes.labelText} >
                    {appConstant.file}
                </Typography>
                <div className={classes.dashboardFormInput} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '75%' }}>
                        {file?.name ?
                            <Typography className={classes.filetext} style={{ color: colors.black }} >
                                {file?.name}
                            </Typography>
                            :
                            <Typography className={classes.filetext} style={{ color: colors.lightGray2 }} >
                                {appConstant.selectFile}
                            </Typography>
                        }
                        <input type="file" accept={".csv"} name="upload" id="upload-photo" onChange={(e) => onFileChange(e)} style={{ display: 'none' }} onClick={(event) => {
                            event.target.value = null
                        }} />
                    </div>
                    <label htmlFor="upload-photo" style={{
                        backgroundColor: colors.blue,
                        fontSize: '15px',
                        borderRadius: '0px 5px 5px 0px',
                        width: '22%',
                        display: 'flex',
                        color: colors.white,
                        padding: '10px',
                        height: '100%',
                        textTransform: 'capitalize',
                        alignItems: 'center',
                        marginTop: '8px',
                        cursor: 'pointer'
                    }}>{appConstant.browse}</label>
                </div>
                {isValidFile && (
                    <div className={classes.helperText}>
                        {appConstant.chooseFile}
                    </div>
                )}
                <Typography className={classes.labelText} >
                    {appConstant.remark}
                </Typography>
                <BootstrapInput
                    id="bootstrap-input"
                    style={{ width: '100%', color: remark ? colors.black : colors.lightGray2 }}
                    placeholder='Enter Remark'
                    onChange={(e) => setRemark(e.target.value)}
                    value={remark}
                />
                <Typography className={classes.labelText} >
                    {appConstant.gmtPath}
                </Typography>
                <Select
                    placeholder='Select GMT Path'
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    onChange={(val) => setFtpDestinationPath(val)}
                    value={ftpDestinationPath}
                    options={platforms}
                    styles={colourStyles}
                />
                {isValidPath && (
                    <div className={classes.helperText}>
                        {appConstant.selectGmtPath}
                    </div>
                )}
                <LoadingButton
                    onClick={() => onUploadHandler(customer, setCustomer, remark, setRemark, ftpDestinationPath, setFtpDestinationPath)}
                    loading={isLoading}
                    loadingPosition="end"
                    loadingIndicator={<CircularProgress color='inherit' size={20} />}
                    variant="contained"
                    disabled={isLoading ? true : false}
                    style={{
                        backgroundColor: colors.blue,
                        fontSize: '20px',
                        textTransform: 'capitalize',
                        borderRadius: '10px',
                        width: '100%',
                        color: colors.white,
                        marginTop: '3rem',
                        padding: '10px',
                        fontWeight: '600',
                    }}
                >
                    {appConstant.upload}
                </LoadingButton>
            </div>
        </>
    )
}

export default UploadFileModal;