import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NavBar from "./Navbar";
import "./Criterion3.css";
const Criterion3 = () => {

  // State for Criterion 3.1.1
  const [file311, setFile311] = useState(null);
  const [uploading311, setUploading311] = useState(false);
  const [uploaded311, setUploaded311] = useState(false);
  const [error311, setError311] = useState(null);
  const [criterionNumber, setCriterionNumber] = useState(null);
  // State for Criterion 3.1.2
  const [formData312, setFormData312] = useState({
    teacherName: "",
    amount: "",
    year: "",
    additionalInfo: "",
    file312: null,
  });

  const [toggleForm312, setToggleForm312] = useState(false);
  const [uploading312, setUploading312] = useState(false);
  const [uploaded312, setUploaded312] = useState(false);
  const [error312, setError312] = useState(null);

  const handleToggleForm312 = () => {
    setToggleForm312(!toggleForm312);
  };

  const handleFile311Change = (e) => {
    setFile311(e.target.files[0]);
  };

  const handleFile312Change = (e) => {
    setFormData312({
      ...formData312,
      file312: e.target.files[0],
    });
  };

  const handleInputChange312 = (e) => {
    const { name, value } = e.target;
    setFormData312({
      ...formData312,
      [name]: value,
    });
  };

  const [tableData311, setTableData311] = useState(null);
  const [tableData312, setTableData312] = useState(null);
  const [tableData313, setTableData313] = useState(null);
  const [tableData314, setTableData314] = useState(null);
  const [tableData316, setTableData316] = useState(null);
  const [tableData321, setTableData321] = useState(null);

  const handleUpload311 = async () => {
    if (!file311) {
      setError311("Please select a file.");
      return;
    }

    setUploading311(true);

    try {
      const formData = new FormData();
      formData.append("file", file311);

      // Get user name from cookie
      const userName = Cookies.get("userName");
      formData.append("userName", userName);
      console.log("311 frontend"+userName);
      const response = await axios.post(
        "http://localhost:5000/311upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully.");
      setUploaded311(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError311("Error uploading file. Please try again.");
    } finally {
      setUploading311(false);
    }
    resetFormAndErrors();
  };

  const handleSubmit312 = async (e) => {
    e.preventDefault();
    setUploading312(true);
    const formDataToSend = new FormData();
    const userName = Cookies.get("userName");
    const id = userName + "312"; // Combining userName with "312" to create id
    formDataToSend.append("userName", userName);
    formDataToSend.append("id",id);
    formDataToSend.append("teacherName", formData312.teacherName);
    formDataToSend.append("amount", formData312.amount);
    formDataToSend.append("year", formData312.year);
    formDataToSend.append("additionalInfo", formData312.additionalInfo);
    formDataToSend.append("file", formData312.file312);
// Logging all data in formDataToSend
for (const pair of formDataToSend.entries()) {
  console.log(pair[0], pair[1]);
} const handleToggleForm312 = () => {
    setToggleForm312(!toggleForm312);
  };
    try {
      const response = await axios.post(
        "http://localhost:5000/312upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Data submitted successfully.");
      setUploaded312(true);
      setToggleForm312(!toggleForm312);

    } catch (error) {
      console.error("Error submitting data:", error);
      setError312("Error submitting data. Please try again.");
    } finally {
      setUploading312(false);
    }
    resetFormAndErrors();
  };


  
  // State for Criterion 3.1.3
  const [formData313, setFormData313] = useState({
    year: "",
    teacherName: "",
    designation: "",
    fellowshipType: "",
    fellowshipName: "",
    sponsoringAgency: "",
    file313: null,
  });

  const handleFile313Change = (e) => {
    setFormData313({
      ...formData313,
      file313: e.target.files[0],
    });
  };

  const handleInputChange313 = (e) => {
    const { name, value } = e.target;
    setFormData313({
      ...formData313,
      [name]: value,
    });
  };

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
    const userName = Cookies.get("userName");
    const id = userName + "312"; // Combining userName with "312" to create id
    formDataToSend.append("id",id);
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

      setToggleForm313(!toggleForm313);

    } catch (error) {
      console.error("Error submitting data:", error);
      setError313("Error submitting data. Please try again.");
    } finally {
      setUploading313(false);
    }

    resetFormAndErrors();

  };

  async function getDetails() {
    try {
      const response = await axios.get("http://localhost:5000/getFile311");
      console.log(response.data);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching details:", error);
      // Handle errors
    }
  }
  

  useEffect(()=>{
    getDetails()

  },[])
  


  const [formData314, setFormData314] = useState({
    fellowName: '',
    yearOfEnrollment: '',
    duration: '',
    fellowshipType: '',
    grantingAgency: '',
    file314: null,
  });
  const [uploading314, setUploading314] = useState(false);
  const [uploaded314, setUploaded314] = useState(false);
  const [error314, setError314] = useState(null);

  const handleInputChange314 = (e) => {
    const { name, value } = e.target;
    setFormData314({ ...formData314, [name]: value });
  };

  const handleFileChange314 = (e) => {
    setFormData314({ ...formData314, file314: e.target.files });
  };

  const handleSubmit314 = async (e) => {
    e.preventDefault();
    setUploading314(true);

    const formData = new FormData();
    const userName = Cookies.get("userName");
    const id = userName + "312"; // Combining userName with "312" to create id
    formData.append("id",id);
    formData.append('fellowName', formData314.fellowName);
    formData.append('yearOfEnrollment', formData314.yearOfEnrollment);
    formData.append('duration', formData314.duration);
    formData.append('fellowshipType', formData314.fellowshipType);
    formData.append('grantingAgency', formData314.grantingAgency);
    if (formData314.file314) {
      formData.append("file", formData314.file314[0]); // Corrected typo
    }
    
    try {
      const response = await axios.post("http://localhost:5000/314upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Data submitted successfully.");
      setUploaded314(true);

      setToggleForm314(!toggleForm314);

    } 
    catch (error) {
      console.error("Error uploading file:", error);
      setError314("Error uploading file. Please try again.");
    } 
    finally {
      setUploading314(false);
    }

    resetFormAndErrors();

  };
  
  
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
  const userName = Cookies.get("userName");
  const id = userName + "312"; // Combining userName with "312" to create id
  dataToSend.append("id",id);
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
    alert("Data submitted successfully.");
    setUploaded316(true);
    setToggleForm316(!toggleForm316);

  } catch (error) {
    console.error("Error uploading files:", error);
    setError316("Error uploading files. Please try again.");
  } finally {
    setUploading316(false);
  }
  resetFormAndErrors();
};

