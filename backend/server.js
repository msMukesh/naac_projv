const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { fileURLToPath } = require('url');
const { dirname, join } = require('path');
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require('fs');

// MongoDB connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://msmukesh:naacdb1234@naaccluster.rheatzk.mongodb.net/?retryWrites=true&w=majority&appName=NaacCluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.use(cors());
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

let globalUserName = "";

app.post("/storeUsername", (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ error: "Username is required" });
    }
    
    globalUserName = userName;

    console.log("backend: " + userName);
    return res.status(200).send("Username stored successfully");
  } catch (error) {
    console.error("Error storing username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const createDirectoryIfNotExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDirectory = join(__dirname, 'uploads');
    const userDirectory = join(uploadsDirectory, globalUserName);
    createDirectoryIfNotExists(userDirectory);
    cb(null, userDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileField: 'file'
});

const filesDirectory = path.join(__dirname, "path/to/files");

app.get("/downloadFile", (req, res) => {
  const fileName = req.query.fileName;
  const absolutePath = path.join(filesDirectory, fileName);
  res.download(fileName);
});

// Define schema for sequence collection
// const sequenceSchema = new mongoose.Schema({
//   _id: String, 
//   sequence_value: Number, 
// });

// Create model for sequence collection
// const SequenceModel = mongoose.model('Sequence', sequenceSchema);


// Helper function to retrieve a Mongoose model by name
function getModelByName(modelName) {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  } else {
    throw new Error(`Model with name ${modelName} does not exist.`);
  }
}


const getNextSequenceValue = async (criterionNumber) => {
  // Define a pattern to identify documents with the specified criterion number and user name
  const regexPattern = `^${criterionNumber}${globalUserName}`;
  console.log("regexpattern"+ regexPattern);

   // Get the correct model based on the criterion number
   const CriterionModel = getModelByName(`Criterion${criterionNumber}`);

  // Get the maximum sequence value
  const [maxSequenceDoc] = await CriterionModel.find({
    _id: { $regex: regexPattern },
  })
    .sort({ _id: -1 }) // Sort in descending order to get the maximum value
    .limit(1);

    console.log("maxSequenceDoc"+maxSequenceDoc);
  const maxExistingValue = maxSequenceDoc
    ? parseInt(maxSequenceDoc._id.slice(criterionNumber.length + globalUserName.length), 10)
    : 1; // If there's no existing document, start from 0

    // console.log("max existing "+ maxExistingValue);
  // Check for missing sequence values by iterating from 1 to the maxExistingValue
  for (let i = 1; i <= maxExistingValue; i++) {
    const sequenceId = `${criterionNumber}${globalUserName}${i}`; // Construct the sequence ID
    const exists = await CriterionModel.exists({ _id: sequenceId }); // Check if it exists
    if (!exists) {
      // If there's a gap, use the missing sequence value
      return i;
    }    
  }
  // If no gaps found, increment the maximum existing value and return it
  return maxExistingValue + 1;
};


// Function to get the maximum existing sequence value for a given criterion number
const getMaxExistingValue = async (criterionNumber) => {
  // Define a pattern to identify documents with the specified criterion number and user name
  const regexPattern = `^${criterionNumber}${globalUserName}`;
  console.log("RegEx pattern:", regexPattern);

  // Get the correct model based on the criterion number
  const CriterionModel = getModelByName(`Criterion${criterionNumber}`);

  // Find the document with the maximum sequence value
  const [maxSequenceDoc] = await CriterionModel.find({
    _id: { $regex: regexPattern },
  })
    .sort({ _id: -1 }) // Sort in descending order to get the highest value
    .limit(1);

  console.log("Max sequence document:", maxSequenceDoc);

  // If there's a document, extract the sequence number, otherwise, set it to 1
  const maxExistingValue = maxSequenceDoc
    ? parseInt(maxSequenceDoc._id.slice(criterionNumber.length + globalUserName.length), 10)
    : 1; // Default to 1 if no document is found

  console.log("Max existing value:", maxExistingValue);

  // Return the maximum existing value
  return maxExistingValue;
};


app.delete('/deleteFile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const criterionNumber = id.substring(0, 3); // Extract criterion number
    const CriterionModel = getModelByName(`Criterion${criterionNumber}`);
    console.log("delete criterion number: "+criterionNumber);
    console.log("delete id backend: "+id);

    const result = await CriterionModel.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: 'File deleted successfully.' });
    } else {
      res.status(404).json({ error: 'File not found.' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'An error occurred while deleting the file.' });
  }
});




