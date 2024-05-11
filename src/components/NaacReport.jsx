import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NavBar from "./Navbar";
import "./Criterion3.css";
const NaacReport = () => {

  const [tableData311, setTableData311] = useState(null);
  const [tableData312, setTableData312] = useState(null);
  const [tableData313, setTableData313] = useState(null);
  const [tableData314, setTableData314] = useState(null);
  const [tableData316, setTableData316] = useState(null);
  const [tableData321, setTableData321] = useState(null);

const[handleDeleteFlag,sethandleDeleteFlag]=useState(false);

  const handleDelete = async (id) => {
    sethandleDeleteFlag(!handleDeleteFlag);
    try {
      const response = await axios.delete(`http://localhost:5000/deleteFile/${id}`);
      if (response.status === 200) {
        console.log(`Successfully deleted item with ID: ${id}`);
        
        // Get the criterion number from the first three characters of the ID
        const criterionNumber = id.substring(0, 3);
  
        // Dynamically get the state variable and setter function for the given criterion
        const tableDataName = `tableData${criterionNumber}`;
        const setTableDataName = `setTableData${criterionNumber}`;
  
        // Access the state variable and setter function dynamically
        const currentTableData = this[tableDataName];
        const setCurrentTableData = this[setTableDataName];
  
        // Update the corresponding state by filtering out the deleted item
        setCurrentTableData(currentTableData.filter((data) => data._id !== id));
      }
    } catch (error) {
      console.error(`Error deleting item with ID: ${id}:`, error);
    }
  };
  

  
  // State for Criterion 3.1.1
  const [file311, setFile311] = useState(null);
  const [uploading311, setUploading311] = useState(false);
  const [uploaded311, setUploaded311] = useState(false);
  const [error311, setError311] = useState(null);

  const handleFile311Change = (e) => {
    setFile311(e.target.files[0]);
    setUploaded311(false); // Reset the upload status
    setError311(null); // Reset any errors
  };

  const [criterionNumber, setCriterionNumber] = useState(null);

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
 // Reset the form and update states after successful upload
      setUploaded311(true); // Set upload status to true

 // Reset the file input after 3 seconds
 setTimeout(() => {
  setUploaded311(false); // Reset uploaded status to false after 3 seconds
}, 1000); // 3000 milliseconds = 3 seconds


      setFile311(null); // Reset the file input

    } catch (error) {
      console.error("Error uploading file:", error);
      setError311("Error uploading file. Please try again.");
    } finally {
      setUploading311(false);
    }
    // resetFormAndErrors();
  };


// Initial state for Criterion 3.1.2
const initialFormData312 = {
  teacherName: "",
  amount: "",
  year: "",
  additionalInfo: "",
  file312: null,
};

