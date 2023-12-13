import { styled, useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Axios from "../middleware/axiosConfig"
import {
  Table,
  TableHead,
  TableFooter,
  TableRow,
  TablePagination,
  Box,
  IconButton,
  Paper,
  TableContainer,
  TableBody,
  TableCell,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import RestoreIcon from '@mui/icons-material/Restore';
import RestorePageIcon from "@mui/icons-material/RestorePage";
import PublicIcon from "@mui/icons-material/Public";
import moment from "moment";

const API_URL = "http://localhost:3000";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomizedTables() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    Axios.get(`${API_URL}/blog/`)
      .then((result) => setRows(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="dashboard-header">
        <Typography variant="h4" >
          Dashboard
        </Typography>
        <Link to={`/blog/create`} target="_blank" className="add-button">+ add</Link>
      </div>
      <Divider sx={{ marginBottom: "50px" }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Blog Title</StyledTableCell>
              <StyledTableCell align="left">Industry</StyledTableCell>
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="left">Approver</StyledTableCell>
              <StyledTableCell align="left">Date Created</StyledTableCell>
              <StyledTableCell align="left">Date Approved</StyledTableCell>
              <StyledTableCell align="left">Date Published</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.industry ? row.industry : "Software"}
                </StyledTableCell>
                <StyledTableCell align="left">{row.author_id}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.reviewer_user_id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {moment(row.created_at).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {moment(row.updated_at).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.published_at
                    ? moment(row.published_at).format("DD-MM-YYYY")
                    : "Not Published"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.statusMessage}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.actions?.map((action) => {
                    if (action === "Edit") {
                      return (
                        <>
                          <Link
                            to={`/blog/create/${row.blog_id}/versionId/${row.version_id}`}
                          >
                            <EditIcon titleAccess="edit" fontSize="medium" />
                          </Link>
                          &nbsp;
                        </>
                      );
                    } else if (action === "Edit Draft") {
                      return (
                        <>
                          <Link to={`/blog/create/${row.blog_id}`}>
                            <EditIcon
                              titleAccess="edit draft"
                              fontSize="medium"
                            />
                          </Link>
                          &nbsp;
                        </>
                      );
                    } else if (action === "Suggestions") {
                      return (
                        <>
                          <Link
                            to={`/blog/review/${row.version_id}`}
                            target="_blank"
                          >
                            <VisibilityIcon
                              titleAccess={action}
                              fontSize="medium"
                            />
                          </Link>
                          &nbsp;
                        </>
                      );
                    } else if (
                      action === "View in Kb" ||
                      action === "View in Web"
                    ) {
                      return (
                        <>
                          <Link to="#">
                            <PublicIcon
                              titleAccess="view on Kb"
                              fontSize="medium"
                            />
                          </Link>
                          &nbsp;
                        </>
                      );
                    } else if (action === "Review") {
                      return (
                        <>
                          <Link
                            to={`/blog/review/${row.version_id}`}
                            target="_blank"
                          >
                            View
                            {/* <EditIcon titleAccess="review" fontSize="medium" /> */}
                          </Link>
                          &nbsp;
                        </>
                      );
                    }
                  })}
                </StyledTableCell>
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                // colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
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
    </>
  );
}