// State for Criterion 3.2.1
const [formData321, setFormData321] = useState({
  projectName: "",
  principalInvestigator: "",
  fundingAgency: "",
  fundingType: "", // Include fundingType
  department: "", // Corrected field name
  yearOfAward: "",
  fundsProvided: "",
  duration: "",
  files: null,
});

const [uploading321, setUploading321] = useState(false);
const [uploaded321, setUploaded321] = useState(false);
const [error321, setError321] = useState(null);

// Function to handle form input change for Criterion 3.2.1
const handleInputChange321 = (e) => {
  const { name, value } = e.target;
  setFormData321({ ...formData321, [name]: value });
};

const handleFileChange321 = (e) => {
  setFormData321({ ...formData321, files: e.target.files });
};

const handleSubmit321 = async (e) => {
  e.preventDefault();
  setUploading321(true);

  const dataToSend = new FormData();
  const userName = Cookies.get("userName");
  const id = userName + "321"; // Combining userName with "321" to create id
  dataToSend.append("id", id);
  // Append other form data fields
  dataToSend.append("projectName", formData321.projectName);
  dataToSend.append("principalInvestigator", formData321.principalInvestigator);
  dataToSend.append("fundingAgency", formData321.fundingAgency);
  dataToSend.append("fundingType", formData321.fundingType);
  dataToSend.append("department", formData321.department); // Corrected field name
  dataToSend.append("yearOfAward", formData321.yearOfAward);
  dataToSend.append("fundsProvided", formData321.fundsProvided);
  dataToSend.append("duration", formData321.duration);

  // Append the file
  if (formData321.files) {
    dataToSend.append("file", formData321.files[0]); // Assuming only one file is uploaded
  }

  try {
    const response = await axios.post("http://localhost:5000/321upload", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    setUploaded321(true);
    setToggleForm321(!toggleForm321);

  } catch (error) {
    console.error("Error uploading files:", error);
    setError321("Error uploading files. Please try again.");
  } finally {
    setUploading321(false);
  }
  resetFormAndErrors(); // Assuming you have a function to reset form and errors
};



// Inside your component function
const [toggleForm314, setToggleForm314] = useState(false);
const [toggleForm316, setToggleForm316] = useState(false);
const [toggleForm321, setToggleForm321] = useState(false);


const handleToggleForm314 = () => {
  setToggleForm314(!toggleForm314);
};

const handleToggleForm316 = () => {
  setToggleForm316(!toggleForm316);
};

const handleToggleForm321 = () => {
  setToggleForm321(!toggleForm321);
};

// Function to reset form data and clear errors
const resetFormAndErrors = () => {
  setFile311(null);
  setFormData312({
    teacherName: "",
    amount: "",
    year: "",
    additionalInfo: "",
    file312: null,
  });
  setFormData313({
    year: "",
    teacherName: "",
    designation: "",
    fellowshipType: "",
    fellowshipName: "",
    sponsoringAgency: "",
    file313: null,
  });
  setUploaded311(false);
  setUploaded312(false);
  setUploaded313(false);
  setError311(null);
  setError312(null);
  setError313(null);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const userName = Cookies.get("userName");
      const criterionNumbers = [311, 312, 313, 314, 316, 321];
      const promises = criterionNumbers.map(async (number) => {
        try {
          const response = await axios.get(`http://localhost:5000/getFile${number}?userName=${userName}`);
          return response.data.data;
        } catch (error) {
          // If the error is 404, return null, indicating data not found
          if (error.response && error.response.status === 404) {
            return null;
          }
          // For other errors, rethrow the error
          throw error;
        }
      });
      const results = await Promise.all(promises);
      // Update the state only for requests that succeed
      setTableData311(results[0]); // Store result for criterion 311
      setTableData312(results[1]); // Store result for criterion 312
      setTableData313(results[2]); // Store result for criterion 313
      setTableData314(results[3]); // Store result for criterion 314
      setTableData316(results[4]); // Store result for criterion 316
      setTableData321(results[5]); // Store result for criterion 321
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  fetchData();
}, [ uploaded311,uploaded312,uploaded313,uploaded314,uploaded316,uploaded321]); // Fetch data on component mount


