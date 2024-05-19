const QRCode = require('qrcode');

const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Failed to generate QR code', err);
  }
};

module.exports = generateQRCode;
