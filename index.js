const express = require('express');
const cors = require('cors');
const stokRoutes = require('./routes/stokRoutes');
const authRoutes = require('./routes/auth');
const barangRoutes = require('./routes/barangRoutes');
const editBarang = require('./routes/editBarang');
const deleteBarang = require('./routes/deleteBarang');

const app = express();
app.use(cors());
app.use(express.json());

// Gunakan routes
app.use('/api/auth', authRoutes);
app.use('/api/stok', stokRoutes);
app.use('/api/barang', barangRoutes);
app.use('/api/edit-barang', editBarang);
app.use('/api/delete-barang', deleteBarang);

// Jalankan server
const PORT = process.env.PORT || 3000; // ambil port dari hosting, fallback ke 3000
app.listen(PORT, () => console.log(`✅ Server berjalan di port ${PORT}`));