const handleDownloadFile = (fileName) => {
  window.open(`http://localhost:5000/downloadFile?fileName=${encodeURIComponent(fileName)}`, "_blank");
};




  return (
    <div className="displayContainer" >
      <NavBar />
      <div className="criterion-container">

      <div className="criterionCon31">

          <h2 class="criterionMainTitle">Criterion III - Research, Innovations and Extension</h2>
          <h3 className="subTitle">Key Indicator - 3.1 Promotion of Research and Facilities</h3>

          {/* Criterion 3.1.1 Form */}
          <div className="formDiv">
              <h4>3.1.1 The institution Research facilities are frequently updated and there is well defined policy for
                        promotion of research which is uploaded on the institutional website and implemented 
              </h4>

              <p>Upload relevant supporting document </p>
                        <input type="file" onChange={handleFile311Change} />
                      <button className="submitFormBtn" onClick={handleUpload311} disabled={uploading311 || uploaded311}>
                        {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
                      </button>
                      {error311 && <div className="error">{error311}</div>}
          </div>

              {/* Display table if data is available */}
              {tableData311 && (
                      <div>
                        <table>
                          <thead>
                            <tr>
                              <th>User Name</th>
                              <th>File </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{tableData311.userName}</td>

                              <td>
                                <button className="Downloadbtn" onClick={() => handleDownloadFile(tableData311.filePath)}>
                                  Download File
                                </button>
                              </td>

                              {/* <td>{tableData311.filePath}</td> */}

                                </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

          {/* Criterion 3.1.2 Form */}
          <div className="formDiv">
          <h4>3.1.2 The institution provides seed money to its teachers for research (amount INR in Lakhs)
          </h4>            <button className="toggleFormbtn" onClick={handleToggleForm312}>
              {toggleForm312 ? "Hide Form" : "Show Form"}
            </button>

            {toggleForm312 && (
              <form  onSubmit={handleSubmit312}>
                <div>
                  <label htmlFor="teacherName">Name of the teacher:</label>
                  <input
                    type="text"
                    id="teacherName"
                    name="teacherName"
                    value={formData312.teacherName}
                    onChange={handleInputChange312}
                  />
                </div>
                <div>
                  <label htmlFor="amount">The amount of seed money (INR Lakhs):</label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData312.amount}
                    onChange={handleInputChange312}
                  />
                </div>
                <div>
                  <label htmlFor="year">Year of receiving grant:</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData312.year}
                    onChange={handleInputChange312}
                  />
                </div>
                <div>
                  <label htmlFor="additionalInfo">
                    Any additional information:
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData312.additionalInfo}
                    onChange={handleInputChange312}
                  ></textarea>
                </div>
                <div>
                <h5>Document to Attach:</h5>

                <div>
                  <ul>●	Budget and expenditure statements signed by the Finance Officer indicating the amount of seed money provided and utilized</ul>
                  <ul>●	Upload relevant supporting document</ul>
                </div>
                
                </div>
                <div>
                  <label htmlFor="file">Upload relevant supporting document:</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFile312Change}
                  />
                </div>
                <button  className="submitFormBtn" type="submit" disabled={uploading312 || uploaded312}>
                  {uploading312 ? "Submitting..." : uploaded312 ? "Submitted" : "Submit"}
                </button>
                {error312 && <div className="error">{error312}</div>}
              </form>
            )}
          </div>
 {/* Display table if data is available */}
 {tableData312 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>TeacherName</th>
                <th>Amount</th>
                <th>year</th>
                <th>AdditionalInfo</th>
                <th>File</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tableData312.teacherName}</td>
                <td>{tableData312.amount}</td>
                <td>{tableData312.year}</td>
                <td>{tableData312.additionalInfo}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(tableData312.filePath)}>
                  Download File
                  </button>
                </td>
{/* <td>{tableData312.filePath}</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      )}


          {/* Criterion 3.1.3 Form */}
          <div className="formDiv">
          <h4>3.1.3 Teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research during the year
            </h4>              
            <button className="toggleFormbtn" onClick={handleToggleForm313}>
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
                <h5>Document to Attach:</h5>
                <div>
                  <ul>●		e-copies of the award letters of the teachers</ul>
                  <ul>●		Any additional information</ul>
                </div>
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
              <button className="submitFormBtn" type="submit" disabled={uploading313 || uploaded313}>
                {uploading313 ? "Submitting..." : uploaded313 ? "Submitted" : "Submit"}
              </button>
              {error313 && <div className="error">{error313}</div>}
            </form>
            )}
          </div>

          {tableData313 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>year</th>
                <th>teacherName</th>
                <th>designation</th>
                <th>fellowshipName</th>
                <th>sponsoringAgency</th>
                <th>File</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tableData313.year}</td>
                <td>{tableData313.teacherName}</td>
                <td>{tableData313.designation}</td>
                <td>{tableData313.fellowshipName}</td>
                <td>{tableData313.sponsoringAgency}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(tableData313.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData313.filePath}</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      )}


