import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./userForm";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    axios.get("http://localhost:5001/api/usuarios")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      axios.delete(`http://localhost:5001/api/usuarios/${id}`)
        .then(() => fetchUsers())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Usuarios</h2>

      <UserForm 
        refresh={fetchUsers} 
        userToEdit={editingUser} 
        clearEdit={() => setEditingUser(null)} 
      />

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>
                <button onClick={() => setEditingUser(u)}>Editar</button>
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
