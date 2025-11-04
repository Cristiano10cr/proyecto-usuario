const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 🔹 LISTAR todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios', details: err });
    res.json(results);
  });
});

// 🔹 OBTENER un usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuario', details: err });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
});

// 🔹 CREAR un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email)
    return res.status(400).json({ error: 'Nombre y email son obligatorios' });

  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear usuario', details: err });
    res.status(201).json({ id: result.insertId, nombre, email, telefono });
  });
});

// 🔹 ACTUALIZAR un usuario existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario', details: err });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// 🔹 ELIMINAR usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario', details: err });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;