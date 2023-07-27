import TableCell from '@mui/material/TableCell';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import classes from '../../styles/dashboard.module.css';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Box } from '@mui/material';
import colors from '../../constants/colors';

export default function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort,headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.mainTableHead}>
            <TableRow>
                {headCells.map((headCell ) => {
                    return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'left' : 'center'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                IconComponent={() => (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {orderBy !== headCell.id ?
                                            <>
                                                <ExpandLessIcon fontSize={'small'} htmlColor={colors.darkGray} />
                                                <ExpandMoreIcon fontSize={'small'} style={{ marginTop: -10 }} htmlColor={colors.darkGray}  />
                                            </>
                                            :
                                            <>
                                                {order === 'desc' ?
                                                    <ExpandLessIcon fontSize={'small'} htmlColor={colors.darkGray}  />
                                                    :
                                                    <ExpandMoreIcon fontSize={'small'} htmlColor={colors.darkGray}  />
                                                }
                                            </>
                                        }
                                    </div>
                                )}
                                style={{ justifyContent: 'space-between', width: '100%' }}
                            >
                                {headCell.label}

                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired
};