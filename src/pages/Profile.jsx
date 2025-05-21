import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Profile.css';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [isLoggedIn, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await axios.post(
            'https://codebites-backend2.onrender.com/api/users/login',
            { username, password },
            { withCredentials: true }
        );

        if (response.status === 200 && response.data.user) {
            const user = response.data.user;

            login(user);

            setLoading(false);
            navigate('/');
        } else {
            console.error('Login fallito, utente non trovato.');
            throw new Error('Login fallito, utente non trovato.');
        }
    } catch (err) {
        console.error('Errore nel login:', err);
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
        } else {
            setError('Errore nel login: ' + (err.message || 'Unknown error'));
        }
        setLoading(false);
    }
};

const handleLogout = async () => {
  try {
    const response = await axios.post(
      'https://codebites-backend2.onrender.com/api/users/logout',
      {},
      { withCredentials: true }
    );
    if (response.data.message === 'Logout avvenuto con successo') {
      Cookies.remove('token');
    
      setLoading(true);

      setTimeout(() => {
        logout();
        setLoading(false);
        navigate('/');
      }, 2000);
    }
  } catch (err) {
    console.error('Errore nel logout:', err);
  }
};


  return (
    <div className="profile">
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : !isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
          <p>Non sei registrato? <span className="register-link" onClick={() => navigate('/register')}>Iscriviti Adesso</span></p>
        </form>
      ) : (
        <div>
          <h2 className="welcome-message">Benvenuto, {user.username}!</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