// Define the schema for Criterion311 collection
const Criterion311Schema = new mongoose.Schema({
  _id: String,
  userName: String,
  filePath: String,
});

// Define the model for Criterion311 collection
const Criterion311Model = mongoose.model('Criterion311', Criterion311Schema);

// app.get('/getFile311', async (req, res) => {
//   // Initialize the criterion number
//   const criterionNumber = 311;
//   try {
//     // Get the highest sequence value for the given criterion number
//     const sequenceValue = await getNextSequenceValue(criterionNumber);
//     // Initialize an array to hold all found documents
//     const foundDocuments = [];
//     // Loop from sequence 1 to sequenceValue to get all documents
//     for (let i = 1; i <= sequenceValue; i++) {
//       // Get the model for the current sequence
//       const CriterionModel = getModelByName(`Criterion${criterionNumber}`);
//       const _id = `${criterionNumber}${globalUserName}${i}`;
//       console.log("test print id: " + _id);
//       // Find the document with the given ID in the current model
//       const foundDetails = await CriterionModel.findOne({ _id });
//       // If a document is found, add it to the array
//       if (foundDetails) {
//         foundDocuments.push(foundDetails);
//       }
//     }
//     console.log("found documents"+foundDocuments);
//     // Check if any documents were found and return the appropriate response
//     if (foundDocuments.length > 0) {
//       console.log("Found documents:", foundDocuments);
//       res.status(200).json({ data: foundDocuments });
//     } else {
//       console.log("No documents found for this ID");
//       res.status(404).json({ error: "No documents found for this ID" });
//     }
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(500).json({ error: "Error occurred while fetching data." });
//   }
// });

// Endpoint that retrieves documents based on an array of criterion numbers
// app.get('/getFilesByCriteria', async (req, res) => {
//   try {
//     // Retrieve the criterion numbers from the query parameters
//     const criterionNumbers = req.query.criterionNumbers;

//     if (!criterionNumbers) {
//       return res.status(400).json({ error: 'No criterion numbers provided.' });
//     }

//     // Ensure criterionNumbers is an array
//     const criterionArray = Array.isArray(criterionNumbers) ? criterionNumbers : [criterionNumbers];

//     const globalUserName = 'yourUserName'; // Replace with your logic for obtaining the username
//     const results = [];

//     for (const criterion of criterionArray) {
//       const foundDocuments = [];
//       const sequenceValue = await getNextSequenceValue(criterion);

//       for (let i = 1; i <= sequenceValue; i++) {
//         const CriterionModel = getModelByName(`Criterion${criterion}`);
//         const _id = `${criterion}${globalUserName}${i}`;

//         const foundDetails = await CriterionModel.findOne({ _id });
//         if (foundDetails) {
//           foundDocuments.push(foundDetails);
//         }
//       }

//       results.push(foundDocuments); // Add the found documents to the results array
//     }

//     res.status(200).json({ results }); // Return the results array
//   } catch (e) {
//     console.error('Error fetching data:', e);
//     res.status(500).json({ error: 'Error occurred while fetching data.' });
//   }
// });


app.get('/getFilesByCriteria', async (req, res) => {
  try {
    const { userName, criterionNumbers } = req.query;

    if (!criterionNumbers) {
      return res.status(400).json({ error: 'No criterion numbers provided.' });
    }

    // Convert the comma-separated string into an array
    const criterionArray = criterionNumbers.split(',');
    const results = [];

    // Iterate over each criterion
    for (const criterion of criterionArray) {
      const foundDocuments = [];
      console.log("criterion number::"+criterion);


      const sequenceValue = await getMaxExistingValue(criterion);
console.log("sequenceValue"+sequenceValue);
      // Loop through all possible sequence numbers
      for (let i = 1; i <= sequenceValue; i++) {
        const CriterionModel = getModelByName(`Criterion${criterion}`);
        const _id = `${criterion}${userName}${i}`;
        console.log("Checking ID:", _id);

        try {
          const foundDetails = await CriterionModel.findOne({ _id });

          if (foundDetails) {
            foundDocuments.push(foundDetails); // Add found document to the array
          } else {
            console.log(`No document found for ID: ${_id}`); // Log and continue the loop
          }
        } catch (error) {
          console.error(`Error finding document with ID: ${_id}:`, error); // Log the error but continue
        }
      }

      // Push the array of found documents for this criterion
      results.push(foundDocuments);
    }
console.log("results::"+results);
    // Return the results array, which contains arrays for each criterion
    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error occurred while fetching data.' });
  }
});



