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


    console.log("criterionNumber:", criterionNumber);
    console.log("globalUserName:", globalUserName);
    
    if (!maxSequenceDoc) {
      // If no documents found, return 1
      return 1;
    }
  
    const slicedSubstring = maxSequenceDoc._id.slice(criterionNumber.length + globalUserName.length);
    console.log("Sliced Substring:", slicedSubstring);
    const maxExistingValue = maxSequenceDoc
        ? parseInt(slicedSubstring, 10)
        : 0;
    console.log("Max Existing Value:", maxExistingValue);

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
  // console.log("RegEx pattern:", regexPattern);

  // Get the correct model based on the criterion number
  const CriterionModel = getModelByName(`Criterion${criterionNumber}`);

  // Find the document with the maximum sequence value
  const [maxSequenceDoc] = await CriterionModel.find({
    _id: { $regex: regexPattern },
  })
    .sort({ _id: -1 }) // Sort in descending order to get the highest value
    .limit(1);

  // console.log("Max sequence document:", maxSequenceDoc);

  // If there's a document, extract the sequence number, otherwise, return 0

  return maxSequenceDoc
    ? parseInt(maxSequenceDoc._id.slice(criterionNumber.length + globalUserName.length), 10)
    : 0; // Return 0 if no document is found
};




app.get('/getFilesByCriteria', async (req, res) => {
  try {
    const { userName, criterionNumbers } = req.query;

    if (!criterionNumbers) {
      return res.status(400).json({ error: 'No criterion numbers provided.' });
    }

    // Convert the comma-separated string into an array
    const criterionArray = criterionNumbers.split(',').map(num => num.trim());
    const results = [];

     console.log("criterionArray",criterionArray);

    // Iterate over each criterion
    for (const criterion of criterionArray) {
      const foundDocuments = [];
    //   console.log("criterion number::"+criterion);

      const sequenceValue = await getMaxExistingValue(criterion);
      console.log("sequenceValue of criterion "+criterion+"is: "+sequenceValue);

      // Loop through all possible sequence numbers
      for (let i = 1; i <= sequenceValue; i++) {
        const CriterionModel = getModelByName(`Criterion${criterion}`);
        const _id = `${criterion}${globalUserName}${i}`;
        // const _id = new mongoose.Types.ObjectId(`${criterion}${globalUserName}${i}`);
         
        // console.log("Checking ID:", _id);

        try {
          const foundDetails = await CriterionModel.findOne({ _id });

          if (foundDetails) {
            foundDocuments.push(foundDetails); // Add found document to the array
          } else {
            console.log(`No document found for ID: ${_id}`); // Log and continue the loop
          }
        } catch (error) {
          console.error(`Error finding document with ID: ${_id}:`, error); // Log error but continue
        }
      }

      // Push the array of found documents for this criterion
      // console.log("foundDounments:::::"+foundDocuments);
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












// Function to get the maximum existing sequence value for a given criterion number
// const getMaxExistingValue = async (criterionNumber) => {
//   const nextSequenceValue = await getNextSequenceValue(criterionNumber);
//   return nextSequenceValue > 1 ? nextSequenceValue - 1 : 1;
// };

// const getNextSequenceValue = async (criterionNumber) => {
//   // Get the correct model based on the criterion number
//   const CriterionModel = getModelByName(`Criterion${criterionNumber}`);

//   let currentSequence = 0; // Start with 0

//   // Find the document with the highest sequence value within a loop
//   while (true) {
//     const sequenceId = `${criterionNumber}${globalUserName}${currentSequence}`;
//     const exists = await CriterionModel.exists({ _id: sequenceId });
//     if (!exists) {
//       // If it doesn't exist, use the current sequence value
//       return currentSequence;
//     }
//     currentSequence++;
//   }
// };

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
  teacherName: 
  { type: String},
  amount: 
  { type: Number},
  year: 
  { type: Number},
  additionalInfo: 
  { type: String},
  filePath: 
  { type:String}
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

  const _id = `${criterionNumber}${globalUserName}${sequenceValue}`;


  // Create a new document with or without a file path
  const newDocument = new Criterion312Model({
    _id,
    teacherName,
    amount,
    year,
    additionalInfo,
    filePath, // Include the file path if a file was uploaded
  });
  await newDocument.save();

  try {
    // Save the document to the database
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
  _id: String,
  facilityName: { type: String, required: true },
  yearOfEstablishment: { type: String, required: true },
  filePath: { type: String }, // Path to supporting documents
  centralInstrumentationCentre: { type: String, required: true },
  animalHouseGreenHouse: { type: String, required: true },
  museum: { type: String, required: true },
  mediaLaboratory: { type: String, required: true },
  businessLab: { type: String, required: true },
  researchStatisticalDatabases: { type: String, required: true },
  mootCourt: { type: String, required: true },
  theatre: { type: String, required: true },
  artGallery: { type: String, required: true },
  otherFacility: { type: String, required: true },
});


const Criterion315Model = mongoose.model('Criterion315', Criterion315Schema);

// Middleware to parse incoming request body
app.use(express.json());


// Retrieve a specific record by ID
app.get('/getFile315', async (req, res) => {
  const id = req.params.id; // Use the ID from the URL parameter

  try {
    const foundDetails = await Criterion315Model.findOne({ id });
    if (foundDetails) {
      res.status(200).json(foundDetails);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.post('/315upload', upload.single('file'), async (req, res) => {
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

    // Get the path to the uploaded file if available
    const filePath = req.file ? req.file.path : null;

    const criterionNumber = '315';
    let sequenceValue;
   

    try {
      // Obtain the maximum existing value or the next sequence
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error('Error getting sequence value:', error);
      return res.status(500).json({ error: 'Error obtaining sequence value. Please try again.' });
    }



    const _id = `${criterionNumber}${globalUserName}${sequenceValue}`;



    const newRecord = new Criterion315Model({
      _id,
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
      filePath, // Can be null if no file is attached

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
// app.get('/getFile321', async (req, res) => {
//   const _id = `321${globalUserName}`;
  
//   try {
//     const foundDetails = await Criterion321Model.findOne({ _id });
//     if (foundDetails) {
//       console.log("Found", foundDetails);
//       res.status(200).json({ data: foundDetails });
//     } else {
//       console.log("Element not found");
//       res.status(404).json({ error: "Element not found" });
//     }
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(500).json({ error: "Error occurred while fetching data." });
//   }
// });

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



const Criterion322Schema = new mongoose.Schema({
  _id: String,
  projectName: { type: String, required: true },
  principalInvestigator: { type: String, required: true },
  yearOfAward: { type: Number, required: true },
  fundsProvided: { type: String, required: true },
  duration: { type: Number, required: true },
  fundingAgency: { type: String, required: true },
  totalAmountFundsReceived: { type: Number, required: true },
  filePath: { type: String }, // File path for document
});

const Criterion322Model = mongoose.model('Criterion322', Criterion322Schema);

// POST endpoint for uploading data for 3.2.2
app.post('/322upload', upload.single('file'), async (req, res) => {
  try {
    const {
      projectName,
      principalInvestigator,
      yearOfAward,
      fundsProvided,
      duration,
      fundingAgency,
      totalAmountFundsReceived,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Check if a file is uploaded

    const criterionNumber = '322';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value." });
    }

    const _id = `322${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion322Model({
      _id,
      projectName,
      principalInvestigator,
      yearOfAward,
      fundsProvided,
      duration,
      fundingAgency,
      totalAmountFundsReceived,
      filePath, // This can be null if no file is uploaded
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "An error occurred while saving data. Please try again." });
  }
});

// GET endpoint for retrieving data for 3.2.2
app.get('/getFile322', async (req, res) => {
  const _id = `322${globalUserName}`;

  try {
    const foundDetails = await Criterion322Model.findOne({ _id });
    if (foundDetails) {
      res.status(200).json({ data: foundDetails });
    } else {
      res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});




const Criterion323Schema = new mongoose.Schema({
  _id: String,
  projectName: { type: String, required: true },
  principalInvestigator: { type: String, required: true },
  researchProjectName: { type: String, required: true },
  fundsReceived: { type: Number, required: true },
  fundingAgency: { type: String, required: true },
  yearOfSanction: { type: Number, required: true },
  filePath: { type: String }, // Can be null if no file is attached
});

const Criterion323Model = mongoose.model('Criterion323', Criterion323Schema);

// Endpoint for uploading data for 3.2.3
app.post('/323upload', upload.single('file'), async (req, res) => {
  try {
    const {
      projectName,
      principalInvestigator,
      researchProjectName,
      fundsReceived,
      fundingAgency,
      yearOfSanction,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Check if a file is uploaded

    const criterionNumber = '323';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value." });
    }

    const _id = `323${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion323Model({
      _id,
      projectName,
      principalInvestigator,
      researchProjectName,
      fundsReceived,
      fundingAgency,
      yearOfSanction,
      filePath, // This can be null if no file is attached
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "An error occurred while saving data. Please try again." });
  }
});

// GET endpoint to retrieve data for 3.2.3
app.get('/getFile323', async (req, res) => {
  const _id = `323${globalUserName}`;

  try {
    const foundDetails = await Criterion323Model.findOne({ _id });
    if (foundDetails) {
      res.status(200).json({ data: foundDetails });
    } else {
      res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error occurred while fetching data." });
  }
});



// Define Mongoose Schema for Criterion 3.3.1
const Criterion331Schema = new mongoose.Schema({
  _id: String,
  innovationEcosystem: { type: String, required: true },
  ecosystemLaboratory: { type: String, required: true },
  innovationCenter: { type: String, required: true },
  knowledgeIncubationCenter: { type: String, required: true },
  startupCenter: { type: String, required: true },
  otherSimilar: { type: String },
  description: { type: String, required: true }, // Description of available incubation centers
  filePath: { type: String }, // Path to the supporting document
});

const Criterion331Model = mongoose.model('Criterion331', Criterion331Schema);

// Endpoint to upload data for Criterion 3.3.1
app.post('/331upload', upload.single('file'), async (req, res) => {
  try {
    const {
      innovationEcosystem,
      ecosystemLaboratory,
      innovationCenter,
      knowledgeIncubationCenter,
      startupCenter,
      otherSimilar,
      description,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Get the file path if a file is uploaded

    const criterionNumber = '331';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `331${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion331Model({
      _id,
      innovationEcosystem,
      ecosystemLaboratory,
      innovationCenter,
      knowledgeIncubationCenter,
      startupCenter,
      otherSimilar,
      description,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});




// Endpoint to retrieve data for Criterion 3.3.1
app.get('/getFile331', async (req, res) => {
  const _id = `331_${globalUserName}`;

  try {
    const foundDetails = await Criterion331Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});



const Criterion332Schema = new mongoose.Schema({
  _id: String,
  academicYear: { type: Number, required: true },
  department: { type: String, required: true },
  seminarName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participantsCount: { type: Number, required: true },
  eventOrganizer: { type: String, required: true },
  filePath: { type: String }, // Can be null if no file is attached
});

const Criterion332Model = mongoose.model('Criterion332', Criterion332Schema);

// Endpoint for uploading data for 3.3.2
app.post('/332upload', upload.single('file'), async (req, res) => {
  try {
    const {
      academicYear,
      department,
      seminarName,
      startDate,
      endDate,
      participantsCount,
      eventOrganizer,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Check if a file is uploaded

    const criterionNumber = '332';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value." });
    }

    const _id = `332${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion332Model({
      _id,
      academicYear,
      department,
      seminarName,
      startDate,
      endDate,
      participantsCount,
      eventOrganizer,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "An error occurred while saving data. Please try again." });
  }
});

// GET endpoint for retrieving data for 3.3.2
app.get('/getFile332', async (req, res) => {
  const _id = `332${globalUserName}`;

  try {
    const foundDetails = await Criterion332Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json({ data: foundDetails });
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error occurred while fetching data." });
  }
});




const Criterion333Schema = new mongoose.Schema({
  _id: String,
  serialNumber: { type: Number, required: true },
  academicYear: { type: Number, required: true },
  awardeeName: { type: String, required: true },
  awardingAgency: { type: String, required: true },
  contactDetails: { type: String },
  dateOfAward: { type: Date, required: true },
  filePath: { type: String }, // Supporting document path
});

const Criterion333Model = mongoose.model('Criterion333', Criterion333Schema);

// Endpoint for uploading data for 3.3.3
app.post('/333upload', upload.single('file'), async (req, res) => {
  try {
    const {
      serialNumber,
      academicYear,
      awardeeName,
      awardingAgency,
      contactDetails,
      dateOfAward,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Check if a file is uploaded

    const criterionNumber = '333';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value." });
    }

    const _id = `333${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion333Model({
      _id,
      serialNumber,
      academicYear,
      awardeeName,
      awardingAgency,
      contactDetails,
      dateOfAward,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "An error occurred while saving data. Please try again." });
  }
});

// GET endpoint to retrieve data for 3.3.3
app.get('/getFile333', async (req, res) => {
  const _id = `333${globalUserName}`;

  try {
    const foundDetails = await Criterion333Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json({ data: foundDetails });
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error occurred while fetching data." });
  }
});





// Define Mongoose Schema for Criterion 3.4.1
const Criterion341Schema = new mongoose.Schema({
  _id: String,
  researchMethodology: { type: String },
  departmentalEthicsCommittees: { type: String },
  scientificResearchWriting: { type: String },
  plagiarismCheck: { type: String },
  researchAdvisoryCommittee: { type: String },
  otherRelatedItem: { type: String },
  filePath: { type: String }, // Path to supporting documents
});

const Criterion341Model = mongoose.model('Criterion341', Criterion341Schema);

// Endpoint to upload data for Criterion 3.4.1
app.post('/341upload', upload.single('file'), async (req, res) => {
  try {
    const {
      researchMethodology,
      departmentalEthicsCommittees,
      scientificResearchWriting,
      plagiarismCheck,
      researchAdvisoryCommittee,
      otherRelatedItem,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Get the file path if a file is uploaded

    const criterionNumber = '341';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `341${globalUserName}${sequenceValue}`;


    const newDocument = new Criterion341Model({
      _id,
      researchMethodology,
      departmentalEthicsCommittees,
      scientificResearchWriting,
      plagiarismCheck,
      researchAdvisoryCommittee,
      otherRelatedItem,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.1
app.get('/getFile341', async (req, res) => {
  const _id = `341_${globalUserName}`;

  try {
    const foundDetails = await Criterion341Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});






const Criterion342Schema = new mongoose.Schema({
  _id: String,
  academicYear: { type: Number, required: true },
  awardeeName: { type: String, required: true },
  contactDetails: { type: String, required: true },
  awardingAgency: { type: String, required: true },
  yearOfAward: { type: Number, required: true },
  incentiveDetails: { type: String, required: true },
  filePath: { type: String }, // Can be null if no file is attached
});

const Criterion342Model = mongoose.model('Criterion342', Criterion342Schema);

// Endpoint for uploading data for 3.4.2
app.post('/342upload', upload.single('file'), async (req, res) => {
  try {
    const {
      academicYear,
      awardeeName,
      contactDetails,
      awardingAgency,
      yearOfAward,
      incentiveDetails,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Check if a file is uploaded

    const criterionNumber = '342';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `342${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion342Model({
      _id,
      academicYear,
      awardeeName,
      contactDetails,
      awardingAgency,
      yearOfAward,
      incentiveDetails,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "An error occurred while saving data. Please try again." });
  }
});

// GET endpoint to retrieve data for 3.4.2
app.get('/getFile342', async (req, res) => {
  const _id = `342${globalUserName}`;

  try {
    const foundDetails = await Criterion342Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json({ data: foundDetails });
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Define the Mongoose schema for Criterion 3.4.3
const Criterion343Schema = new mongoose.Schema({
  _id: String,
  academicYear: { type: Number, required: true },
  patentName: { type: String, required: true },
  patentNumber: { type: Number, required: true },
  status: { type: String, required: true }, // Published, Awarded, Granted
  yearOfAward: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion343Model = mongoose.model('Criterion343', Criterion343Schema);

// Endpoint to upload data for Criterion 3.4.3
app.post('/343upload', upload.single('file'), async (req, res) => {
  try {
    const {
      academicYear,
      patentName,
      patentNumber,
      status,
      yearOfAward,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    
    const criterionNumber = '343';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `343${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion343Model({
      _id,
      academicYear,
      patentName,
      patentNumber,
      status,
      yearOfAward,
      filePath, // This can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: 'An error occurred while submitting data. Please try again.' });
  }
});

// Endpoint to retrieve data for Criterion 3.4.3
app.get('/getFile343', async (req, res) => {
  const _id = `343${globalUserName}${sequenceValue}`;

  try {
    const foundDetails = await Criterion343Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: 'Element not found' });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: 'An error occurred while retrieving data. Please try again.' });
  }
});







// Define Mongoose Schema for Criterion 3.4.4
const Criterion344Schema = new mongoose.Schema({
  _id: String,
  serialNumber: { type: Number, required: true },
  scholarName: { type: String, required: true },
  department: { type: String, required: true },
  guideName: { type: String, required: true },
  registrationYear: { type: Number, required: true },
  awardYear: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion344Model = mongoose.model('Criterion344', Criterion344Schema);

// Endpoint to upload data for Criterion 3.4.4
app.post('/344upload', upload.single('file'), async (req, res) => {
  try {
    const {
      serialNumber,
      scholarName,
      department,
      guideName,
      registrationYear,
      awardYear,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '344';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `344${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion344Model({
      _id,
      serialNumber,
      scholarName,
      department,
      guideName,
      registrationYear,
      awardYear,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.4
app.get('/getFile344', async (req, res) => {
  const _id = `344${globalUserName}`;

  try {
    const foundDetails = await Criterion344Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});



// Define Mongoose Schema for Criterion 3.4.5
const Criterion345Schema = new mongoose.Schema({
  _id: String,
  titleOfPaper: { type: String, required: true },
  authors: { type: String, required: true },
  department: { type: String, required: true },
  journalName: { type: String, required: true },
  yearOfPublication: { type: Number, required: true },
  issnNumber: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion345Model = mongoose.model('Criterion345', Criterion345Schema);

// Endpoint to upload data for Criterion 3.4.5
app.post('/345upload', upload.single('file'), async (req, res) => {
  try {
    const {
      titleOfPaper,
      authors,
      department,
      journalName,
      yearOfPublication,
      issnNumber,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '345';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `345${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion345Model({
      _id,
      titleOfPaper,
      authors,
      department,
      journalName,
      yearOfPublication,
      issnNumber,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.5
app.get('/getFile345', async (req, res) => {
  const _id = `345${globalUserName}`;

  try {
    const foundDetails = await Criterion345Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});



const Criterion346Schema = new mongoose.Schema({
  _id: String,
  teacherName: { type: String, required: true },
  titleOfPaper: { type: String, required: true },
  titleOfBookOrChapter: { type: String, required: true },
  authorNames: { type: String, required: true },
  titleOfProceedings: { type: String, required: true },
  publisher: { type: String, required: true },
  isbnNumber: { type: Number, required: true },
  yearOfPublication: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion346Model = mongoose.model('Criterion346', Criterion346Schema);

// Endpoint to upload data for Criterion 3.4.6
app.post('/346upload', upload.single('file'), async (req, res) => {
  try {
    const {
      teacherName,
      titleOfPaper,
      titleOfBookOrChapter,
      authorNames,
      titleOfProceedings,
      publisher,
      isbnNumber,
      yearOfPublication,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '346';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `346${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion346Model({
      _id,
      teacherName,
      titleOfPaper,
      titleOfBookOrChapter,
      authorNames,
      titleOfProceedings,
      publisher,
      isbnNumber,
      yearOfPublication,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.6
app.get('/getFile346', async (req, res) => {
  const _id = `346${globalUserName}`;

  try {
    const foundDetails = await Criterion346Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});



// Define Mongoose Schema for Criterion 3.4.7
const Criterion347Schema = new mongoose.Schema({
  _id: String,
  teacherName: { type: String, required: true },
  moduleName: { type: String, required: true },
  platform: { type: String, required: true },
  launchDate: { type: Date, required: true },
  platformCount: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion347Model = mongoose.model('Criterion347', Criterion347Schema);

// Endpoint to upload data for Criterion 3.4.7
app.post('/347upload', upload.single('file'), async (req, res) => {
  try {
    const { teacherName, moduleName, platform, launchDate, platformCount } = req.body;

    const filePath = req.file ? req.file.path : null; // Get the file path if a file is uploaded

    const criterionNumber = '347';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `347${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion347Model({
      _id,
      teacherName,
      moduleName,
      platform,
      launchDate,
      platformCount,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.7
app.get('/getFile347', async (req, res) => {
  const _id = `347${globalUserName}`;

  try {
    const foundDetails = await Criterion347Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});


// Define Mongoose Schema for Platform-based inputs
const PlatformSchema = new mongoose.Schema({
  _id: String,
  ePgPathshala: { status: String, details: String },
  cecUndergraduate: { status: String, details: String },
  swayam: { status: String, details: String },
  moocsPlatform: { status: String, details: String },
  governmentInitiatives: { status: String, details: String },
  institutionalLms: { status: String, details: String },
  filePath: { type: String }, // Path to the supporting document
});

const PlatformModel = mongoose.model('Platform', PlatformSchema);

// Endpoint to upload data for Criterion 3.4.7
app.post('/platforms_upload', upload.single('file'), async (req, res) => {
  try {
    const {
      ePgPathshala_status,
      ePgPathshala_details,
      cecUndergraduate_status,
      cecUndergraduate_details,
      swayam_status,
      swayam_details,
      moocsPlatform_status,
      moocsPlatform_details,
      governmentInitiatives_status,
      governmentInitiatives_details,
      institutionalLms_status,
      institutionalLms_details,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Get the file path if a file is uploaded

    const criterionNumber = 'Platforms';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `Platforms_${globalUserName}_${sequenceValue}`;

    const newDocument = new PlatformModel({
      _id,
      ePgPathshala: { status: ePgPathshala_status, details: ePgPathshala_details },
      cecUndergraduate: { status: cecUndergraduate_status, details: cecUndergraduate_details },
      swayam: { status: swayam_status, details: swayam_details },
      moocsPlatform: { status: moocsPlatform_status, details: moocsPlatform_details },
      governmentInitiatives
      : { status: governmentInitiatives_status, details: governmentInitiatives_details },
      institutionalLms: { status: institutionalLms_status, details: institutionalLms_details },
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for platform-based inputs
app.get('/getPlatforms', async (req, res) => {
  const _id = `Platforms_${globalUserName}`;

  try {
    const foundDetails = await PlatformModel.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});







// Define Mongoose Schema for Criterion 3.4.8
const Criterion348Schema = new mongoose.Schema({
  _id: String,
  titleOfPaper: { type: String, required: true },
  authorName: { type: String, required: true },
  journalTitle: { type: String, required: true },
  yearOfPublication: { type: Number, required: true },
  citationIndex: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion348Model = mongoose.model('Criterion348', Criterion348Schema);

// Endpoint to upload data for Criterion 3.4.8
app.post('/348upload', upload.single('file'), async (req, res) => {
  try {
    const {
      titleOfPaper,
      authorName,
      journalTitle,
      yearOfPublication,
      citationIndex,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '348';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `348${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion348Model({
      _id,
      titleOfPaper,
      authorName,
      journalTitle,
      yearOfPublication,
      citationIndex,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.8
app.get('/getFile348', async (req, res) => {
  const _id = `348${globalUserName}`;

  try {
    const foundDetails = await Criterion348Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});




// Define Mongoose Schema for Criterion 3.4.9
const Criterion349Schema = new mongoose.Schema({
  _id: String,
  titleOfPaper: { type: String, required: true },
  authorName: { type: String, required: true },
  journalTitle: { type: String, required: true },
  yearOfPublication: { type: Number, required: true },
  hIndex: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion349Model = mongoose.model('Criterion349', Criterion349Schema);

// Endpoint to upload data for Criterion 3.4.9
app.post('/349upload', upload.single('file'), async (req, res) => {
  try {
    const {
      titleOfPaper,
      authorName,
      journalTitle,
      yearOfPublication,
      hIndex,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '349';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `349${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion349Model({
      _id,
      titleOfPaper,
      authorName,
      journalTitle,
      yearOfPublication,
      hIndex,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.4.9
app.get('/getFile349', async (req, res) => {
  const _id = `349${globalUserName}`;

  try {
    const foundDetails = await Criterion349Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});









// Define Mongoose Schema for Criterion 3.5.1
const Criterion351Schema = new mongoose.Schema({
  _id: String,
  governingMinutes: { type: String }, // Path to the uploaded minutes document
  consultancyPolicy: { type: String }, // Path to the consultancy policy document
  additionalInfo: { type: String }, // Path to any additional information
});

const Criterion351Model = mongoose.model('Criterion351', Criterion351Schema);

// Endpoint to upload data for Criterion 3.5.1
app.post('/351upload', upload.fields([
  { name: 'governingMinutes', maxCount: 1 },
  { name: 'consultancyPolicy', maxCount: 1 },
  { name: 'additionalInfo', maxCount: 1 },
]), async (req, res) => {
  try {
    const { governingMinutes, consultancyPolicy, additionalInfo } = req.files;
    
    const criterionNumber = '351';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `351${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion351Model({
      _id,
      governingMinutes: governingMinutes ? governingMinutes[0].path : null,
      consultancyPolicy: consultancyPolicy ? consultancyPolicy[0].path : null,
      additionalInfo: additionalInfo ? additionalInfo[0].path : null,
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.5.1
app.get('/getFile351', async (req, res) => {
  const _id = `351${globalUserName}`;

  try {
    const foundDetails = await Criterion351Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});


















// Define Mongoose Schema for Criterion 3.5.2
const Criterion352Schema = new mongoose.Schema({
  _id: String,
  nameOfConsultants: { type: String, required: true },
  nameOfConsultancyProjects: { type: String, required: true },
  consultingAgency: { type: String, required: true },
  revenueGenerated: { type: Number, required: true },
  totalRevenueGenerated: { type: Number, required: true },
  corporateTrainingDetails: { type: String, required: true },
  titleOfTraining: { type: String, required: true },
  numberOfParticipants: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion352Model = mongoose.model('Criterion352', Criterion352Schema);

// Endpoint to upload data for Criterion 3.5.2
app.post('/352upload', upload.single('file'), async (req, res) => {
  try {
    const {
      nameOfConsultants,
      nameOfConsultancyProjects,
      consultingAgency,
      revenueGenerated,
      totalRevenueGenerated,
      corporateTrainingDetails,
      titleOfTraining,
      numberOfParticipants,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '352';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `352${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion352Model({
      _id,
      nameOfConsultants,
      nameOfConsultancyProjects,
      consultingAgency,
      revenueGenerated,
      totalRevenueGenerated,
      corporateTrainingDetails,
      titleOfTraining,
      numberOfParticipants,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.5.2
app.get('/getFile352', async (req, res) => {
  const _id = `352${globalUserName}`;

  try {
    const foundDetails = await Criterion352Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});





const Criterion361Schema = new mongoose.Schema({
  _id: String,
  titleOfProgram: { type: String, required: true },
  beneficiaryOrganization: { type: String, required: true },
  outreachProgramDescription: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventVenue: { type: String, required: true },
  outcome: { type: String, required: true },
  impactDescription: { type: String, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion361Model = mongoose.model('Criterion361', Criterion361Schema);

// Endpoint to upload data for Criterion 3.6.1
app.post('/361upload', upload.single('file'), async (req, res) => {
  try {
    const {
      titleOfProgram,
      beneficiaryOrganization,
      outreachProgramDescription,
      eventDate,
      eventVenue,
      outcome,
      impactDescription,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '361';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `361${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion361Model({
      _id,
      titleOfProgram,
      beneficiaryOrganization,
      outreachProgramDescription,
      eventDate,
      eventVenue,
      outcome,
      impactDescription,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.6.1
app.get('/getFile361', async (req, res) => {
  const _id = `361${globalUserName}`;

  try {
    const foundDetails = await Criterion361Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});



// Define Mongoose Schema for Criterion 3.6.2
const Criterion362Schema = new mongoose.Schema({
  _id: String,
  teacherName: { type: String, required: true },
  activityName: { type: String, required: true },
  awardName: { type: String, required: true },
  awardingBody: { type: String, required: true },
  yearOfAward: { type: Number, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion362Model = mongoose.model('Criterion362', Criterion362Schema);

// Endpoint to upload data for Criterion 3.6.2
app.post('/362upload', upload.single('file'), async (req, res) => {
  try {
    const {
      teacherName,
      activityName,
      awardName,
      awardingBody,
      yearOfAward,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '362';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `362${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion362Model({
      _id,
      teacherName,
      activityName,
      awardName,
      awardingBody,
      yearOfAward,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.6.2
app.get('/getFile362', async (req, res) => {
  const _id = `362${globalUserName}`;

  try {
    const foundDetails = await Criterion362Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});




// Define Mongoose Schema for Criterion 3.6.3
const Criterion363Schema = new mongoose.Schema({
  _id: String,
  activityName: { type: String, required: true },
  organizingUnit: { type: String, required: true },
  schemeName: { type: String, required: true },
  numberOfStudents: { type: Number, required: true },
  issuesAddressed: { type: String, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion363Model = mongoose.model('Criterion363', Criterion363Schema);

// Endpoint to upload data for Criterion 3.6.3
app.post('/363upload', upload.single('file'), async (req, res) => {
  try {
    const {
      activityName,
      organizingUnit,
      schemeName,
      numberOfStudents,
      issuesAddressed,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '363';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `363${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion363Model({
      _id,
      activityName,
      organizingUnit,
      schemeName,
      numberOfStudents,
      issuesAddressed,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the new document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.6.3
app.get('/getFile363', async (req, res) => {
  const _id = `363${globalUserName}`;

  try {
    const foundDetails = await Criterion363Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});



// Define Mongoose Schema for Criterion 3.6.4
const Criterion364Schema = new mongoose.Schema({
  _id: String,
  activityName: { type: String, required: true },
  schemeName: { type: String, required: true },
  yearOfActivity: { type: Number, required: true },
  studentNames: { type: String, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion364Model = mongoose.model('Criterion364', Criterion364Schema);

// Endpoint to upload data for Criterion 3.6.4
app.post('/364upload', upload.single('file'), async (req, res) => {
  try {
    const {
      activityName,
      schemeName,
      yearOfActivity,
      studentNames,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // If a file is uploaded, get the file path

    const criterionNumber = '364';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `364${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion364Model({
      _id,
      activityName,
      schemeName,
      yearOfActivity,
      studentNames,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.6.4
app.get('/getFile364', async (req, res) => {
  const _id = `364${globalUserName}`;

  try {
    const foundDetails = await Criterion364Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});




// Define Mongoose Schema for Criterion 3.7.1
const Criterion371Schema = new mongoose.Schema({
  _id: String,
  collaborativeTitle: { type: String, required: true },
  collaboratingAgency: {  type: String, required: true,},
  financialSupportSource: { type: String, required: true },
  collaborationYear: { type: Number, required: true },
  collaborationDuration: { type: Number, required: true },
  facultyInvolved: { type: String, required: true },
  natureOfActivity: { type: String, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion371Model = mongoose.model('Criterion371', Criterion371Schema);

// Endpoint to upload data for Criterion 3.7.1
app.post('/371upload', upload.single('file'), async (req, res) => {
  try {
    const {
      collaborativeTitle,
      collaboratingAgency,
      financialSupportSource,
      collaborationYear,
      collaborationDuration,
      facultyInvolved,
      natureOfActivity,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Get the file path if uploaded

    const criterionNumber = '371';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `371${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion371Model({
      _id,
      collaborativeTitle,
      collaboratingAgency,
      financialSupportSource,
      collaborationYear,
      collaborationDuration,
      facultyInvolved,
      natureOfActivity,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.7.1
app.get('/getFile371', async (req, res) => {
  const _id = `371${globalUserName}`;

  try {
    const foundDetails = await Criterion371Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
  }
});




// Define Mongoose Schema for Criterion 3.7.2
const Criterion372Schema = new mongoose.Schema({
  _id: String,
  organizationName: { type: String, required: true },
  mouYear: { type: Number, required: true },
  mouDuration: { type: Number, required: true },
  facultyCoordinators: { type: String, required: true },
  actualActivities: { type: String, required: true },
  participants: { type: String, required: true },
  filePath: { type: String }, // Path to the supporting document
});

const Criterion372Model = mongoose.model('Criterion372', Criterion372Schema);

// Endpoint to upload data for Criterion 3.7.2
app.post('/372upload', upload.single('file'), async (req, res) => {
  try {
    const {
      organizationName,
      mouYear,
      mouDuration,
      facultyCoordinators,
      actualActivities,
      participants,
    } = req.body;

    const filePath = req.file ? req.file.path : null; // Get the file path if a file is uploaded

    const criterionNumber = '372';
    let sequenceValue;

    try {
      sequenceValue = await getNextSequenceValue(criterionNumber);
    } catch (error) {
      console.error("Error getting sequence value:", error);
      return res.status(500).json({ error: "Error getting sequence value. Please try again." });
    }

    const _id = `372${globalUserName}${sequenceValue}`;

    const newDocument = new Criterion372Model({
      _id,
      organizationName,
      mouYear,
      mouDuration,
      facultyCoordinators,
      actualActivities,
      participants,
      filePath, // Can be null if no file is attached
    });

    await newDocument.save(); // Save the document to the database

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error("Error uploading data:", error);
    return res.status(500).json({ error: "An error occurred while submitting data. Please try again." });
  }
});

// Endpoint to retrieve data for Criterion 3.7.2
app.get('/getFile372', async (req, res) => {
  const _id = `372${globalUserName}`;

  try {
    const foundDetails = await Criterion372Model.findOne({ _id });
    if (foundDetails) {
      return res.status(200).json(foundDetails);
    } else {
      return res.status(404).json({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "An error occurred while fetching data. Please try again." });
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