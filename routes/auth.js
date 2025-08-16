const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();
const SECRET_KEY = 'rahasia123';

// ✅ Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Gagal register', error: err });
        }
        res.status(201).json({ message: 'Register berhasil' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
});

// ✅ Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Terjadi kesalahan server' });
      if (results.length === 0) return res.status(401).json({ message: 'User tidak ditemukan' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(401).json({ message: 'Password salah' });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1d' }
      );

      res.json({ message: 'Login berhasil', token });
    }
  );
});

module.exports = router;
