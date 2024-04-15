import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from "cors"; // Import the cors package
const app = express();
import path from "path";

import fs from 'fs';
app.use(cors());
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

const port = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Naac', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true, // Corrected option name
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Set up CORS headers to allow requests from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let globalUserName = ""; // Global variable to store userName

app.post("/storeUsername", (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ error: "Username is required" });
    }
    
    // Store userName wherever needed (e.g., in a database)
    globalUserName = userName;

    console.log("backend: " + userName);
    return res.status(200).send("Username stored successfully");
  } catch (error) {
    console.error("Error storing username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware for parsing JSON bodies

// Function to create directory if it doesn't exist
const createDirectoryIfNotExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true }); // Create directory recursively
  }
};

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDirectory = join(__dirname, 'uploads'); // Path to uploads directory
    const userDirectory = join(uploadsDirectory, globalUserName); // Path to user's directory inside uploads
    createDirectoryIfNotExists(userDirectory); // Create user's directory if it doesn't exist
    cb(null, userDirectory); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  }
});

// Initialize multer upload middleware
const upload = multer({ 
  storage,
  // Ensure the field name matches the one in the form data
  fileField: 'file'
});


// Define the directory where your files are stored
const filesDirectory = path.join(__dirname, "path/to/files");

// Endpoint to handle file download
app.get("/downloadFile", (req, res) => {
  const fileName = req.query.fileName;
  const absolutePath = path.join(filesDirectory, fileName); // Construct absolute path
  res.download(fileName); // Send file with original name for download
});


// Define the schema for Criterion3 collection
const Criterion311Schema = new mongoose.Schema({
  _id: String,
  userName: String,
  filePath: String,
});

// Define the model for Criterion3 collection
const Criterion311Model = mongoose.model('Criterion311', Criterion311Schema);

