import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import CircularProgress from '@mui/material/CircularProgress';
import './MyRecipes.css';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function MyRecipe({ searchQuery }) {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setError('Utente non loggato.');
      setLoading(false);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const config = {
          withCredentials: true,
        };
    
        const response = await axios.get(
          `https://codebites-backend2.onrender.com/api/recipes/byLoggedUser/${user.id}`, 
          config
        );
        setRecipes(response.data);
      } catch (err) {
        console.error("Errore nella richiesta delle ricette:", err);
        const errorMsg = err.response?.data?.error || "Errore imprevisto nel caricamento delle ricette.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };    

    fetchRecipes();
  }, [user]);

  const handleDeleteRecipe = (recipeId) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="my-recipes">
      <h2>Le mie ricette</h2>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : filteredRecipes.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
              <RecipeCard data={recipe} onDelete={handleDeleteRecipe} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <p>Nessuna ricetta trovata.</p>
        </div>
      )}
    </div>
  );
}
