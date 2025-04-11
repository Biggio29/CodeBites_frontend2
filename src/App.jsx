import React, { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import NewRecipe from './pages/NewRecipe';
import Recipe from './pages/Recipe';
import { AuthProvider } from './contexts/AuthContext';
import './App.css'; 

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
    <AuthProvider>
      <TopBar onSearch={handleSearch} />
      <div className="content">
        <AnimatedRoutes searchQuery={searchQuery} />
      </div>
    </AuthProvider>
  );
}

function AnimatedRoutes({ searchQuery }) {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={500}
        nodeRef={nodeRef} 
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-recipes" element={<MyRecipes searchQuery={searchQuery} />} />
            <Route path="/new-recipe" element={<NewRecipe />} />
            <Route path="/recipe/:id" element={<Recipe />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
