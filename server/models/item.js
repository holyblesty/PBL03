const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Lost', 'Found'], required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Claimed', 'Archived'], default: 'Active' },
    contactInfo: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);