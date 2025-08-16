const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',       // ganti sesuai hosting/VPS kamu
  user: 'root',            // username MySQL
  password: '',            // password MySQL
  database: 'inventory_db' // nama database
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal:', err);
  } else {
    console.log('Koneksi database berhasil.');
  }
});

module.exports = db;
