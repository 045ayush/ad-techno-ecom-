const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const authenticate = require('../middleware/authenticat');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Route to get upload parameters
router.get('/upload-params', authenticate(["ADMIN"]), (req, res) => {
  // Generate a unique upload preset or parameters for the image
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  }, process.env.CLOUDINARY_API_SECRET);

  res.json({
    signature: signature,
    timestamp: timestamp,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    api_key:process.env.CLOUDINARY_API_KEY
  });
});

module.exports = router;
