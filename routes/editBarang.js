const express = require('express');
const router = express.Router();
const db = require('../config/db'); // koneksi DB kamu

// Update barang berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_barang, stok_awal, stok_akhir, harga_barang } = req.body;

  const query = `
    UPDATE stok_barang 
    SET nama_barang = ?, stok_awal = ?, stok_akhir = ?, harga_barang = ?, updated_at = NOW()
    WHERE id = ?`;

  db.query(query, [nama_barang, stok_awal, stok_akhir, harga_barang, id], (err, result) => {
    if (err) {
      console.error('Error update barang:', err);
      return res.status(500).json({ message: 'Gagal update barang' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    res.json({ message: 'Barang berhasil diupdate' });
  });
});

module.exports = router;
