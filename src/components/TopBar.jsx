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

  console.log('Stato di login:', isLoggedIn);

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <button onClick={() => {
          console.log('Navigazione alla homepage');
          navigate("/");
        }} className="home-btn">
          <HomeIcon fontSize="small" />
        </button>

        {isLoggedIn && (
          <button onClick={() => {
            console.log('Navigazione alla pagina di aggiunta ricetta');
            navigate("/new-recipe");
          }} className="add-recipe-btn">
            <AddIcon fontSize="small" />
          </button>
        )}

        <img src="t-logo.png" alt="LOGO" className="img-logo" />

      </div>

      <div className="search-bar-container">
        <SearchBar onSearch={(query) => {
          console.log('Ricerca effettuata con query:', query);
          onSearch(query);
        }} />
      </div>

      <div className="topbar-right">
        {isLoggedIn && (
          <button onClick={() => {
            console.log('Navigazione alle ricette dell\'utente');
            navigate("/my-recipes");
          }} className="my-recipes-btn">
            Le mie ricette
          </button>
        )}

        <button onClick={() => {
          console.log('Navigazione al profilo');
          navigate("/profile");
        }} className="profile-btn">
          <PersonIcon fontSize="small" />
        </button>
      </div>
    </nav>
  );
}
