const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 🔐 LOGIN de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Debe ingresar correo y contraseña' });

  const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al validar usuario', details: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Simulamos roles
    const user = results[0];
    const role = email === 'admin@email.com' ? 'admin' : 'usuario';

    res.json({
      message: 'Inicio de sesión exitoso',
      user: { id: user.id, nombre: user.nombre, email: user.email, role }
    });
  });
});

module.exports = router;