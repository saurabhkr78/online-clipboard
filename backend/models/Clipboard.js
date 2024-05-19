const mongoose = require('mongoose');

const clipboardSchema = new mongoose.Schema({
  id: String,
  text: String,
  createdAt: { type: Date, default: Date.now, expires: '1h' }, // Auto-destroy after 1 hour
});

module.exports = mongoose.model('Clipboard', clipboardSchema);
