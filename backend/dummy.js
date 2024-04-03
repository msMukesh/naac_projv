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


const [toggleForm313, setToggleForm313] = useState(false);
  const [uploading313, setUploading313] = useState(false);
  const [uploaded313, setUploaded313] = useState(false);
  const [error313, setError313] = useState(null);
  const handleToggleForm313 = () => {
    setToggleForm313(!toggleForm313);
  };
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
console.log(formDataToSend);
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


          {/* Criterion 3.1.3 Form */}
          <div>
            <h2>Criterion 3.1.3 - Teachers receiving national/international fellowship/financial support:</h2>
            <button onClick={handleToggleForm313}>
              {toggleForm313 ? "Hide Form" : "Show Form"}
            </button>
            {toggleForm313 && (
            <form onSubmit={handleSubmit313}>
              <div>
                <label htmlFor="year">Year of Fellowship:</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData313.year}
                  onChange={handleInputChange313}
                />
              </div>
              <div>
                <label htmlFor="teacherName">Name of Teacher:</label>
                <input
                  type="text"
                  id="teacherName"
                  name="teacherName"
                  value={formData313.teacherName}
                  onChange={handleInputChange313}
                />
              </div>
              <div>
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData313.designation}
                  onChange={handleInputChange313}
                />
              </div>
              <div>
                <label htmlFor="fellowshipType">International/National/State:</label>
                <input
                  type="text"
                  id="fellowshipType"
                  name="fellowshipType"
                  value={formData313.fellowshipType}
                  onChange={handleInputChange313}
                />
              </div>
              <div>
                <label htmlFor="fellowshipName">Name of the Fellowship:</label>
                <input
                  type="text"
                  id="fellowshipName"
                  name="fellowshipName"
                  value={formData313.fellowshipName}
                  onChange={handleInputChange313}
                />
              </div>
              <div>
                <label htmlFor="sponsoringAgency">Name of the Sponsoring Agency:</label>
                <input
                  type="text"
                  id="sponsoringAgency"
                  name="sponsoringAgency"
                  value={formData313.sponsoringAgency}
                  onChange={handleInputChange313}
                />
              </div>
              <div>
                <label htmlFor="file">Upload relevant supporting document:</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFile313Change}
                />
              </div>
              <button type="submit" disabled={uploading313 || uploaded313}>
                {uploading313 ? "Submitting..." : uploaded313 ? "Submitted" : "Submit"}
              </button>
              {error313 && <div className="error">{error313}</div>}
            </form>
            )}
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

// Function to handle file change for Criterion 3.1.6
const handleFileChange316 = (e) => {
  setFormData316({ ...formData316, files: e.target.files });
};
const handleSubmit316 = async (e) => {
  e.preventDefault();
  setUploading316(true);

  const dataToSend = new FormData();
  for (const key in formData316) {
    if (key === "files") {
      for (let i = 0; i < formData316[key].length; i++) {
        dataToSend.append(`files316`, formData316[key][i]); // Change field name to match the server endpoint
      }
    } else {
      dataToSend.append(key, formData316[key]);
    }
  }
  const userName = Cookies.get('userName');

  try {
    const response = await axios.post("http://localhost:5000/316upload", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Username": userName
      },
    });
    console.log(response.data);
    setUploaded316(true);
  } catch (error) {
    console.error("Error uploading file:", error);
    setError316("Error uploading file. Please try again.");
  } finally {
    setUploading316(false);
  }
};


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


// Define the schema for Criterion316 collection
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
    type: String,
    required: true
  }});

const Criterion316Model = mongoose.model('Criterion316', Criterion316Schema);

app.post('/316upload', upload.single('files'), async (req, res) => 
{
  try {
    // Extracting data from request
    const { schemeName, principalInvestigator, fundingAgency, type, department, yearOfAward, fundLayoutAmount, duration } = req.body;
    
    // Check if file is uploaded
    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // const { userName } = req.headers; // Uncomment this line or replace with appropriate variable
    const { path: filePath } = req.file;
    const _id = `316${schemeName || 'defaultUserName'}`; // Use defaultUserName or uncomment the line above to extract userName

    // Saving data to the database
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
      filePath
    });
    await newDocument.save();

    return res.status(200).json({ message: 'Data submitted successfully' });
  } 
  catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});