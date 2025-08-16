const express = require('express');
const router = express.Router();
const db = require('../config/db'); // mysql2 biasa, bukan promise

// DELETE barang berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM stok_barang WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menghapus barang", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Barang tidak ditemukan" });

    res.json({ message: "Barang berhasil dihapus" });
  });
});

module.exports = router;
