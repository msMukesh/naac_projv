
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


  const handleSubmit313 = async (e) => {
    e.preventDefault();
    setUploading313(true);

    const formDataToSend = new FormData();
    formDataToSend.append("year", formData313.year);
    formDataToSend.append("teacherName", formData313.teacherName);
    formDataToSend.append("designation", formData313.designation);
    formDataToSend.append("fellowshipType", formData313.fellowshipType);
    formDataToSend.append("fellowshipName", formData313.fellowshipName);
    formDataToSend.append("sponsoringAgency", formData313.sponsoringAgency);
    formDataToSend.append("file", formData313.file313);

    try {
      const response = await axios.post(
        "http://localhost:5000/313upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Data submitted successfully.");
      setUploaded313(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError313("Error submitting data. Please try again.");
    } finally {
      setUploading313(false);
    }
  };

  
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
    const file = req.file;
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
