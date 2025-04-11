import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import "./TopBar.css";

export default function TopBar ({ onSearch }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <button onClick={() => {
          navigate("/");
        }} className="home-btn">
          <HomeIcon fontSize="small" />
        </button>

        {isLoggedIn && (
          <button onClick={() => {
            navigate("/new-recipe");
          }} className="add-recipe-btn">
            <AddIcon fontSize="small" />
          </button>
        )}

        <img src="t-logo.png" alt="LOGO" className="img-logo" />

      </div>

      <div className="search-bar-container">
        <SearchBar onSearch={(query) => {
          onSearch(query);
        }} />
      </div>

      <div className="topbar-right">
        {isLoggedIn && (
          <button onClick={() => {
            navigate("/my-recipes");
          }} className="my-recipes-btn">
            Le mie ricette
          </button>
        )}

        <button onClick={() => {
          navigate("/profile");
        }} className="profile-btn">
          <PersonIcon fontSize="small" />
        </button>
      </div>
    </nav>
  );
}