
// Define the schema for Criterion313 collection
const Criterion313Schema = new mongoose.Schema({
    _id: String,
    year: { type: Number, required: true },
    teacherName: { type: String, required: true },
    designation: String,
    fellowshipType: { type: String, enum: ['International', 'National', 'State'], required: true },
    fellowshipName: { type: String, required: true },
    sponsoringAgency: { type: String, required: true },
    filePath: { type: String, required: true }
  });
  
  const Criterion313Model = mongoose.model('Criterion313', Criterion313Schema);
  
  // Endpoint for file upload for 313
  app.post('/313upload', upload.single('file'), async (req, res) => {
    try {
      const { year, teacherName, designation, fellowshipType, fellowshipName, sponsoringAgency } = req.body;
      const { path: filePath } = req.file;
      const _id = `313${teacherName}`;
  
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