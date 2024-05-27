const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');

const router = express.Router();

// MongoDB URI
//onst mongoURI = 'your_mongoDB_connection_string';

// Create a storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// Connect to MongoDB
//mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(201).send({
    file: req.file
  });
});

module.exports = router;
