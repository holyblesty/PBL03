const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Terhubung!'))
    .catch((err) => console.error('Koneksi MongoDB Gagal:', err));

// Endpoint Tes
app.get('/api', (req, res) => {
    res.json({ message: 'Backend Lost & Found aktif dan terhubung ke DB!' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});