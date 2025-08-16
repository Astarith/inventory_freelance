const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET semua barang
router.get('/', (req, res) => {
  const sql = `
    SELECT sb.id, sb.nama_barang, sb.stok_awal, sb.stok_akhir, sb.harga_barang,
           sb.created_by, sb.created_at, sb.updated_at, u.username
    FROM stok_barang sb
    LEFT JOIN users u ON sb.created_by = u.id
    ORDER BY sb.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal mengambil data', error: err });
    }
    res.json(results);
  });
});

module.exports = router;