// Replace your existing '/getFile' route with this one
app.get('/getFile311', async (req, res) => {
  // const userName = req.query.userName; // Retrieve userName from query params
  const _id = `311${globalUserName}`;

  try {
    const foundDetails = await Criterion311Model.findOne({ _id });
    if (foundDetails) {
      console.log("Found", foundDetails);
      res.status(200).json({ data: foundDetails });
    } else {
      console.log("Element not found");
      res.status(404).json({ error: "Element not found" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Endpoint for file upload for 311
app.post('/311upload', upload.single('file'), async (req, res) => {
  const { userName } = req.body;
  const { path: filePath } = req.file;
  const _id = `311${globalUserName}`;

  const newDocument = new Criterion311Model({
    _id,
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


// Replace your existing '/getFile' route with this one
app.get('/getFile312', async (req, res) => {
  

  const _id = `312${globalUserName}`;

  try {
    const foundDetails = await Criterion312Model.findOne({ _id });
    if (foundDetails) {
      console.log("Found", foundDetails);
      res.status(200).json({ data: foundDetails });
    } else {
      console.log("Element not found");
      res.status(404).json({ error: "Element not found" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Endpoint for file upload for 312
app.post('/312upload', upload.single('file'), async (req, res) => {
  const { teacherName, amount, year, additionalInfo } = req.body;
  const { path: filePath } = req.file;
  const { userName } = req.body;
  const _id = `312${userName}`;
 
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

// Replace your existing '/getFile' route with this one
app.get('/getFile313', async (req, res) => {
  

  const _id = `313${globalUserName}`;

  try {
    const foundDetails = await Criterion313Model.findOne({ _id });
    if (foundDetails) {
      console.log("Found", foundDetails);
      res.status(200).json({ data: foundDetails });
    } else {
      console.log("Element not found");
      res.status(404).json({ error: "Element not found" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});
// Endpoint for file upload for 313
app.post('/313upload', upload.single('file'), async (req, res) => {
  try {
    const { year, teacherName, designation, fellowshipType, fellowshipName, sponsoringAgency } = req.body;
    const { path: filePath } = req.file;

    // Validate required fields
    // if (!year || !teacherName || !fellowshipType || !fellowshipName || !sponsoringAgency || !filePath) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }
    const _id = `313${globalUserName}`;
    // Generate custom _id

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

// Define the schema for Criterion314 collection
const Criterion314Schema = new mongoose.Schema({
  _id: String,
  fellowName: { type: String, required: true },
  yearOfEnrollment: { type: Number, required: true },
  duration: { type: Number, required: true },
  fellowshipType: { type: String, required: true },
  grantingAgency: { type: String, required: true },
  filePath: { type: String, required: true }
});

const Criterion314Model = mongoose.model('Criterion314', Criterion314Schema);

// Replace your existing '/getFile' route with this one
app.get('/getFile314', async (req, res) => {
  const _id = `314${globalUserName}`;

  try {
    const foundDetails = await Criterion314Model.findOne({ _id });
    if (foundDetails) {
      console.log("Found", foundDetails);
      res.status(200).json({ data: foundDetails });
    } else {
      console.log("Element not found");
      res.status(404).json({ error: "Element not found" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Endpoint for file upload for 314
app.post('/314upload', upload.single('file'), async (req, res) => {
  try {
    const { fellowName, yearOfEnrollment, duration, fellowshipType, grantingAgency } = req.body;
  
    const _id = `314${globalUserName}`;
    // Save data to the database
    const newDocument = new Criterion314Model({
      _id,
      fellowName,
      yearOfEnrollment, // Parse strings to integers
      duration,
      fellowshipType,
      grantingAgency,
      filePath: req.file.path
    });
    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});

const Criterion316Schema = new mongoose.Schema({
  _id: String,
  schemeName: String,
  principalInvestigator: String,
  fundingAgency: String,
  type: String,
  department: String,
  yearOfAward: Number,
  fundLayoutAmount: Number,
  duration: Number,
  filePath: {
    type: String, // filePath is a single string
    required: true
  }
});

const Criterion316Model = mongoose.model('Criterion316', Criterion316Schema);
// Replace your existing '/getFile' route with this one
app.get('/getFile316', async (req, res) => {
  const _id = `316${globalUserName}`;

  try {
    const foundDetails = await Criterion316Model.findOne({ _id });
    if (foundDetails) {
      console.log("Found", foundDetails);
      res.status(200).json({ data: foundDetails });
    } else {
      console.log("Element not found");
      res.status(404).json({ error: "Element not found" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

app.post('/316upload', upload.single('file'), async (req, res) => {
  try {
    const { schemeName, principalInvestigator, fundingAgency, type, department, yearOfAward, fundLayoutAmount, duration } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const _id = `316${globalUserName}`;
    // Assigning the path of the uploaded file directly
    const newDocument = new Criterion316Model({
      _id,
      schemeName,
      principalInvestigator,
      fundingAgency,
      type,
      department,
      yearOfAward,
      fundLayoutAmount,
      duration,
      filePath: req.file.path
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});

// Define the schema for Criterion321 collection
const Criterion321Schema = new mongoose.Schema({
  _id: String,
  projectName: { type: String, required: true },
  principalInvestigator: { type: String, required: true },
  fundingAgency: { type: String, required: true },
  fundingType: { type: String, required: true },
  department: { type: String, required: true }, // Corrected field name
  yearOfAward: { type: Number, required: true },
  fundsProvided: { type: Number, required: true },
  duration: { type: Number, required: true },
  filePath: { type: String, required: true }
});

const Criterion321Model = mongoose.model('Criterion321', Criterion321Schema);

// Replace your existing '/getFile' route with this one
app.get('/getFile321', async (req, res) => {
  const _id = `321${globalUserName}`;

  try {
    const foundDetails = await Criterion321Model.findOne({ _id });
    if (foundDetails) {
      console.log("Found", foundDetails);
      res.status(200).json({ data: foundDetails });
    } else {
      console.log("Element not found");
      res.status(404).json({ error: "Element not found" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Endpoint for file upload for 321
app.post('/321upload', upload.single('file'), async (req, res) => {
  try {
    const { projectName, principalInvestigator, fundingAgency, fundingType, department, yearOfAward, fundsProvided, duration } = req.body; // Corrected field name

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const _id = `321${globalUserName}`;
    // Save data to the database
    const newDocument = new Criterion321Model({
      _id,
      projectName,
      principalInvestigator,
      fundingAgency,
      fundingType,
      department,
      yearOfAward, // Parse strings to integers
      fundsProvided, // Parse strings to integers
      duration,
      filePath: req.file.path
    });
    await newDocument.save();
  
    return res.status(200).json({ message: 'Data submitted successfully' });
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
