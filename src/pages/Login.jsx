import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // Estados para capturar lo que el usuario escribe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulando respuesta del servidor
    const userSimulado = {
      email: email,
      rol: email === "admin@teatro.com" ? "admin" : "alumno",
    };

    // Dirigimos al usuario al perfil de alumno o de admin
    if (userSimulado.rol === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/alumno/perfil");
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
