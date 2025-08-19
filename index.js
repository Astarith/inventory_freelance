const express = require('express');
const cors = require('cors');
const stokRoutes = require('./routes/stokRoutes');
const authRoutes = require('./routes/auth');
const barangRoutes = require('./routes/barangRoutes');
const editBarang = require('./routes/editBarang');
const deleteBarang = require('./routes/deleteBarang');

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stok', stokRoutes);
app.use('/api/barang', barangRoutes);
app.use('/api/edit-barang', editBarang);
app.use('/api/delete-barang', deleteBarang);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 API berjalan dengan baik!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Terjadi kesalahan server" });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server berjalan di port ${PORT}`));
