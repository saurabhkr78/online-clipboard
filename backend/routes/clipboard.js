const express = require('express');
const router = express.Router();
const Clipboard = require('../models/Clipboard');
const { v4: uuidv4 } = require('uuid');
const generateQRCode = require('../utils/generateQRCode');

// Create a new clipboard entry
router.post('/', async (req, res) => {
  const { text } = req.body;
  const id = uuidv4();
  const clipboard = new Clipboard({ id, text });
  await clipboard.save();

  const qrCodeUrl = await generateQRCode(`http://localhost:3000/api/clipboard/${id}`);

  res.json({ id, url: `http://localhost:3000/api/clipboard/${id}`, qrCodeUrl });
});

// Retrieve clipboard entry
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const clipboard = await Clipboard.findOne({ id });

  if (!clipboard) {
    return res.status(404).send('Clipboard not found');
  }

  res.json({ text: clipboard.text });
});

module.exports = router;
