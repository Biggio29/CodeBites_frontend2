import { useState } from "react";
import { TextField } from "@mui/material";
import "./SearchBar.css";

export default function SearchBar ({ onSearch = () => {} }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <TextField
      className="search-bar"
      variant="outlined"
      placeholder="Cerca ricette..."
      value={query}
      onChange={handleSearch}
      size="small"
    />
  );
}
