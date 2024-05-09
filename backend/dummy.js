const initialFormData322 = {
  projectName: "",
  principalInvestigator: "",
  yearOfAward: "",
  fundsProvided: "",
  duration: "",
  fundingAgency: "",
  totalAmountFundsReceived: "",
  files: null, // Field for file uploads
};

const [formData322, setFormData322] = useState(initialFormData322);
const [uploading322, setUploading322] = useState(false);
const [uploaded322, setUploaded322] = useState(false);
const [error322, setError322] = useState(null);
const [toggleForm322, setToggleForm322] = useState(false);

const handleInputChange322 = (e) => {
  const { name, value } = e.target;
  setFormData322({ ...formData322, [name]: value });
};

const handleFileChange322 = (e) => {
  setFormData322({ ...formData322, files: e.target.files });
};

const handleToggleForm322 = () => {
  setToggleForm322((prevState) => !prevState);
};

const handleSubmit322 = async (e) => {
  e.preventDefault();
  setUploading322(true);
  setError322(null);

  const formData = new FormData();
  const userName = Cookies.get("userName");
  const id = userName + "322"; // Unique ID for the data submission

  formData.append("id", id);
  formData.append("projectName", formData322.projectName);
  formData.append("principalInvestigator", formData322.principalInvestigator);
  formData.append("yearOfAward", formData322.yearOfAward);
  formData.append("fundsProvided", formData322.fundsProvided);
  formData.append("duration", formData322.duration);
  formData.append("fundingAgency", formData322.fundingAgency);
  formData.append("totalAmountFundsReceived", formData322.totalAmountFundsReceived);

  if (formData322.files) {
    formData.append("file", formData322.files[0]); // Assuming only one file
  }

  try {
    await axios.post("http://localhost:5000/322upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFormData322(initialFormData322);
    setUploaded322(true);

    setTimeout(() => {
      setUploaded322(false); // Reset uploaded status after some time
    }, 1000);

    

    setToggleForm322(false); // Hide form after submission
  } catch (error) {
    console.error("Error uploading files:", error);
    setError322("Error uploading files. Please try again.");
  } finally {
    setUploading322(false);
  }
};


<div className="formDiv">
      <h4>3.2.3 Research projects funded by government and non-government agencies during the year</h4>
      <button className="toggleFormbtn" onClick={handleToggleForm323}>
        {toggleForm323 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm323 && (
        <form onSubmit={handleSubmit323}>
          <div>
            <label htmlFor="projectName">Name of the Project:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData323.projectName}
              onChange={handleInputChange323}
            />
          </div>

          <div>
            <label htmlFor="principalInvestigator">Name of the Principal Investigator & Department:</label>
            <input
              type="text"
              id="principalInvestigator"
              name="principalInvestigator"
              value={formData323.principalInvestigator}
              onChange={handleInputChange323}
            />
          </div>

          <div>
            <label htmlFor="researchProjectName">Name of the Research Project:</label>
            <input
              type="text"
              id="researchProjectName"
              name="researchProjectName"
              value={formData323.researchProjectName}
              onChange={handleInputChange323}
            />
          </div>

          <div>
            <label htmlFor="fundsReceived">Amount/Funds Received:</label>
            <input
              type="text"
              id="fundsReceived"
              name="fundsReceived"
              value={formData323.fundsReceived}
              onChange={handleInputChange323}
            />
          </div>

          <div>
            <label htmlFor="fundingAgency">Name of Funding Agency:</label>
            <input
              type="text"
              id="fundingAgency"
              name="fundingAgency"
              value={formData323.fundingAgency}
              onChange={handleInputChange323}
            />
          </div>

          <div>
            <label htmlFor="yearOfSanction">Year of Sanction:</label>
            <input
              type="text"
              id="yearOfSanction"
              name="yearOfSanction"
              value={formData323.yearOfSanction}
              onChange={handleInputChange323}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Supporting document from the Funding Agency</ul>
              <ul>• Copy of Releasing of Funds</ul>
              <ul>• Any additional information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange323} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading323 || uploaded323}>
            {uploading323 ? "Submitting..." : uploaded323 ? "Submitted" : "Submit"}
          </button>

          {error323 && <div className="error">{error323}</div>}
        </form>
      )}
    </div>


    {tableData323 && (

    <div>
      <h3>Research Projects - Criterion 3.2.3</h3>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Principal Investigator & Department</th>
            <th>Research Project Name</th>
            <th>Funds Received</th>
            <th>Funding Agency</th>
            <th>Year of Sanction</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData323.map((data, index) => (
            <tr key={index}>
              <td>{data.projectName}</td>
              <td>{data.principalInvestigator}</td>
              <td>{data.researchProjectName}</td>
              <td>{data.fundsReceived}</td>
              <td>{data.fundingAgency}</td>
              <td>{data.yearOfSanction}</td>
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
