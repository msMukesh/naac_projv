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
mongoose.connect('mongodb://localhost:27017/Naac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the schema for Criterion3 collection
const Criterion3Schema = new mongoose.Schema({
  _id: String, // Change _id to String type
  userName: String,
  filePath: String,
});

// Define the model for Criterion3 collection
const Criterion3Model = mongoose.model('Criterion311', Criterion3Schema);

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

// Endpoint for file upload for 311
app.post('/311upload', upload.single('file'), async (req, res) => {
  const { userName } = req.body;
  const { path: filePath } = req.file;
  const _id = `311${userName}`; // Generating custom _id

  const newDocument = new Criterion3Model({
    _id, // Assigning custom _id
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

// Define the schema for Criterion312 collection
const Criterion312Schema = new mongoose.Schema({
  _id: String,
  teacherName: String,
  amount: Number,
  year: Number,
  additionalInfo: String,
  filePath: String,
});

// Define the model for Criterion312 collection
const Criterion312Model = mongoose.model('Criterion312', Criterion312Schema);

// Endpoint for file upload for 312
app.post('/312upload', upload.single('file'), async (req, res) => {
  const { teacherName, amount, year, additionalInfo } = req.body;
  const { path: filePath } = req.file;
  const _id = `312${teacherName}`; // Generating custom _id

  const newDocument = new Criterion312Model({
    _id,
    teacherName,
    amount,
    year,
    additionalInfo,
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
const Criterion313Schema = new mongoose.Schema({
  _id: String, // Specify _id as a string

  year: {
    type: Number,
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  designation: String,
  fellowshipType: {
    type: String,
    enum: ['International', 'National', 'State'], // Assuming these are the possible values
    required: true
  },
  fellowshipName: {
    type: String,
    required: true
  },
  sponsoringAgency: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  }
});

const Criterion313Model = mongoose.model('Criterion313', Criterion313Schema);

// Endpoint for file upload for 313
app.post('/313upload', upload.single('file'), async (req, res) => {
  try {
    const { year, teacherName, designation, fellowshipType, fellowshipName, sponsoringAgency } = req.body;
    const { path: filePath } = req.file;

    // Validate required fields
    // if (!year || !teacherName || !fellowshipType || !fellowshipName || !sponsoringAgency || !filePath) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }

    // Generate custom _id
    const _id = `313${teacherName}`;

    // Save the document
    const newDocument = new Criterion313Model({
      _id,
      year,
      teacherName,
      designation,
      fellowshipType,
      fellowshipName,
      sponsoringAgency,
      filePath
    });

    await newDocument.save();

    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
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
