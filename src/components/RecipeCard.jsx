import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./RecipeCard.css";

export default function RecipeCard({ data, onDelete }) {
  const { isLoggedIn, user } = useAuth();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      const authorMatch = user.username === data.author.username;
      setIsAuthor(authorMatch);
    }
  }, [isLoggedIn, user, data.author.username]);

  const truncateDescription = (description, maxLength = 67) => {
    const truncated =
      description.length > maxLength
        ? description.substring(0, maxLength) + "..."
        : description;
    return truncated;
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Sei sicuro di voler eliminare questa ricetta?");
    if (!isConfirmed) return;
    
    try {
      await axios.delete(
        `https://codebites-backend2.onrender.com/api/recipes/${data._id}`,
        { withCredentials: true }
      );
      onDelete(data._id);
    } catch (err) {
      console.error("Errore nell'eliminazione:", err);
    }
  };

  return (
    <Card className="recipe-card" key={data._id}>
      <Link to={`/recipe/${data._id}`} className="recipe-link">
        <CardMedia component="img" height="200" image={data.imgSrc} alt={data.title} />
        <CardContent className="recipe-content">
          <h3 className="recipe-title">{data.title}</h3>
          <p className="recipe-description">
            <strong>Descrizione:</strong> {truncateDescription(data.description)}
          </p>
          <p className="recipe-author">
            <strong>Autore:</strong> {data.author.username}
          </p>
        </CardContent>
      </Link>

      {isAuthor && (
        <div className="delete-button">
          <button onClick={handleDelete} className="delete-icon">
            <DeleteIcon className="delete-icon-svg" />
          </button>
        </div>
      )}
    </Card>
  );
}