// State for Criterion 3.1.2
const [formData312, setFormData312] = useState(initialFormData312);

  const [toggleForm312, setToggleForm312] = useState(false);
  const [uploading312, setUploading312] = useState(false);
  const [uploaded312, setUploaded312] = useState(false);
  const [error312, setError312] = useState(null);

  const handleToggleForm312 = () => {
    setToggleForm312(!toggleForm312);
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


  const handleSubmit312 = async (e) => {
    e.preventDefault();
    setUploading312(true);
  
    // Initialize FormData
    const formDataToSend = new FormData();
    const userName = Cookies.get("userName");
    const id = userName + "312";
  
    // Add form data
    formDataToSend.append("userName", userName);
    formDataToSend.append("id", id);
    formDataToSend.append("teacherName", formData312.teacherName);
    formDataToSend.append("amount", formData312.amount);
    formDataToSend.append("year", formData312.year);
    formDataToSend.append("additionalInfo", formData312.additionalInfo);
  
    // Add file if it exists
    if (formData312.file312) {
      formDataToSend.append("file", formData312.file312); // Add file only if provided
    }
  
    try {
      const response = await axios.post("http://localhost:5000/312upload", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Server response:", response.data);
      alert("Data submitted successfully.");
  
      // Reset form data and state after successful submission
      setFormData312(initialFormData312); // Reset form
      setUploaded312(true); // Indicate success
  
      // Reset upload status after a delay
      setTimeout(() => {
        setUploaded312(false); // Reset uploaded status
      }, 1000);
  
      setToggleForm312(false); // Hide the form on success
    } catch (error) {
      console.error("Error submitting data:", error);
      setError312("Error submitting data. Please try again.");
    } finally {
      setUploading312(false);
    }
  };
  
  
  // Initial state for Criterion 3.1.3
const initialFormData313 = {
  year: "",
  teacherName: "",
  designation: "",
  fellowshipType: "",
  fellowshipName: "",
  sponsoringAgency: "",
  file313: null,
};

// State for Criterion 3.1.3
const [formData313, setFormData313] = useState(initialFormData313);

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
    const id = userName + "313"; // Combining userName with "312" to create id
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
      setFormData313(initialFormData313);


     // Reset the form and update states after successful upload
     setUploaded313(true); // Set upload status to true
     // Reset the file input after 3 seconds
     setTimeout(() => {
      setUploaded313(false); // Reset uploaded status to false after 3 seconds
    }, 1000); // 3000 milliseconds = 3 seconds




      setToggleForm313(!toggleForm313);

    } catch (error) {
      console.error("Error submitting data:", error);
      setError313("Error submitting data. Please try again.");
    } finally {
      setUploading313(false);
    }

    // resetFormAndErrors();

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
  

  // Initial state for Criterion 3.1.3
const initialFormData314 = {
  fellowName: '',
  yearOfEnrollment: '',
  duration: '',
  fellowshipType: '',
  grantingAgency: '',
  file314: null,
};

// State for Criterion 3.1.3
const [formData314, setFormData314] = useState(initialFormData314);


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
    const id = userName + "314"; // Combining userName with "312" to create id
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
      setFormData314(initialFormData314);

          // Reset the form and update states after successful upload
     setUploaded314(true); // Set upload status to true
     // Reset the file input after 3 seconds
     setTimeout(() => {
      setUploaded314(false); // Reset uploaded status to false after 3 seconds
    }, 1000); // 3000 milliseconds = 3 seconds
      setToggleForm314(!toggleForm314);

    } 
    catch (error) {
      console.error("Error uploading file:", error);
      setError314("Error uploading file. Please try again.");
    } 
    finally {
      setUploading314(false);
    }

    // resetFormAndErrors();

  };
  
  

// Initial state for Criterion 3.1.6
const initialFormData316 = {
  schemeName: "",
  principalInvestigator: "",
  fundingAgency: "",
  type: "",
  department: "",
  yearOfAward: "",
  fundLayoutAmount: "",
  duration: "",
  files: null,
};

// State for Criterion 3.1.6
const [formData316, setFormData316] = useState(initialFormData316);
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
  const id = userName + "316"; // Combining userName with "312" to create id
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
    setFormData316(initialFormData316);

        // Reset the form and update states after successful upload
        setUploaded316(true); // Set upload status to true
        // Reset the file input after 3 seconds
        setTimeout(() => {
         setUploaded316(false); // Reset uploaded status to false after 3 seconds
       }, 1000); // 3000 milliseconds = 3 seconds

       
    setToggleForm316(!toggleForm316);

  } catch (error) {
    console.error("Error uploading files:", error);
    setError316("Error uploading files. Please try again.");
  } finally {
    setUploading316(false);
  }
  // resetFormAndErrors();
};

// Initial state for Criterion 3.2.1
const initialFormData321 = {
  projectName: "",
  principalInvestigator: "",
  fundingAgency: "",
  fundingType: "", // Include funding type
  department: "", // Corrected field name
  yearOfAward: "",
  fundsProvided: "",
  duration: "",
  files: null, // Field for file uploads
};

// State for Criterion 3.2.1
const [formData321, setFormData321] = useState(initialFormData321);

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

    setFormData321(initialFormData321);

    // Reset the form and update states after successful upload
    setUploaded321(true); // Set upload status to true
    // Reset the file input after 3 seconds
    setTimeout(() => {
     setUploaded321(false); // Reset uploaded status to false after 3 seconds
   }, 1000); // 3000 milliseconds = 3 seconds

   setToggleForm321(!toggleForm321);

  } catch (error) {
    console.error("Error uploading files:", error);
    setError321("Error uploading files. Please try again.");
  } finally {
    setUploading321(false);
  }