<div className="formDiv">
    <h4>Criterion 3.1.4 - JRFs, SRFs, Post-Doctoral Fellows, Research Associates, and other research fellows enrolled in the institution during the year</h4>
    <button className="toggleFormbtn"  onClick={handleToggleForm314}>
      {toggleForm314 ? "Hide Form" : "Show Form"}
    </button>
    {toggleForm314 && (
      <form onSubmit={handleSubmit314}>
      <div>
        <label htmlFor="fellowName">Name of Research Fellow / Enrollment No.:</label>
        <input
          type="text"
          id="fellowName"
          name="fellowName"
          value={formData314.fellowName}
          onChange={handleInputChange314}
        />
    </div>

    <div>
      <label htmlFor="yearOfEnrollment">Year of Enrolment:</label>
      <input
        type="text"
        id="yearOfEnrollment"
        name="yearOfEnrollment"
        value={formData314.yearOfEnrollment}
        onChange={handleInputChange314}
      />
    </div>
    <div>
      <label htmlFor="duration">Duration of Fellowship:</label>
      <input
        type="text"
        id="duration"
        name="duration"
        value={formData314.duration}
        onChange={handleInputChange314}
      />
    </div>
    <div>
      <label htmlFor="fellowshipType">Type of the Fellowship:</label>
      <input
        type="text"
        id="fellowshipType"
        name="fellowshipType"
        value={formData314.fellowshipType}
        onChange={handleInputChange314}
      />
    </div>
    <div>
      <label htmlFor="grantingAgency">Granting Agency:</label>
      <input
        type="text"
        id="grantingAgency"
        name="grantingAgency"
        value={formData314.grantingAgency}
        onChange={handleInputChange314}
      />
    </div>
              
    <div>
      <label htmlFor="file314">Document to Attach:</label>
      <div>
        <ul>●	e-copies of the award letters of the teachers</ul>
        <ul>●	Any additional information</ul>
      </div>

      <input type="file" id="file314" name="file314" onChange={handleFileChange314} />
    </div>
    <button className="submitFormBtn" type="submit" disabled={uploading314 || uploaded314}>
      {uploading314 ? "Submitting..." : uploaded314 ? "Submitted" : "Submit"}
    </button>
    {error314 && <div className="error">{error314}</div>}
  </form>
  )}
