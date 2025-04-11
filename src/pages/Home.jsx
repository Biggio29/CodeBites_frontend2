import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { io } from "socket.io-client";
import "./Home.css";

const socket = io("https://codebites-backend2.onrender.com");

export default function Home({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {

    const fetchRecipes = async () => {
      console.log("Tentativo di recupero ricette...");
      try {
        const response = await axios.get("https://codebites-backend2.onrender.com/api/recipes/all");
        console.log("Ricette recuperate con successo:", response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error("Errore nel recupero delle ricette:", error);
      }
    };

    fetchRecipes();

    socket.on("recipesUpdated", fetchRecipes);

    return () => {
      socket.off("recipesUpdated", fetchRecipes);
    };
  }, []);

  const filteredRecipes = recipes.filter(({ title, description }) =>
    (title && title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (description && description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="home">
      <div className="recipes-container">
        <Grid container spacing={2} justifyContent="center">
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
              <RecipeCard
                data={recipe}
                onDelete={(id) => {
                  console.log("Ricetta eliminata:", id);
                  setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
