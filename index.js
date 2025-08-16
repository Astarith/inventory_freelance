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

// Endpoint Stok
app.use('/api/stok', stokRoutes);

// Endpoint GEt Barang
app.use('/api/barang', barangRoutes);

// Endpoint Edit Barang
app.use('/api/edit-barang', editBarang);

// Endpoint Delete Barang
app.use('/api/delete-barang', deleteBarang);


// Jalankan server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
