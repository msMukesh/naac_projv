const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Naac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema
const researchSchema = new mongoose.Schema({
  teacherName: String,
  seedMoney: String,
  year: Number,
  additionalInfo: String,
});

// Create MongoDB Model
const ResearchModel = mongoose.model('Research', researchSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Create 'uploads' folder in your project directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Express Middleware to handle file upload
app.post('/upload', upload.single('researchDocument'), async (req, res) => {
  try {
    const { teacherName, seedMoney, year, additionalInfo } = req.body;

    // Save data to MongoDB
    const researchData = new ResearchModel({
      teacherName,
      seedMoney,
      year,
      additionalInfo,
    });
    await researchData.save();

    res.status(200).send('Data and document uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:27017`);
});
