const express = require('express');
const router = express.Router();
const Item = require('./models/Item');

// GET: Ambil semua data barang (bisa difilter jika nanti diperlukan)
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Tambah laporan barang hilang atau temuan baru
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;