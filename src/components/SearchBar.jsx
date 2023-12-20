import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import React from "react";

function SearchBar({ searchText, setSearchText, onSearch }) {
  return (
    <>
      <Input
        onPressEnter={() => {
          onSearch(searchText);
        }}
        size="large"
        placeholder="Search blog by Title/Tag"
        suffix={
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={() => {
              onSearch(searchText);
            }}
          />
        }
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        allowClear
        className="search-input"
      />
    </>
  );
}

export default SearchBar;
