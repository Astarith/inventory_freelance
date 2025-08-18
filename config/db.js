const mysql = require('mysql2');
require('dotenv').config(); // biar bisa baca file .env

const db = mysql.createConnection({
  host: process.env.DB_HOST,       // host dari Railway
  user: process.env.DB_USER,       // user MySQL
  password: process.env.DB_PASSWORD, // password MySQL
  database: process.env.DB_NAME,   // nama database
  port: process.env.DB_PORT        // port MySQL
});

db.connect((err) => {
  if (err) {
    console.error('❌ Koneksi database gagal:', err.message);
  } else {
    console.log('✅ Koneksi database berhasil.');
  }
});

module.exports = db;
