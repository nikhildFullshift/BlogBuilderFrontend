import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "8rem",
    [theme.breakpoints.up("sm")]: {
      width: "7rem",
      "&:focus": {
        width: "7rem",
      },
    },
  },
}));

export default function SearchBarAligned(props: any) {
  return (
    <Box sx={{ flexGrow: 1, margin: "20px auto" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f2f3f5", color: "black" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            GPS Blog Builder
          </Typography>
          <Search sx={{ flex: 1, border: "1px solid" }}>
            <Link to={`/search?title=${props.searchTerm}`}>
              <IconButton sx={{ marginLeft: "15px" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </IconButton>
            </Link>
            <StyledInputBase
              sx={{ width: "8 rem" }}
              onChange={props.handleSearchTerm}
              onKeyUp={props.handleSearchTerm}
              value={props.searchTerm}
              defaultValue=""
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
