import { Container, InputAdornment, TextField } from "@mui/material";
import { SetStateAction, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarStyle from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
    if (event.keyCode === 13) {
      navigate(`/search?title=${searchTerm}`);
    }
  };

  return (
    <div className={SearchBarStyle["search-bar-container"]}>
      <h1>GPS Blog Builder</h1>
      <Container maxWidth="md" sx={{ mt: 0, paddingLeft: "2rem" }}>
        <TextField
          id="search"
          type="search"
          label="Search Blog By Title/Tag"
          value={searchTerm}
          onChange={handleChange}
          onKeyUp={handleChange}
          sx={{ width: "34rem" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </div>
  );
}
