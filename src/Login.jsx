import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // Estados para capturar lo que el usuario escribe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@ejemplo.com" && password === "1234") {
      // En lugar de un alert, navegamos al Dashboard
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="****"
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