// resetFormAndErrors();   // Assuming you have a function to reset form and errors
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
// const resetFormAndErrors = () => {
//   setFile311(null);
//   setFormData312({
//     teacherName: "",
//     amount: "",
//     year: "",
//     additionalInfo: "",
//     file312: null,
//   });
//   setFormData313({
//     year: "",
//     teacherName: "",
//     designation: "",
//     fellowshipType: "",
//     fellowshipName: "",
//     sponsoringAgency: "",
//     file313: null,
//   });
//   setUploaded311(false);
//   setUploaded312(false);
//   setUploaded313(false);
//   setError311(null);
//   setError312(null);
//   setError313(null);
// };

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const userName = Cookies.get("userName");
//       const criterionNumbers = [311, 312, 313, 314, 316, 321];
//       const promises = criterionNumbers.map(async (number) => {
//         try {
//           const response = await axios.get(`http://localhost:5000/getFile${number}`);
//           return response.data.data;
//         } catch (error) {
//           // If the error is 404, return null, indicating data not found
//           if (error.response && error.response.status === 404) {
//             return null;
//           }
//           // For other errors, rethrow the error
//           throw error;
//         }
//       });
//       const results = await Promise.all(promises);
//       // Update the state only for requests that succeed
//       setTableData311(results[0]); // Store result for criterion 311
//       setTableData312(results[1]); // Store result for criterion 312
//       setTableData313(results[2]); // Store result for criterion 313
//       setTableData314(results[3]); // Store result for criterion 314
//       setTableData316(results[4]); // Store result for criterion 316
//       setTableData321(results[5]); // Store result for criterion 321
//     } catch (error) {
//       console.error("Error fetching table data:", error);
//     }
//   };

//   fetchData();
// }, [ uploaded311,uploaded312,uploaded313,uploaded314,uploaded316,uploaded321]); // Fetch data on component mount


