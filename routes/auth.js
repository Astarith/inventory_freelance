const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();
const SECRET_KEY = "rahasia123";

// ✅ Register
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert ke DB
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("❌ DB Error Register:", err); // tampil di Railway
          return res.status(500).json({ message: "Gagal register", error: err });
        }

        res.status(201).json({
          message: "Register berhasil",
          userId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("❌ Register Catch Error:", error); // tampil di Railway
    next(error); // lempar ke error handler global
  }
});

// ✅ Login
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("❌ DB Error Login:", err);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "User tidak ditemukan" });
      }

      try {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ message: "Password salah" });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.json({ message: "Login berhasil", token });
      } catch (error) {
        console.error("❌ Login Catch Error:", error);
        next(error);
      }
    }
  );
});

module.exports = router;