app.post('/311upload', upload.single('file'), async (req, res) => { 
  const { userName } = req.body;
  const { path: filePath } = req.file;
  const criterionNumber = '311'; // This would be based on your scenario

  // Get the next sequence value
  let sequenceValue;
  try {
    console.log("criterionNumber"+criterionNumber);
    sequenceValue = await getNextSequenceValue(criterionNumber);
  } catch (error) {
    console.error('Error getting next sequence value:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
  console.log("sequence value in post "+ sequenceValue);
  // Check if sequenceValue is a valid number
  if (isNaN(sequenceValue)) {
    console.error('Invalid sequence value:', sequenceValue);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }

  try {
      // Construct the _id
  const _id = `311${globalUserName}${sequenceValue}`;
console.log("idididid"+ _id);
  const newDocument = new Criterion311Model({
    _id,
    globalUserName,
    filePath,
  });

  await newDocument.save();
    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error saving document:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});


// Endpoint for file upload for 311
// app.post('/311upload', upload.single('file'), async (req, res) => {
//   const { userName } = req.body;
//   const { path: filePath } = req.file;
//   const _id = `311${globalUserName}`;

//   const newDocument = new Criterion311Model({
//     _id,
//     userName,
//     filePath,
//   });

//   try {
//     await newDocument.save();
//     return res.status(200).json({ message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error('Error saving document:', error);
//     return res.status(500).json({ error: 'Error uploading file. Please try again.' });
//   }
// });



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
  } 
  catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Endpoint for file upload for 312
app.post('/312upload', upload.single('file'), async (req, res) => {
  // Extract information from the request body
  const { teacherName, amount, year, additionalInfo } = req.body;
  const filePath = req.file ? req.file.path : null; // Get file path if file exists
  const { userName } = req.body;

  // Criterion number (unique identifier for this case)
  const criterionNumber = '312';

  let sequenceValue;
  try {
    // Obtain the maximum existing value or the next sequence
    sequenceValue = await getNextSequenceValue(criterionNumber);
  } catch (error) {
    console.error('Error getting sequence value:', error);
    return res.status(500).json({ error: 'Error obtaining sequence value. Please try again.' });
  }

  const _id = `${criterionNumber}${userName}${sequenceValue}`;

  // Create a new document with or without a file path
  const newDocument = new Criterion312Model({
    _id,
    teacherName,
    amount,
    year,
    additionalInfo,
    filePath, // Include the file path if a file was uploaded
  });

  try {
    // Save the document to the database
    await newDocument.save();
    return res.status(200).json({ message: 'Data submitted successfully.' });
  } catch (error) {
    console.error('Error saving document:', error);
    return res.status(500).json({ error: 'Error saving document. Please try again.' });
  }
});




const Criterion313Schema = new mongoose.Schema({
  _id: String, // Specify _id as a string

  year: {
    type: Number
  },
  teacherName: {
    type: String
  },
  designation: String,
  fellowshipType: {
    type: String,
    enum: ['International', 'National', 'State'] // Assuming these are the possible values
  },
  fellowshipName: {
    type: String
  },
  sponsoringAgency: {
    type: String
  },
  filePath: {
    type: String
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
  
    const filePath = req.file ? req.file.path : null; // If there's a file, use its path

    // Validate required fields
    // if (!year || !teacherName || !fellowshipType || !fellowshipName || !sponsoringAgency || !filePath) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }

    const criterionNumber = '313'; // This would be based on your scenario
    let sequenceValue;
  
    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error('Error getting next sequence value:', error);
      return res.status(500).json({ error: 'Error uploading file. Please try again.' });
    }
    console.log("313 sequence value:"+ sequenceValue);
  
    const _id = `313${globalUserName}${sequenceValue}`;
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
  fellowName: { type: String },
  yearOfEnrollment: { type: Number },
  duration: { type: Number },
  fellowshipType: { type: String},
  grantingAgency: { type: String },
  filePath: { type: String }
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

    const criterionNumber = '314'; // This would be based on your scenario
    let sequenceValue;
  
    const filePath = req.file ? req.file.path : null; // If there's a file, use its path

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error('Error getting next sequence value:', error);
      return res.status(500).json({ error: 'Error uploading file. Please try again.' });
    }
  
    const _id = `314${globalUserName}${sequenceValue}`;
      // Generate custom _id

    // Save data to the database
    const newDocument = new Criterion314Model({
      _id,
      fellowName,
      yearOfEnrollment, // Parse strings to integers
      duration,
      fellowshipType,
      grantingAgency,
      filePath
    });
    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});




const Criterion315Schema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  facilityName: { type: String, required: true },
  yearOfEstablishment: { type: Number, required: true },
  geoTaggedPicture: { type: String },
  centralInstrumentationCentre: { type: Boolean, required: true },
  animalHouseGreenHouse: { type: Boolean, required: true },
  museum: { type: Boolean, required: true },
  mediaLaboratory: { type: Boolean, required: true },
  businessLab: { type: Boolean, required: true },
  researchStatisticalDatabases: { type: Boolean, required: true },
  mootCourt: { type: Boolean, required: true },
  theatre: { type: Boolean, required: true },
  artGallery: { type: Boolean, required: true },
  otherFacility: { type: Boolean, required: true },
});

