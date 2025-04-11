import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = async () => {
    console.log("Controllo stato di login...");

    try {
      const response = await axios.get("https://codebites-backend2.onrender.com/api/users/checkLogin", {
        withCredentials: true,
      });

      console.log("Risposta dal server:", response.data);

      if (response.data.user) {
        console.log("Utente autenticato:", response.data.user);
        setIsLoggedIn(true);
        setUser(response.data.user);
      } else {
        console.log("Utente non autenticato");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Errore nel controllo del login:", error);
      setIsLoggedIn(false);
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const login = (user) => {
    console.log("Login eseguito per:", user.username);
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    console.log("Logout eseguito.");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
