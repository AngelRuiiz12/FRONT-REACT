import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Nuestra instancia de Axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Llamamos a la ruta de tu api.php
      const respuesta = await api.post('/admin/login', {
        email: email,
        password: password
      });

      // Si Laravel usa Sanctum, te devolverá un token
      if (respuesta.data.token) {
        localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('role', 'admin'); // Guardamos el rol para las rutas
        
        console.log("¡Login de Admin exitoso!");
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error("Error al conectar con Laravel/Supabase:", error.response?.data);
      alert(error.response?.data?.message || "Error en el login");
    }
  };

  return (
    <div style={{ padding: '50px', color: 'white' }}>
      <h2>Login Administrativo (Supabase)</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email de Admin" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Entrar como Admin
        </button>
      </form>
    </div>
  );
};

export default Login;