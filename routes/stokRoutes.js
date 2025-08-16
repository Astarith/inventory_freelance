const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia123';

// POST - Tambah Data Stok
router.post('/', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    let { nama_barang, stok_awal, stok_akhir, harga_barang } = req.body;

    if (!nama_barang || stok_awal == null || stok_akhir == null || harga_barang == null) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    stok_awal = parseInt(stok_awal);
    stok_akhir = parseInt(stok_akhir);
    harga_barang = parseFloat(harga_barang);

    const selisih = stok_akhir - stok_awal;
    let totalHargaKurang = 0;
    let totalHargaLebih = 0;

    if (selisih < 0) totalHargaKurang = Math.abs(selisih) * harga_barang;
    if (selisih > 0) totalHargaLebih = selisih * harga_barang;

    const query = `
      INSERT INTO stok_barang (nama_barang, stok_awal, stok_akhir, harga_barang, created_by)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nama_barang, stok_awal, stok_akhir, harga_barang, userId], (err) => {
      if (err) {
        console.error('Error DB:', err); // LOG ERROR
        return res.status(500).json({ message: 'Gagal menyimpan data', error: err });
      }

      res.json({
        message: `Berhasil menambahkan "${nama_barang}"`,
        totalHargaKurang,
        totalHargaLebih
      });
    });
  } catch (error) {
    console.error('Token Error:', error);
    res.status(401).json({ message: 'Token tidak valid', error });
  }
});

module.exports = router;
