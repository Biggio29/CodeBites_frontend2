import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Recipe.css';

export default function Recipe() {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            console.log("Recupero ricetta con ID:", id);

            try {
                const response = await axios.get(`https://codebites-backend2.onrender.com/api/recipes/${id}`);
                console.log("Ricetta recuperata con successo:", response.data);
                setRecipe(response.data);
            } catch (error) {
                console.error('Errore nel recupero della ricetta:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        console.log("Caricamento in corso...");
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-page">
            <h1>{recipe.title}</h1>
            <img src={recipe.imgSrc} alt={recipe.title} className="recipe-img" />
    
            <div>
                <h2>Descrizione</h2>
                <p>{recipe.description}</p>
            </div>
    
            <div>
                <h2>Autore</h2>
                <p>{recipe.author.username}</p>
            </div>
    
            <div>
                <h2>Ingredienti</h2>
                {recipe.ingredients ? (
                    <div className="ingredients-list">
                        {recipe.ingredients
                            .split(/[,;\n]/)
                            .map(ingredient => ingredient.trim())
                            .filter(ingredient => ingredient !== '')
                            .map((ingredient, index) => (
                                <div className="ingredient" key={index}>
                                    {ingredient}
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <p>Ingredienti non disponibili o non formattati correttamente</p>
                )}
            </div>
    
            <div>
                <h2>Procedimento</h2>
                {recipe.instructions ? (
                    <div className="procedure-list">
                        {recipe.instructions
                            .split(/[.;\n]/)
                            .map((step, index) => step.trim())
                            .filter(step => step !== '')
                            .map((step, index) => (
                                <div className="step" key={index}>
                                    <strong>{index + 1})</strong> {step}
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <p>Procedimento non disponibile o non formattato correttamente</p>
                )}
            </div>
        </div>
    );
}
