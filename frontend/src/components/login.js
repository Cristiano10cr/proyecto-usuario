import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:5001/api/auth/login", { email, password })
      .then((res) => {
        onLogin(res.data.user); // enviamos usuario al App
      })
      .catch((err) => {
        setError("Credenciales incorrectas o usuario no encontrado");
      });
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;