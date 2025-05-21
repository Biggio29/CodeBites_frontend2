import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewRecipe.css";

export default function NewRecipe({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description || !ingredients || !instructions || !imgSrc) {
      setErrorMessage("Tutti i campi sono obbligatori.");
      return;
    }
  
    const newRecipe = { title, description, ingredients, instructions, imgSrc };
  
    try {
      const response = await axios.post(
        "https://codebites-backend2.onrender.com/api/recipes/addRecipe",
        newRecipe,
        { withCredentials: true }
      );
    
      onAddRecipe?.(response.data);
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImgSrc("");
      setErrorMessage("");
    
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.error || "Errore imprevisto. Riprova più tardi.";
      setErrorMessage(message);
      console.error("Errore nell'aggiunta della ricetta:", error);
    }
  };

  return (
    <div className="new-recipe-form">
      <h2>AGGIUNGI UNA NUOVA RICETTA</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titolo (max 45 caratteri)..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={45}
        />

        <textarea
          placeholder="Descrizione..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          placeholder="Ingredienti (separali con ',' o ';' )... "
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Procedimento (separa con ';' o '.')..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL immagine..."
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Aggiungi Ricetta</button>
      </form>
    </div>
  );
}
