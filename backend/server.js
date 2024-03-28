import express from "express";
import mongoose from "mongoose";
import multer from "multer"; // Import multer
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;

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

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, 'uploads')); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  }
});

// Initialize multer upload middleware
const upload = multer({ storage });

// Endpoint for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  const { userName } = req.body;
  const { path: filePath } = req.file;

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

// Serve uploaded files statically
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Handle other routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
