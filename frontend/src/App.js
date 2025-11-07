import React, { useState } from "react";
import UserList from "./components/userList";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Bienvenido, {user.nombre} </h1>
      <p>Rol: {user.role}</p>
      <button onClick={() => setUser(null)}>Cerrar sesión</button>
      <UserList />
    </div>
  );
}

export default App;