useEffect(() => {
  const fetchData = async () => {
    try {
      const userName = Cookies.get("userName");
      const criterionNumbers = [311, 312, 313, 314, 316, 321];

      // Construct query parameters
      const params = {
        userName,
        criterionNumbers: criterionNumbers.join(','),
      };

      // Send GET request with query parameters
      const response = await axios.get("http://localhost:5000/getFilesByCriteria", { params });

      const results = response.data.results; // Each element is an array of data for a criterion
      // Update the state with the corresponding results
      setTableData311(results[0]); // Update with array for criterion 311
      console.log("results[0]): "+results[0]);

      setTableData312(results[1]); // Update with array for criterion 312
      console.log("results[1]): "+results[1]);

      setTableData313(results[2]); // Update with array for criterion 313
      console.log("results[2]: "+results[2]);

      setTableData314(results[3]); // Update with array for criterion 314
      console.log("results[3]: "+results[3]);

      setTableData316(results[4]); // Update with array for criterion 316
      console.log("results[4]: "+results[4]);

      setTableData321(results[5]); // Update with array for criterion 321
      console.log("results[5]: "+results[5]);

    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  fetchData(); // Fetch data once when the component mounts
 }, [ uploaded311,uploaded312,uploaded313,uploaded314,uploaded316,uploaded321,handleDeleteFlag]); // Fetch data on component mount


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
          </div>

          {tableData311 && (
  <div>
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>File</th>
          <th>Actions</th> {/* New column for the action buttons */}
        </tr>
      </thead>
      <tbody>
        {/* Map over the tableData311 array to create a row for each object */}
        {tableData311.map((data, index) => (
          <tr key={index}>
            <td>{data._id}</td> {/* ID column */}
            <td>
              <button
                className="Downloadbtn"
                onClick={() => handleDownloadFile(data.filePath)}
              >
                Download File
              </button>
            </td>
            <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)}
              >
                Delete
              </button>
            
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



          {/* Criterion 3.1.2 Form */}
          <div className="formDiv">
          <h4>3.1.2 The institution provides seed money to its teachers for research (amount INR in Lakhs)
          </h4>       
          
            

           
          </div>
 {/* Display table if data is available */}
 {tableData312 && (
  <div>
    <table>
      <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Amount</th>
          <th>Year</th>
          <th>Additional Info</th>
          <th>File</th>
          <th>Actions</th> {/* New column for delete/edit buttons */}
        </tr>
      </thead>
      <tbody>
        {tableData312.map((data, index) => (
          <tr key={index}>
            <td>{data.teacherName}</td>
            <td>{data.amount}</td>
            <td>{data.year}</td>
            <td>{data.additionalInfo}</td>
            <td>
              <button
                className="Downloadbtn"
                onClick={() => handleDownloadFile(data.filePath)}
              >
                Download File
              </button>
            </td>
            <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              {/* <button
                className="Editbtn"
                onClick={() => console.log(`Edit item with ID: ${data._id}`)}
              >
                Edit
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



          {/* Criterion 3.1.3 Form */}
          <div className="formDiv">
          <h4>3.1.3 Teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research during the year
            </h4>              
         
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
                <th>Actions</th> {/* New column for delete/edit buttons */}

              </tr>
            </thead>
            <tbody>
            {tableData313.map((data, index) => (

                <tr key={index}>
                <td>{data.year}</td>
                <td>{data.teacherName}</td>
                <td>{data.designation}</td>
                <td>{data.fellowshipName}</td>
                <td>{data.sponsoringAgency}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData313.filePath}</td> */}

                <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              {/* <button
                className="Editbtn"
                onClick={() => console.log(`Edit item with ID: ${data._id}`)}
              >
                Edit
              </button> */}
            </td>


              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}


<div className="formDiv">
    <h4>Criterion 3.1.4 - JRFs, SRFs, Post-Doctoral Fellows, Research Associates, and other research fellows enrolled in the institution during the year</h4>

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
                <th>Actions</th> {/* New column for delete/edit buttons */}

              </tr>
            </thead>
            <tbody>

            {tableData314.map((data, index) => (

<tr key={index}>

                <td>{data.fellowName}</td>
                <td>{data.yearOfEnrollment}</td>
                <td>{data.duration}</td>
                <td>{data.fellowshipType}</td>
                <td>{data.grantingAgency}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData314.filePath}</td> */}
                <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              {/* <button
                className="Editbtn"
                onClick={() => console.log(`Edit item with ID: ${data._id}`)}
              >
                Edit
              </button> */}
            </td>

              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}



{/* Criterion 3.1.6 Form */}
  <div className="formDiv">
  <h4>Criterion 3.1.6 - Departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR, and other recognitions by national and international agencies during the year</h4>
 
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
                <th>Actions</th> {/* New column for delete/edit buttons */}

              </tr>
            </thead>
            <tbody>
            {tableData316.map((data, index) => (
                <tr key={index}>                
               <td>{data.schemeName}</td>
                <td>{data.principalInvestigator}</td>
                <td>{data.fundingAgency}</td>
                <td>{data.type}</td>
                <td>{data.department}</td>
                <td>{data.yearOfAward}</td>
                <td>{data.fundLayoutAmount}</td>
                <td>{data.duration}</td>
                <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData316.filePath}</td> */}
                <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              {/* <button
                className="Editbtn"
                onClick={() => console.log(`Edit item with ID: ${data._id}`)}
              >
                Edit
              </button> */}
            </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}


</div>


<div className="criterionCon32">
  <h3 className="subTitle">Key Indicator - 3.2 Resource Mobilization for Research</h3>

  <div className="formDiv">

  <h4>3.2.1 Extramural funding for Research (Grants sponsored by non-government sources such as industry, corporate houses, international bodies for research projects), endowments, Chairs in the University during the year (INR in Lakhs)</h4>

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
          <th>Actions</th> {/* New column for delete/edit buttons */}

        </tr>
      </thead>
      <tbody>
      {tableData321.map((data, index) => (
          <tr key={index}>          <td>{data.projectName}</td>
          <td>{data.principalInvestigator}</td>
          <td>{data.fundingAgency}</td>
          <td>{data.fundingType}</td>
          <td>{data.department}</td>
          <td>{data.yearOfAward}</td>
          <td>{data.fundsProvided}</td>
          <td>{data.duration}</td>
          <td>
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
          {/* <td>{tableData321.filePath}</td> */}
          <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              {/* <button
                className="Editbtn"
                onClick={() => console.log(`Edit item with ID: ${data._id}`)}
              >
                Edit
              </button> */}
            </td>

        </tr>
      ))}
      </tbody>
    </table>
  </div>
)}

</div>


</div>
    </div>
  );
};

export default NaacReport;