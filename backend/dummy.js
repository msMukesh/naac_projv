
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

// Endpoint for file upload for 314
app.post('/314upload', upload.single('file314'), async (req, res) => {
  try {
    const { fellowName, yearOfEnrollment, duration, fellowshipType, grantingAgency } = req.body;
    const {path: file} = req.file;
    const _id = `314${fellowName}`;

    // Ensure all required fields are present
    if (!fellowName || !yearOfEnrollment || !duration || !fellowshipType || !grantingAgency || !file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save data to the database
    const newDocument = new Criterion314Model({
      _id,
      fellowName,
      yearOfEnrollment: parseInt(yearOfEnrollment),
      duration: parseInt(duration),
      fellowshipType,
      grantingAgency,
      filePath: file.path
    });
    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});
