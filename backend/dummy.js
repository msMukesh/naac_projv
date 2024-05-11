



// Initial state for Criterion 3.4.1
const initialFormData341 = {
  researchMethodology: '',
  departmentalEthicsCommittees: '',
  scientificResearchWriting: '',
  plagiarismCheck: '',
  researchAdvisoryCommittee: '',
  otherRelatedItem: '',
  files: null, // File for supporting documents
};

  const [formData341, setFormData341] = useState(initialFormData341);
  const [uploading341, setUploading341] = useState(false);
  const [uploaded341, setUploaded341] = useState(false);
  const [error341, setError341] = useState(null);
  const [toggleForm341, setToggleForm341] = useState(false);

  const handleInputChange341 = (e) => {
    const { name, value } = e.target;
    setFormData341({ ...formData341, [name]: value });
  };

  const handleFileChange341 = (e) => {
    setFormData341({ ...formData341, files: e.target.files });
  };

  const handleToggleForm341 = () => {
    setToggleForm341((prevState) => !prevState);
  };

  const handleSubmit341 = async (e) => {
    e.preventDefault();
    setUploading341(true);
    setError341(null);

    const formData = new FormData();
    const userName = Cookies.get("userName");
    const id = userName + "_341"; // Unique ID for data submission

    formData.append("id", id);
    formData.append("researchMethodology", formData341.researchMethodology);
    formData.append("departmentalEthicsCommittees", formData341.departmentalEthicsCommittees);
    formData.append("scientificResearchWriting", formData341.scientificResearchWriting);
    formData.append("plagiarismCheck", formData341.plagiarismCheck);
    formData.append("researchAdvisoryCommittee", formData341.researchAdvisoryCommittee);
    formData.append("otherRelatedItem", formData341.otherRelatedItem);

    if (formData341.files) {
      formData.append("file", formData341.files[0]); // Supporting document upload
    }

    try {
      await axios.post("http://localhost:5000/341upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData341(initialFormData341); // Reset form data after submission
      setUploaded341(true);

      setTimeout(() => {
        setUploaded341(false); // Reset upload status after some time
      }, 1000);

      setToggleForm341(false); // Hide form after submission
    } catch (error) {
      console.error("Error uploading files:", error);
      setError341("Error uploading files. Please try again.");
    } finally {
      setUploading341(false); // Reset uploading status
    }
  };






  
<div className="formDiv">
      <h4>
        3.4.1 The department ensures implementation of its stated Code of Ethics for research
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm341}>
        {toggleForm341 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm341 && (
        <form onSubmit={handleSubmit341}>
          <div>
            <label htmlFor="researchMethodology">Inclusion of Research ethics in Research Methodology course work:</label>
            <label>
              <input
                type="radio"
                name="researchMethodology"
                value="YES"
                checked={formData341.researchMethodology === 'YES'}
                onChange={handleInputChange341}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="researchMethodology"
                value="NO"
                checked={formData341.researchMethodology === 'NO'}
                onChange={handleInputChange341}
              />
              No
            </label>
          </div>

          <div>
            <label htmlFor="departmentalEthicsCommittees">Presence of Departmental ethics committees (Animal, Chemical, Bio-Ethics, etc.):</label>
            <label>
              <input
                type="radio"
                name="departmentalEthicsCommittees"
                value="YES"
                checked={formData341.departmentalEthicsCommittees === 'YES'}
                onChange={handleInputChange341}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="departmentalEthicsCommittees"
                value="NO"
                checked={formData341.departmentalEthicsCommittees === 'NO'}
                onChange={handleInputChange341}
              />
              No
            </label>
          </div>

          <div>
            <label htmlFor="scientificResearchWriting">Ethics of Scientific Research Writing:</label>
            <label>
              <input
                type="radio"
                name="scientificResearchWriting"
                value="YES"
                checked={formData341.scientificResearchWriting === 'YES'}
                onChange={handleInputChange341}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="scientificResearchWriting"
                value="NO"
                checked={formData341.scientificResearchWriting === 'NO'}
                onChange={handleInputChange341}
              />
              No
            </label>
          </div>

          <div>
            <label htmlFor="plagiarismCheck">Check for Plagiarism and Unfair Means of Research:</label>
            <label>
              <input
                type="radio"
                name="plagiarismCheck"
                value="YES"
                checked={formData341.plagiarismCheck === 'YES'}
                onChange={handleInputChange341}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="plagiarismCheck"
                value="NO"
                checked={formData341.plagiarismCheck === 'NO'}
                onChange={handleInputChange341}
              />
              No
            </label>
          </div>

          <div>
            <label htmlFor="researchAdvisoryCommittee">Research Advisory Committee:</label>
            <label>
              <input
                type="radio"
                name="researchAdvisoryCommittee"
                value="YES"
                checked={formData341.researchAdvisoryCommittee === 'YES'}
                onChange={handleInputChange341}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="researchAdvisoryCommittee"
                value="NO"
                checked={formData341.researchAdvisoryCommittee === 'NO'}
                onChange={handleInputChange341}
              />
              No
            </label>
          </div>

          <div>
            <label htmlFor="otherRelatedItem">Other related items (if any):</label>
            <input
              type="text"
              id="otherRelatedItem"
              name="otherRelatedItem"
              value={formData341.otherRelatedItem}
              onChange={handleInputChange341}
            />
          </div>

          <div>
            <label htmlFor="files">Supporting Documents:</label>
            <input type="file" id="files" name="files" onChange={handleFileChange341} />
          </div>

          <button
            className="submitFormBtn"
            type="submit"
            disabled={uploading341 || uploaded341}
          >
            {uploading341 ? "Submitting..." : uploaded341 ? "Submitted" : "Submit"}
          </button>

          {error341 && <div className="error">{error341}</div>}
        </form>
      )}
    </div>

    {tableData342 && (
    <div>
      <h3>Research Ethics - Criterion 3.4.1</h3>
      <table>
        <thead>
          <tr>
            <th>Research Ethics</th>
            <th>Status</th>
            <th>Details</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData341.map((data, index) => (
            <tr key={index}>
              <td>Inclusion of Research Ethics in Methodology Course Work</td>
              <td>{data.researchMethodology}</td>
              <td>{data.researchMethodologyDetails}</td>
              <td>
                {data.filePath ? (
                  <button onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}












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








<div className="formDiv">
      <h4>3.1.5. Criterion - Facility Submission</h4>
      <button onClick={handleToggleForm315}>
        {toggleForm315 ? 'Hide Form' : 'Show Form'}
      </button>

      {toggleForm315 && (
        <form onSubmit={handleSubmit315}>
          <div>
            <label htmlFor="facilityName">Facility Name:</label>
            <input
              type="text"
              id="facilityName"
              name="facilityName"
              value={formData315.facilityName}
              onChange={handleInputChange315}
            />
          </div>

          <div>
            <label htmlFor="yearOfEstablishment">Year of Establishment:</label>
            <input
              type="number"
              id="yearOfEstablishment"
              name="yearOfEstablishment"
              value={formData315.yearOfEstablishment}
              onChange={handleInputChange315}
            />
          </div>

          <div>
            <label htmlFor="files">Geo-Tagged Picture:</label>
            <input
              type="file"
              id="files"
              name="files"
              onChange={handleFileChange315}
            />
          </div>

          {/* Central Instrumentation Centre */}
          <div>
            <label>Central Instrumentation Centre:</label>
            <label>
              <input
                type="radio"
                name="centralInstrumentationCentre"
                value="YES"
                checked={formData315.centralInstrumentationCentre === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="centralInstrumentationCentre"
                value="NO"
                checked={formData315.centralInstrumentationCentre === 'NO'}
                onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Other Facilities */}
          <div>
            <label>Animal House/Green House:</label>
            <label>
              <input
                type="radio"
                name="animalHouseGreenHouse"
                value="YES"
                checked={formData315.animalHouseGreenHouse === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                  name="animalHouseGreenHouse"
                  value="NO"
                  checked={formData315.animalHouseGreenHouse === 'NO'}
                  onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Museum */}
          <div>
            <label>Museum:</label>
            <label>
              <input
                type="radio"
                name="museum"
                value="YES"
                checked={formData315.museum === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="museum"
                  value="NO"
                  checked={formData315.museum === 'NO'}
                  onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Media Laboratory */}
          <div>
            <label>Media Laboratory:</label>
            <label>
              <input
                type="radio"
                name="mediaLaboratory"
                value="YES"
                checked={formData315.mediaLaboratory === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="mediaLaboratory"
                value="NO"
                checked={formData315.mediaLaboratory === 'NO'}
                onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Business Lab */}
          <div>
            <label>Business Lab:</label>
            <label>
              <input
                type="radio"
                  name="businessLab"
                  value="YES"
                  checked={formData315.businessLab === 'YES'}
                  onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                  name="businessLab"
                  value="NO"
                  checked={formData315.businessLab === 'NO'}
                  onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Research Statistical Databases */}
          <div>
            <label>Research Statistical Databases:</label>
            <label>
              <input
                type="radio"
                name="researchStatisticalDatabases"
                value="YES"
                checked={formData315.researchStatisticalDatabases === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="researchStatisticalDatabases"
                  value="NO"
                  checked={formData315.researchStatisticalDatabases === 'NO'}
                onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Moot Court */}
          <div>
            <label>Moot Court:</label>
            <label>
              <input
                type="radio"
                name="mootCourt"
                value="YES"
                checked={formData315.mootCourt === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                  name="mootCourt"
                  value="NO"
                  checked={formData315.mootCourt === 'NO'}
                  onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Theatre */}
          <div>
            <label>Theatre:</label>
            <label>
              <input
                  type="radio"
                  name="theatre"
                  value="YES"
                  checked={formData315.theatre === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="theatre"
                  value="NO"
                  checked={formData315.theatre === 'NO'}
                  onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Art Gallery */}
          <div>
            <label>Art Gallery:</label>
            <label>
              <input
                  type="radio"
                  name="artGallery"
                  value="YES"
                  checked={formData315.artGallery === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="artGallery"
                  value="NO"
                  checked={formData315.artGallery === 'NO'}
                onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Other Facility */}
          <div>
            <label>Other Facility:</label>
            <label>
              <input
                type="radio"
                name="otherFacility"
                value="YES"
                checked={formData315.otherFacility === 'YES'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="otherFacility"
                value="NO"
                checked={formData315.otherFacility === 'NO'}
                onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={uploading315 }>
            {uploading315 ? 'Submitting...' : 'Submit'}
          </button>
          {uploaded315 && <div>Submission successful!</div>}

          {/* Error Message */}
          {error315 && <div style={{ color: 'red' }}>{error315}</div>}
        </form>
      )}
    </div>