</div>

{tableData314 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>fellowName</th>
                <th>yearOfEnrollment</th>
                <th>duration</th>
                <th>fellowshipType</th>
                <th>grantingAgency</th>
                <th>File</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tableData314.fellowName}</td>
                <td>{tableData314.yearOfEnrollment}</td>
                <td>{tableData314.duration}</td>
                <td>{tableData314.fellowshipType}</td>
                <td>{tableData314.grantingAgency}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(tableData314.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData314.filePath}</td> */}


              </tr>
            </tbody>
          </table>
        </div>
      )}



{/* Criterion 3.1.6 Form */}
          <div className="formDiv">
  <h4>Criterion 3.1.6 - Departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR, and other recognitions by national and international agencies during the year</h4>
  <button className="toggleFormbtn" onClick={handleToggleForm316}>
    {toggleForm316 ? "Hide Form" : "Show Form"}
  </button>
  {toggleForm316 && (
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
      <div>
        <ul>● Copy of Sanction order</ul>
        <ul>●	Copy of Releasing of First Installment  </ul>
        <ul>●  Any additional information</ul>
      </div>
      <input
        type="file"
        id="files"
        name="files"
        multiple
        onChange={handleFileChange316}
      />
    </div>


            <button className="submitFormBtn" type="submit" disabled={uploading316 || uploaded316}>
              {uploading316 ? "Submitting..." : uploaded316? "Submitted" : "Submit"}
            </button>
            {error316 && <div className="error">{error316}</div>}
          </form>
          )}
        </div>

        {tableData316 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>schemeName</th>
                <th>principalInvestigator</th>
                <th>fundingAgency</th>
                <th>type</th>
                <th>department</th>
                <th>yearOfAward</th>
                <th>fundLayoutAmount</th>
                <th>duration</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tableData316.schemeName}</td>
                <td>{tableData316.principalInvestigator}</td>
                <td>{tableData316.fundingAgency}</td>
                <td>{tableData316.type}</td>
                <td>{tableData316.department}</td>
                <td>{tableData316.yearOfAward}</td>
                <td>{tableData316.fundLayoutAmount}</td>
                <td>{tableData316.duration}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(tableData316.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData316.filePath}</td> */}

              </tr>
            </tbody>
          </table>
        </div>
      )}


