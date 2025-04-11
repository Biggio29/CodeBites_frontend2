import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Tentativo di registrazione con username:", username);

    if (!username || !password) {
      setError('Tutti i campi sono obbligatori!');
      console.log("Errore: campi obbligatori non compilati.");
      return;
    }

    try {
      console.log("Invio richiesta al backend per la registrazione...");

      const response = await axios.post(
        'https://codebites-backend2.onrender.com/api/users/register',
        {
          username,
          password,
        }
      );

      console.log('Risposta del backend:', response.data);

      if (response.status === 201) {
        setSuccess('Registrazione riuscita! Verrai reindirizzato alla pagina di login.');
        setError('');
        console.log("Registrazione riuscita, reindirizzando a /profile...");

        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      } else {
        setError(response.data.error || 'Errore durante la registrazione');
        console.log("Errore durante la registrazione:", response.data.error);
      }
    } catch (err) {
      console.error('Errore nella connessione', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        console.log("Errore di backend:", err.response.data.error);
      } else {
        setError('Errore nella connessione al server');
        console.log("Errore di rete:", err);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Registrazione</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nome utente</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit">Registrati</button>
        <p>
          Hai già un account?{' '}
          <span className="register-link" onClick={() => navigate('/profile')}>
            Accedi
          </span>
        </p>
      </form>
    </div>
  );
}
