import React, { useEffect, useState } from "react";
import axios from "axios";

function UserForm({ refresh, userToEdit, clearEdit }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setNombre(userToEdit.nombre);
      setEmail(userToEdit.email);
      setTelefono(userToEdit.telefono);
    } else {
      setNombre("");
      setEmail("");
      setTelefono("");
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userToEdit) {
      // 🔹 Actualizar usuario
      axios.put(`http://localhost:5001/api/usuarios/${userToEdit.id}`, {
        nombre,
        email,
        telefono
      })
      .then(() => {
        refresh();
        clearEdit();
      })
      .catch((err) => console.error(err));

    } else {
      // 🔹 Crear nuevo usuario
      axios.post("http://localhost:5001/api/usuarios", {
        nombre,
        email,
        telefono
      })
      .then(() => refresh())
      .catch((err) => console.error(err));
    }

    setNombre("");
    setEmail("");
    setTelefono("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{userToEdit ? "Editar Usuario" : "Nuevo Usuario"}</h3>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <button type="submit">{userToEdit ? "Actualizar" : "Agregar"}</button>
      {userToEdit && <button type="button" onClick={clearEdit}>Cancelar</button>}
    </form>
  );
}

export default UserForm;