const Criterion315Model = mongoose.model('Criterion315', Criterion315Schema);

// Middleware to parse incoming request body
app.use(express.json());

// Retrieve a specific record by ID
app.get('/getFile315', async (req, res) => {
  const _id = `315${globalUserName}`;

  try {
    const foundDetails = await Criterion315Model.findOne({ _id });
    if (foundDetails) {
      res.status(200).json(foundDetails);
    } else {
      res.status(404).json({ error: 'Element not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Endpoint to upload new data with a file
app.post('/315upload', upload.single('geoTaggedPicture'), async (req, res) => {
  try {
    const {
      facilityName,
      yearOfEstablishment,
      centralInstrumentationCentre,
      animalHouseGreenHouse,
      museum,
      mediaLaboratory,
      businessLab,
      researchStatisticalDatabases,
      mootCourt,
      theatre,
      artGallery,
      otherFacility,
    } = req.body;

    const geoTaggedPicturePath = req.file ? req.file.path : null; // Get the file path if uploaded

    const criterionNumber = '315';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);

      console.log("sequence value sequence value" +sequenceValue);
    } catch (error) {
      console.error('Error getting next sequence value:', error);
      return res.status(500).json({ error: 'Error getting sequence value. Please try again.' });
    }

    const _id = `315${globalUserName}${sequenceValue}`;

    const newRecord = new Criterion315Model({
      _id, // Using req.user.username to get a unique ID
      facilityName,
      yearOfEstablishment, // Convert year to integer
      geoTaggedPicturePath, // Store the file path if it exists
      centralInstrumentationCentre,
      animalHouseGreenHouse,
      museum,
      mediaLaboratory,
      businessLab,
      researchStatisticalDatabases,
      mootCourt,
      theatre,
      artGallery,
      otherFacility,
    });

    await newRecord.save();

    res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ error: 'An error occurred while submitting data. Please try again.' });
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
    const {
      schemeName,
      principalInvestigator,
      fundingAgency,
      type,
      department,
      yearOfAward,
      fundLayoutAmount,
      duration,
    } = req.body;
    
    // If a file is uploaded, assign its path; otherwise, set it to null
    const filePath = req.file ? req.file.path : null;

    const criterionNumber = '316';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error('Error getting next sequence value:', error);
      return res.status(500).json({ error: 'Error getting sequence value. Please try again.' });
    }

    const _id = `316${globalUserName}${sequenceValue}`;

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
      filePath, // This can be null if no file is uploaded
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error uploading data:', error);
    return res.status(500).json({ error: 'Error uploading data. Please try again.' });
  }
});


// Define the schema for Criterion321 collection
const Criterion321Schema = new mongoose.Schema({
  _id: String,
  projectName: { type: String, },
  principalInvestigator: { type: String, },
  fundingAgency: { type: String, },
  fundingType: { type: String, },
  department: { type: String, }, // Corrected field name
  yearOfAward: { type: Number, },
  fundsProvided: { type: Number, },
  duration: { type: Number, },
  filePath: { type: String, },
  // filePath: { type: String, required: true }

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
    const {
      projectName,
      principalInvestigator,
      fundingAgency,
      fundingType,
      department,
      yearOfAward,
      fundsProvided,
      duration,
    } = req.body;

    // If a file is uploaded, set the path; otherwise, set it to null
    const filePath = req.file ? req.file.path : null;

    const criterionNumber = '321';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error('Error getting next sequence value:', error);
      return res.status(500).json({ error: 'Error getting sequence value. Please try again.' });
    }

    const _id = `321${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion321Model({
      _id,
      projectName,
      principalInvestigator,
      fundingAgency,
      fundingType,
      department,
      yearOfAward,
      fundsProvided,
      duration,
      filePath, // This can be null if no file is uploaded
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ error: 'Error saving data. Please try again.' });
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