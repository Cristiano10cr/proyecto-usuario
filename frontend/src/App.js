import React, { useState } from "react";
import UserList from "./components/userList";
import Login from "./components/login";

// IMPORTAMOS LA TIENDA QUE TE PREPARÉ
import ProductGrid from "./components/tienda/ProductGrid";
import "./components/tienda/stylesTienda.css";

function App() {
  const [user, setUser] = useState(null);

  // si no está logueado → mostrar login
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      
      {/* ENCABEZADO */}
      <h1>Bienvenido, {user.nombre}</h1>
      <p>Rol: {user.role}</p>

      {/* BOTÓN LOGOUT */}
      <button 
        onClick={() => setUser(null)} 
        style={{
          padding: "8px 14px",
          border: "none",
          background: "#222",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Cerrar sesión
      </button>

      {/* SECCIÓN ADMIN: MOSTRAR CRUD DE USUARIOS */}
      {user.role === "admin" && (
        <div style={{ margin: "20px auto", maxWidth: "900px" }}>
          <h2>Gestión de Usuarios</h2>
          <UserList />
        </div>
      )}

      {/* SECCIÓN TIENDA (VISIBLE PARA TODOS LOS USUARIOS AUTENTICADOS) */}
      <div style={{ marginTop: "40px" }}>
        <ProductGrid />
      </div>
    </div>
  );
}

export default App;

