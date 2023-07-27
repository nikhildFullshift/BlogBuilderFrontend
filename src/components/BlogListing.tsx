import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

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
];

export default function CustomizedTables() {
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
          {rows.map((row) => (
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}