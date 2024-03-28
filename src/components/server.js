const express = require('express');
const formidable = require('formidable');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000; // Change the port to 5001

// Middleware for parsing JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Naac');

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the schema for Criterion3 collection
const Criterion3Schema = new mongoose.Schema({
  userName: String,
  filePath: String,
});

// Define the model for Criterion3 collection
const Criterion3Model = mongoose.model('Criterion3', Criterion3Schema);

// Set up CORS headers to allow requests from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint for file upload
app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'uploads');
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form. Please try again.' });
    }

    console.log('Fields:', fields);
    console.log('Files:', files);

    const { userName } = fields;
    const { path: filePath } = files.file;

    const newDocument = new Criterion3Model({
      userName,
      filePath,
    });

    try {
      await newDocument.save();
      return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error saving document:', error);
      return res.status(500).json({ error: 'Error uploading file. Please try again.' });
    }
  });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle other routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
