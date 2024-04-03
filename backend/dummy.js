{/* Criterion 3.1.6 Form */}
<div>
<h2>Criterion 3.1.6 - Departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR, and other recognitions by national and international agencies during the year</h2>
<form onSubmit={handleSubmit316}>
  <div>
    <label htmlFor="schemeName">Name of the Scheme:</label>
    <input
      type="text"
      id="schemeName"
      name="schemeName"
      value={formData316.schemeName}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="principalInvestigator">Principal Investigator / Co-principal investigator:</label>
    <input
      type="text"
      id="principalInvestigator"
      name="principalInvestigator"
      value={formData316.principalInvestigator}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="fundingAgency">Name of the Funding Agency:</label>
    <input
      type="text"
      id="fundingAgency"
      name="fundingAgency"
      value={formData316.fundingAgency}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="type">Type Govt. / Non Govt.:</label>
    <input
      type="text"
      id="type"
      name="type"
      value={formData316.type}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="department">Dept.:</label>
    <input
      type="text"
      id="department"
      name="department"
      value={formData316.department}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="yearOfAward">Year of Award:</label>
    <input
      type="text"
      id="yearOfAward"
      name="yearOfAward"
      value={formData316.yearOfAward}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="fundLayoutAmount">Fund Layout amount Provided:</label>
    <input
      type="text"
      id="fundLayoutAmount"
      name="fundLayoutAmount"
      value={formData316.fundLayoutAmount}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="duration">Duration:</label>
    <input
      type="text"
      id="duration"
      name="duration"
      value={formData316.duration}
      onChange={handleInputChange316}
    />
  </div>
  <div>
    <label htmlFor="files">Document to Attach:</label>
    <input
      type="file"
      id="files"
      name="files"
      multiple
      onChange={handleFileChange316}
    />
  </div>
  <button type="submit" disabled={uploading316 || uploaded316}>
            {uploading316 ? "Submitting..." : uploaded316? "Submitted" : "Submit"}
          </button>
          {error316 && <div className="error">{error316}</div>}
</form>
</div>
    </div>
  </div>


  
 // State for Criterion 3.1.6
 const [formData316, setFormData316] = useState({
  schemeName: "",
  principalInvestigator: "",
  fundingAgency: "",
  type: "",
  department: "",
  yearOfAward: "",
  fundLayoutAmount: "",
  duration: "",
  files: null,
});

const [uploading316, setUploading316] = useState(false);
const [uploaded316, setUploaded316] = useState(false);
const [error316, setError316] = useState(null);

// Function to handle form input change for Criterion 3.1.6
const handleInputChange316 = (e) => {
  const { name, value } = e.target;
  setFormData316({ ...formData316, [name]: value });
};

const handleFileChange316 = (e) => {
  setFormData316({ ...formData316, files: e.target.files });
};

const handleSubmit316 = async (e) => {
  e.preventDefault();
  setUploading316(true);

  const dataToSend = new FormData();

  // Append other form data fields
  dataToSend.append("schemeName", formData316.schemeName);
  dataToSend.append("principalInvestigator", formData316.principalInvestigator);
  dataToSend.append("fundingAgency", formData316.fundingAgency);
  dataToSend.append("type", formData316.type);
  dataToSend.append("department", formData316.department);
  dataToSend.append("yearOfAward", formData316.yearOfAward);
  dataToSend.append("fundLayoutAmount", formData316.fundLayoutAmount);
  dataToSend.append("duration", formData316.duration);

  // Append the file
  if (formData316.files) {
    dataToSend.append("file", formData316.files[0]); // Assuming only one file is uploaded
  }

  try {
    const response = await axios.post("http://localhost:5000/316upload", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    setUploaded316(true);
  } catch (error) {
    console.error("Error uploading files:", error);
    setError316("Error uploading files. Please try again.");
  } finally {
    setUploading316(false);
  }
};




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

app.post('/316upload', upload.single('file'), async (req, res) => {
  try {
    const { schemeName, principalInvestigator, fundingAgency, type, department, yearOfAward, fundLayoutAmount, duration } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const _id = `316${schemeName || 'defaultUserName'}`;

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