import { Container, InputAdornment, TextField } from "@mui/material";
import { SetStateAction, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarStyle from './SearchBar.module.css'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={SearchBarStyle['search-bar-container']}>
      <h1>GPS Blog Builder</h1>
      <Container maxWidth="md" sx={{ mt: 0 }}>
        <TextField
          id="search"
          type="search"
          label="Search Blog By Title/Tag"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: 600 }}
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