</div>


<div className="criterionCon32">
  <h3 className="subTitle">Key Indicator - 3.2 Resource Mobilization for Research</h3>

  <div className="formDiv">

  <h4>3.2.1 Extramural funding for Research (Grants sponsored by non-government sources such as industry, corporate houses, international bodies for research projects), endowments, Chairs in the University during the year (INR in Lakhs)</h4>
  <button className="toggleFormbtn" onClick={handleToggleForm321}>
    {toggleForm321 ? "Hide Form" : "Show Form"}
  </button>
  {toggleForm321 && (
    <form onSubmit={handleSubmit321}>
      <div>
        <label htmlFor="projectName">Name of the Project:</label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={formData321.projectName}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="principalInvestigator">Name of the Principal Investigator / Co-principal investigator:</label>
        <input
          type="text"
          id="principalInvestigator"
          name="principalInvestigator"
          value={formData321.principalInvestigator}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="fundingAgency">Name of the Funding Agency:</label>
        <input
          type="text"
          id="fundingAgency"
          name="fundingAgency"
          value={formData321.fundingAgency}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="fundingType">Type of funding agency Govt. / Non Govt.:</label>
        <input
          type="text"
          id="fundingType"
          name="fundingType"
          value={formData321.fundingType}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="department">department.:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData321.department}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="yearOfAward">Year of Award:</label>
        <input
          type="text"
          id="yearOfAward"
          name="yearOfAward"
          value={formData321.yearOfAward}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="fundsProvided">Funds (Amount) Provided:</label>
        <input
          type="text"
          id="fundsProvided"
          name="fundsProvided"
          value={formData321.fundsProvided}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData321.duration}
          onChange={handleInputChange321}
        />
      </div>
      <div>
        <label htmlFor="file321">Document to Attach:</label>
        <div>
          <ul>● Copy of Sanction order</ul>
          <ul>● Copy of Releasing of Funds (First Installment)</ul>
          <ul>● Any additional information</ul>
        </div>
        <input type="file" id="file321" name="file321" onChange={handleFileChange321} />
      </div>
      <button className="submitFormBtn" type="submit" disabled={uploading321 || uploaded321}>
        {uploading321 ? "Submitting..." : uploaded321 ? "Submitted" : "Submit"}
      </button>
      {error321 && <div className="error">{error321}</div>}
    </form>
  )}
</div>
{tableData321 && (
  <div>
    <table>
      <thead>
        <tr>
          <th>Name of the Project</th>
          <th>Name of the Principal Investigator / Co-principal investigator</th>
          <th>Name of the Funding Agency</th>
          <th>Type of funding agency Govt. / Non Govt.</th>
          <th>department.</th>
          <th>Year of Award</th>
          <th>Funds (Amount) Provided</th>
          <th>Duration</th>
          <th>File </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{tableData321.projectName}</td>
          <td>{tableData321.principalInvestigator}</td>
          <td>{tableData321.fundingAgency}</td>
          <td>{tableData321.fundingType}</td>
          <td>{tableData321.department}</td>
          <td>{tableData321.yearOfAward}</td>
          <td>{tableData321.fundsProvided}</td>
          <td>{tableData321.duration}</td>
          <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(tableData321.filePath)}>
                  Download File
                  </button>
                </td>
          {/* <td>{tableData321.filePath}</td> */}
        </tr>
      </tbody>
    </table>
  </div>
)}

</div>


</div>
    </div>
  );
};

export default Criterion3;