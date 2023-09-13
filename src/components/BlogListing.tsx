import { styled, useTheme } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableHead, TableFooter, TableRow, TablePagination, Box, IconButton, Paper, TableContainer, TableBody, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  title: string,
  industry: string,
  author: string,
  approver: string,
  dateCreated: string,
  dateApproved: string,
  datePublished: string,
  status: string,
) {
  return {
    title,
    industry,
    author,
    approver,
    dateCreated,
    dateApproved,
    datePublished,
    status
  };
}

const rows = [
  createData('Blog Title 1', 'Industry 1', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Draft'),
  createData('Blog Title 2', 'Industry 2', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Pending for Approval'),
  createData('Blog Title 3', 'Industry 3', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Published to KB'),
  createData('Blog Title 4', 'Industry 4', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Published to Web'),
  createData('Blog Title 5', 'Industry 5', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Deleted'),
  createData('Blog Title 6', 'Industry 6', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Deleted'),
  createData('Blog Title 7', 'Industry 7', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Deleted'),
  createData('Blog Title 8', 'Industry 8', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Deleted'),
  createData('Blog Title 9', 'Industry 9', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Deleted'),
  createData('Blog Title 10', 'Industry 10', 'author 1', 'approver 1', new Date().toDateString(), new Date().toDateString(), new Date().toDateString(), 'Deleted'),
];

export default function CustomizedTables() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Blog Title</StyledTableCell>
            <StyledTableCell align="right">Industry</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Approver</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Date Approved</StyledTableCell>
            <StyledTableCell align="right">Date Published</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.industry}</StyledTableCell>
              <StyledTableCell align="right">{row.author}</StyledTableCell>
              <StyledTableCell align="right">{row.approver}</StyledTableCell>
              <StyledTableCell align="right">{row.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{row.dateApproved}</StyledTableCell>
              <StyledTableCell align="right">{row.datePublished}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right"><Link to='#'>Edit | Delete</Link></StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              // colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}