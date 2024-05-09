import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NavBar from "./Navbar";
import "./Criterion3.css";
const Criterion3 = () => {

  const [tableData311, setTableData311] = useState(null);
  const [tableData312, setTableData312] = useState(null);
  const [tableData313, setTableData313] = useState(null);
  const [tableData314, setTableData314] = useState(null);
  const [tableData316, setTableData316] = useState(null);
  const [tableData321, setTableData321] = useState(null);
  const [tableData315, setTableData315] = useState(null);
  const [tableData322, setTableData322] = useState(null);
  const [tableData323, setTableData323] = useState(null);
  const [tableData332, setTableData332] = useState(null);
  const [tableData333, setTableData333] = useState(null);
  const [tableData342, setTableData342] = useState(null);
  const [tableData343, setTableData343] = useState(null);
  const [tableData344, setTableData344] = useState(null);
  const [tableData345, setTableData345] = useState(null);
  const [tableData346, setTableData346] = useState(null);
  const [tableData348, setTableData348] = useState(null);
  const [tableData349, setTableData349] = useState(null);
  const [tableData352, setTableData352] = useState(null);


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
} 

  // Check if a file is uploaded before appending it to FormData
  if (formData312.file312) {
    formDataToSend.append("file", formData312.file312);
  }

const handleToggleForm312 = () => {
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
       // Reset the form and other states after successful submission
    setFormData312(initialFormData312);


     // Reset the form and update states after successful upload
     setUploaded312(true); // Set upload status to true
     // Reset the file input after 3 seconds
     setTimeout(() => {
      setUploaded312(false); // Reset uploaded status to false after 3 seconds
    }, 1000); // 3000 milliseconds = 3 seconds

    
      setToggleForm312(!toggleForm312);

    } catch (error) {
      console.error("Error submitting data:", error);
      setError312("Error submitting data. Please try again.");
    } finally {
      setUploading312(false);
    }
    // resetFormAndErrors();
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
  




  const initialFormData315 = {
    facilityName: '',
    yearOfEstablishment: '',
    geoTaggedPicture: null,
    centralInstrumentationCentre: 'No',
    animalHouseGreenHouse: 'No',
    museum: 'No',
    mediaLaboratory: 'No',
    businessLab: 'No',
    researchStatisticalDatabases: 'No',
    mootCourt: 'No',
    theatre: 'No',
    artGallery: 'No',
    otherFacility: 'No',
  };


  const [formData315, setFormData315] = useState(initialFormData315);
  const [toggleForm315, setToggleForm315] = useState(false);
  const [uploading315, setUploading315] = useState(false);
  const [error315, setError315] = useState(null);
  const [uploaded315, setUploaded315] = useState(false);



  const handleToggleForm315 = () => {
    setToggleForm315((prevState) => !prevState);
  };

  const handleInputChange315 = (e) => {
    const { name, value } = e.target;
    setFormData315((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange315 = (e) => {
    const file = e.target.files[0];
    setFormData315((prevState) => ({
      ...prevState,
      geoTaggedPicture: file,
    }));
  };


  const handleSubmit315 = async (e) => {
    e.preventDefault();
    setUploading315(true);
    setError315(null);

    const formData = new FormData();
    const userName = Cookies.get('userName') || 'default_user'; // Handle missing userName

    formData.append('id', `315${userName}`); // Ensure consistent ID structure
    formData.append('facilityName', formData315.facilityName);
    formData.append('yearOfEstablishment', formData315.yearOfEstablishment);

    if (formData315.geoTaggedPicture) {
      formData.append('geoTaggedPicture', formData315.geoTaggedPicture);
    }

    formData.append('centralInstrumentationCentre', formData315.centralInstrumentationCentre === 'Yes');
    formData.append('animalHouseGreenHouse', formData315.animalHouseGreenHouse === 'Yes');
    formData.append('museum', formData315.museum === 'Yes');
    formData.append('mediaLaboratory', formData315.mediaLaboratory === 'Yes');
    formData.append('businessLab', formData315.businessLab === 'Yes');
    formData.append('researchStatisticalDatabases', formData315.researchStatisticalDatabases === 'Yes');
    formData.append('mootCourt', formData315.mootCourt === 'Yes');
    formData.append('theatre', formData315.theatre === 'Yes');
    formData.append('artGallery', formData315.artGallery === 'Yes');
    formData.append('otherFacility', formData315.otherFacility === 'Yes');

    try {
      await axios.post('http://localhost:5000/315upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData315(initialFormData315);
      setUploaded315(true);

      if (onRefreshData) {
        onRefreshData(); // Trigger refresh after submission
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      setError315('Error uploading file. Please try again.');
    } finally {
      setUploading315(false);
    }
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






const initialFormData323 = {
  projectName: "",
  principalInvestigator: "",
  department: "",
  researchProjectName: "",
  fundsReceived: "",
  fundingAgency: "",
  yearOfSanction: "",
  files: null,
};

const [formData323, setFormData323] = useState(initialFormData323);
  const [uploading323, setUploading323] = useState(false);
  const [uploaded323, setUploaded323] = useState(false);
  const [error323, setError323] = useState(null);
  const [toggleForm323, setToggleForm323] = useState(false);

  const handleInputChange323 = (e) => {
    const { name, value } = e.target;
    setFormData323({ ...formData323, [name]: value });
  };

  const handleFileChange323 = (e) => {
    setFormData323({ ...formData323, files: e.target.files });
  };

  const handleToggleForm323 = () => {
    setToggleForm323((prevState) => !prevState);
  };

  const handleSubmit323 = async (e) => {
    e.preventDefault();
    setUploading323(true);
    setError323(null);

    const formData = new FormData();
    const userName = Cookies.get("userName");
    const id = userName + "323"; // Unique ID for the data submission

    formData.append("id", id);
    formData.append("projectName", formData323.projectName);
    formData.append("principalInvestigator", formData323.principalInvestigator);
    formData.append("department", formData323.department);
    formData.append("researchProjectName", formData323.researchProjectName);
    formData.append("fundsReceived", formData323.fundsReceived);
    formData.append("fundingAgency", formData323.fundingAgency);
    formData.append("yearOfSanction", formData323.yearOfSanction);

    if (formData323.files) {
      formData.append("file", formData323.files[0]);
    }

    try {
      await axios.post("http://localhost:5000/323upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData323(initialFormData323);
      setUploaded323(true);

      setTimeout(() => {
        setUploaded323(false);
      }, 1000);

   

      setToggleForm323(false); // Hide form after submission
    } catch (error) {
      console.error("Error uploading files:", error);
      setError323("Error uploading files. Please try again.");
    } finally {
      setUploading323(false);
    }
  };



  

  const initialFormData332 = {
    academicYear: '',
    department: '',
    seminarName: '',
    startDate: '',
    endDate: '',
    participantsCount: '',
    eventOrganizer: '',
    files: null,
  };
  
    const [formData332, setFormData332] = useState(initialFormData332);
    const [uploading332, setUploading332] = useState(false);
    const [uploaded332, setUploaded332] = useState(false);
    const [error332, setError332] = useState(null);
    const [toggleForm332, setToggleForm332] = useState(false);
  
    const handleInputChange332 = (e) => {
      const { name, value } = e.target;
      setFormData332({ ...formData332, [name]: value });
    };
  
    const handleFileChange332 = (e) => {
      setFormData332({ ...formData332, files: e.target.files });
    };
  
    const handleToggleForm332 = () => {
      setToggleForm332((prevState) => !prevState);
    };
  
    const handleSubmit332 = async (e) => {
      e.preventDefault();
      setUploading332(true);
      setError332(null);
  
      const formData = new FormData();
      const userName = Cookies.get("userName");
      const id = userName + "332"; // Unique ID for the data submission
  
      formData.append("id", id);
      formData.append("academicYear", formData332.academicYear);
      formData.append("department", formData332.department);
      formData.append("seminarName", formData332.seminarName);
      formData.append("startDate", formData332.startDate);
      formData.append("endDate", formData332.endDate);
      formData.append("participantsCount", formData332.participantsCount);
      formData.append("eventOrganizer", formData332.eventOrganizer);
  
      if (formData332.files) {
        formData.append("file", formData332.files[0]);
      }
  
      try {
        await axios.post("http://localhost:5000/332upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setFormData332(initialFormData332);
        setUploaded332(true);
  
        setTimeout(() => {
          setUploaded332(false);
        }, 1000);
  
        setToggleForm332(false); // Hide form after submission
      } catch (error) {
        console.error("Error uploading files:", error);
        setError332("Error uploading files. Please try again.");
      } finally {
        setUploading332(false);
      }
    };

  


    const initialFormData333 = {
      serialNumber: '',
      academicYear: '',
      awardeeName: '',
      awardingAgency: '',
      contactDetails: '',
      dateOfAward: '',
      files: null, // File upload field for supporting documents
    };
    
      const [formData333, setFormData333] = useState(initialFormData333);
      const [uploading333, setUploading333] = useState(false);
      const [uploaded333, setUploaded333] = useState(false);
      const [error333, setError333] = useState(null);
      const [toggleForm333, setToggleForm333] = useState(false);
    
      const handleInputChange333 = (e) => {
        const { name, value } = e.target;
        setFormData333({ ...formData333, [name]: value });
      };
    
      const handleFileChange333 = (e) => {
        setFormData333({ ...formData333, files: e.target.files });
      };
    
      const handleToggleForm333 = () => {
        setToggleForm333((prevState) => !prevState);
      };
    
      const handleSubmit333 = async (e) => {
        e.preventDefault();
        setUploading333(true);
        setError333(null);
    
        const formData = new FormData();
        const userName = Cookies.get("userName");
        const id = userName + "333"; // Unique ID for the data submission
    
        formData.append("id", id);
        formData.append("serialNumber", formData333.serialNumber);
        formData.append("academicYear", formData333.academicYear);
        formData.append("awardeeName", formData333.awardeeName);
        formData.append("awardingAgency", formData333.awardingAgency);
        formData.append("dateOfAward", formData333.dateOfAward);
    
        if (formData333.files) {
          formData.append("file", formData333.files[0]); // Supporting document upload
        }
    
        try {
          await axios.post("http://localhost:5000/333upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          setFormData333(initialFormData333); // Reset form data after submission
          setUploaded333(true);
    
          setTimeout(() => {
            setUploaded333(false); // Reset upload status
          }, 1000);
    
          setToggleForm333(false); // Hide form after submission
        } catch (error) {
          console.error("Error uploading files:", error);
          setError333("Error uploading files. Please try again.");
        } finally {
          setUploading333(false);
        }
      };






      const initialFormData342 = {
        academicYear: '',
        awardeeName: '',
        contactDetails: '',
        awardingAgency: '',
        yearOfAward: '',
        incentiveDetails: '',
        files: null,
      };
      
        const [formData342, setFormData342] = useState(initialFormData342);
        const [uploading342, setUploading342] = useState(false);
        const [uploaded342, setUploaded342] = useState(false);
        const [error342, setError342] = useState(null);
        const [toggleForm342, setToggleForm342] = useState(false);
      
        const handleInputChange342 = (e) => {
          const { name, value } = e.target;
          setFormData342({ ...formData342, [name]: value });
        };
      
        const handleFileChange342 = (e) => {
          setFormData342({ ...formData342, files: e.target.files });
        };
      
        const handleToggleForm342 = () => {
          setToggleForm342((prevState) => !prevState);
        };
      
        const handleSubmit342 = async (e) => {
          e.preventDefault();
          setUploading342(true);
          setError342(null);
      
          const formData = new FormData();
          const userName = Cookies.get("userName");
          const id = userName + "342"; // Unique ID for the data submission
      
          formData.append("id", id);
          formData.append("academicYear", formData342.academicYear);
          formData.append("awardeeName", formData342.awardeeName);
          formData.append("contactDetails", formData342.contactDetails);
          formData.append("awardingAgency", formData342.awardingAgency);
          formData.append("yearOfAward", formData342.yearOfAward);
          formData.append("incentiveDetails", formData342.incentiveDetails);
      
          if (formData342.files) {
            formData.append("file", formData342.files[0]); // Upload relevant supporting document
          }
      
          try {
            await axios.post("http://localhost:5000/342upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
      
            setFormData342(initialFormData342); // Reset form data after submission
            setUploaded342(true);
      
            setTimeout(() => {
              setUploaded342(false); // Reset upload status after some time
            }, 1000);
      
            setToggleForm342(false); // Hide form after submission
          } catch (error) {
            console.error("Error uploading files:", error);
            setError342("Error uploading files. Please try again.");
          } finally {
            setUploading342(false); // Reset uploading status
          }
        };





        const initialFormData343 = {
          academicYear: '',
          patentName: '',
          patentNumber: '',
          status: '', // Published, Awarded, Granted (Dropdown)
          yearOfAward: '',
          files: null,
        };
        
          const [formData343, setFormData343] = useState(initialFormData343);
          const [uploading343, setUploading343] = useState(false);
          const [uploaded343, setUploaded343] = useState(false);
          const [error343, setError343] = useState(null);
          const [toggleForm343, setToggleForm343] = useState(false);
        
          const handleInputChange343 = (e) => {
            const { name, value } = e.target;
            setFormData343({ ...formData343, [name]: value });
          };
        
          const handleFileChange343 = (e) => {
            setFormData343({ ...formData343, files: e.target.files });
          };
        
          const handleToggleForm343 = () => {
            setToggleForm343((prevState) => !prevState);
          };
        
          const handleSubmit343 = async (e) => {
            e.preventDefault();
            setUploading343(true);
            setError343(null);
        
            const formData = new FormData();
            const userName = Cookies.get("userName");
            const id = userName + "343"; // Unique ID for the data submission
        
            formData.append("id", id);
            formData.append("academicYear", formData343.academicYear);
            formData.append("patentName", formData343.patentName);
            formData.append("patentNumber", formData343.patentNumber);
            formData.append("status", formData343.status);
            formData.append("yearOfAward", formData343.yearOfAward);
        
            if (formData343.files) {
              formData.append("file", formData343.files[0]); // Supporting document upload
            }
        
            try {
              await axios.post("http://localhost:5000/343upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
        
              setFormData343(initialFormData343); // Reset form data after submission
              setUploaded343(true);
        
              setTimeout(() => {
                setUploaded343(false); // Reset upload status after some time
              }, 1000);
        
              setToggleForm343(false); // Hide form after submission
            } catch (error) {
              console.error("Error uploading files:", error);
              setError343("Error uploading files. Please try again.");
            } finally {
              setUploading343(false);
            }
          };




          const initialFormData344 = {
            serialNumber: '',
            scholarName: '',
            department: '',
            guideName: '',
            registrationYear: '',
            awardYear: '',
            files: null,
          };
          
            const [formData344, setFormData344] = useState(initialFormData344);
            const [uploading344, setUploading344] = useState(false);
            const [uploaded344, setUploaded344] = useState(false);
            const [error344, setError344] = useState(null);
            const [toggleForm344, setToggleForm344] = useState(false);
          
            const handleInputChange344 = (e) => {
              const { name, value } = e.target;
              setFormData344({ ...formData344, [name]: value });
            };
          
            const handleFileChange344 = (e) => {
              setFormData344({ ...formData344, files: e.target.files });
            };
          
            const handleToggleForm344 = () => {
              setToggleForm344((prevState) => !prevState);
            };
          
            const handleSubmit344 = async (e) => {
              e.preventDefault();
              setUploading344(true);
              setError344(null);
          
              const formData = new FormData();
              const userName = Cookies.get("userName");
              const id = userName + "344"; // Unique ID for the data submission
          
              formData.append("id", id);
              formData.append("serialNumber", formData344.serialNumber);
              formData.append("scholarName", formData344.scholarName);
              formData.append("department", formData344.department);
              formData.append("guideName", formData344.guideName);
              formData.append("registrationYear", formData344.registrationYear);
              formData.append("awardYear", formData344.awardYear);
          
              if (formData344.files) {
                formData.append("file", formData344.files[0]); // Upload relevant supporting document
              }
          
              try {
                await axios.post("http://localhost:5000/344upload", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
          
                setFormData344(initialFormData344); // Reset form data after submission
                setUploaded344(true);
          
                setTimeout(() => {
                  setUploaded344(false); // Reset upload status after some time
                }, 1000);
          
                setToggleForm344(false); // Hide form after submission
              } catch (error) {
                console.error("Error uploading files:", error);
                setError344("Error uploading files. Please try again.");
              } finally {
                setUploading344(false);
              }
            };



            const initialFormData345 = {
              titleOfPaper: '',
              authors: '',
              department: '',
              journalName: '',
              yearOfPublication: '',
              issnNumber: '',
              files: null,
            };
            
              const [formData345, setFormData345] = useState(initialFormData345);
              const [uploading345, setUploading345] = useState(false);
              const [uploaded345, setUploaded345] = useState(false);
              const [error345, setError345] = useState(null);
              const [toggleForm345, setToggleForm345] = useState(false);
            
              const handleInputChange345 = (e) => {
                const { name, value } = e.target;
                setFormData345({ ...formData345, [name]: value });
              };
            
              const handleFileChange345 = (e) => {
                setFormData345({ ...formData345, files: e.target.files });
              };
            
              const handleToggleForm345 = () => {
                setToggleForm345((prevState) => !prevState);
              };
            
              const handleSubmit345 = async (e) => {
                e.preventDefault();
                setUploading345(true);
                setError345(null);
            
                const formData = new FormData();
                const userName = Cookies.get("userName");
                const id = userName + "345"; // Unique ID for the data submission
            
                formData.append("id", id);
                formData.append("titleOfPaper", formData345.titleOfPaper);
                formData.append("authors", formData345.authors);
                formData.append("department", formData345.department);
                formData.append("journalName", formData345.journalName);
                formData.append("yearOfPublication", formData345.yearOfPublication);
                formData.append("issnNumber", formData345.issnNumber);
            
                if (formData345.files) {
                  formData.append("file", formData345.files[0]); // Upload supporting document
                }
            
                try {
                  await axios.post("http://localhost:5000/345upload", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  });
            
                  setFormData345(initialFormData345); // Reset form data after submission
                  setUploaded345(true);
            
                  setTimeout(() => {
                    setUploaded345(false); // Reset upload status after some time
                  }, 1000);
            
                  setToggleForm345(false); // Hide form after submission
                } catch (error) {
                  console.error("Error uploading files:", error);
                  setError345("Error uploading files. Please try again.");
                } finally {
                  setUploading345(false); // Reset uploading status
                }
              };






              const initialFormData346 = {
                teacherName: '',
                titleOfPaper: '',
                titleOfBookOrChapter: '',
                authorNames: '',
                titleOfProceedings: '',
                publisher: '',
                isbnNumber: '',
                yearOfPublication: '',
                files: null,
              };
              
                const [formData346, setFormData346] = useState(initialFormData346);
                const [uploading346, setUploading346] = useState(false);
                const [uploaded346, setUploaded346] = useState(false);
                const [error346, setError346] = useState(null);
                const [toggleForm346, setToggleForm346] = useState(false);
              
                const handleInputChange346 = (e) => {
                  const { name, value } = e.target;
                  setFormData346({ ...formData346, [name]: value });
                };
              
                const handleFileChange346 = (e) => {
                  setFormData346({ ...formData346, files: e.target.files });
                };
              
                const handleToggleForm346 = () => {
                  setToggleForm346((prevState) => !prevState);
                };
              
                const handleSubmit346 = async (e) => {
                  e.preventDefault();
                  setUploading346(true);
                  setError346(null);
              
                  const formData = new FormData();
                  const userName = Cookies.get("userName");
                  const id = userName + "346"; // Unique ID for data submission
              
                  formData.append("id", id);
                  formData.append("teacherName", formData346.teacherName);
                  formData.append("titleOfPaper", formData346.titleOfPaper);
                  formData.append("titleOfBookOrChapter", formData346.titleOfBookOrChapter);
                  formData.append("authorNames", formData346.authorNames);
                  formData.append("titleOfProceedings", formData346.titleOfProceedings);
                  formData.append("publisher", formData346.publisher);
                  formData.append("isbnNumber", formData346.isbnNumber);
                  formData.append("yearOfPublication", formData346.yearOfPublication);
              
                  if (formData346.files) {
                    formData.append("file", formData346.files[0]); // Supporting document upload
                  }
              
                  try {
                    await axios.post("http://localhost:5000/346upload", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
              
                    setFormData346(initialFormData346); // Reset form data after submission
                    setUploaded346(true);
              
                    setTimeout(() => {
                      setUploaded346(false); // Reset upload status after some time
                    }, 1000);
              
                    setToggleForm346(false); // Hide form after submission
                  } catch (error) {
                    console.error("Error uploading files:", error);
                    setError346("Error uploading files. Please try again.");
                  } finally {
                    setUploading346(false);
                  }
                };
              



                const initialFormData348 = {
                  titleOfPaper: '',
                  authorName: '',
                  journalTitle: '',
                  yearOfPublication: '',
                  citationIndex: '',
                  files: null,
                };
                
                  const [formData348, setFormData348] = useState(initialFormData348);
                  const [uploading348, setUploading348] = useState(false);
                  const [uploaded348, setUploaded348] = useState(false);
                  const [error348, setError348] = useState(null);
                  const [toggleForm348, setToggleForm348] = useState(false);
                
                  const handleInputChange348 = (e) => {
                    const { name, value } = e.target;
                    setFormData348({ ...formData348, [name]: value });
                  };
                
                  const handleFileChange348 = (e) => {
                    setFormData348({ ...formData348, files: e.target.files });
                  };
                
                  const handleToggleForm348 = () => {
                    setToggleForm348((prevState) => !prevState);
                  };
                
                  const handleSubmit348 = async (e) => {
                    e.preventDefault();
                    setUploading348(true);
                    setError348(null);
                
                    const formData = new FormData();
                    const userName = Cookies.get("userName");
                    const id = userName + "348"; // Unique ID for the data submission
                
                    formData.append("id", id);
                    formData.append("titleOfPaper", formData348.titleOfPaper);
                    formData.append("authorName", formData348.authorName);
                    formData.append("journalTitle", formData348.journalTitle);
                    formData.append("yearOfPublication", formData348.yearOfPublication);
                    formData.append("citationIndex", formData348.citationIndex);
                
                    if (formData348.files) {
                      formData.append("file", formData348.files[0]); // Upload supporting document
                    }
                
                    try {
                      await axios.post("http://localhost:5000/348upload", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      });
                
                      setFormData348(initialFormData348); // Reset form data after submission
                      setUploaded348(true);
                
                      setTimeout(() => {
                        setUploaded348(false); // Reset upload status after some time
                      }, 1000);
                
                      setToggleForm348(false); // Hide form after submission
                    } catch (error) {
                      console.error("Error uploading files:", error);
                      setError348("Error uploading files. Please try again.");
                    } finally {
                      setUploading348(false);
                    }
                  };








                  const initialFormData349 = {
                    titleOfPaper: '',
                    authorName: '',
                    journalTitle: '',
                    yearOfPublication: '',
                    hIndex: '',
                    files: null,
                  };
                  
                    const [formData349, setFormData349] = useState(initialFormData349);
                    const [uploading349, setUploading349] = useState(false);
                    const [uploaded349, setUploaded349] = useState(false);
                    const [error349, setError349] = useState(null);
                    const [toggleForm349, setToggleForm349] = useState(false);
                  
                    const handleInputChange349 = (e) => {
                      const { name, value } = e.target;
                      setFormData349({ ...formData349, [name]: value });
                    };
                  
                    const handleFileChange349 = (e) => {
                      setFormData349({ ...formData349, files: e.target.files });
                    };
                  
                    const handleToggleForm349 = () => {
                      setToggleForm349((prevState) => !prevState);
                    };
                  
                    const handleSubmit349 = async (e) => {
                      e.preventDefault();
                      setUploading349(true);
                      setError349(null);
                  
                      const formData = new FormData();
                      const userName = Cookies.get("userName");
                      const id = userName + "349"; // Unique ID for data submission
                  
                      formData.append("id", id);
                      formData.append("titleOfPaper", formData349.titleOfPaper);
                      formData.append("authorName", formData349.authorName);
                      formData.append("journalTitle", formData349.journalTitle);
                      formData.append("yearOfPublication", formData349.yearOfPublication);
                      formData.append("hIndex", formData349.hIndex);
                  
                      if (formData349.files) {
                        formData.append("file", formData349.files[0]); // Upload relevant supporting document
                      }
                  
                      try {
                        await axios.post("http://localhost:5000/349upload", formData, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        });
                  
                        setFormData349(initialFormData349); // Reset form data after submission
                        setUploaded349(true);
                  
                        setTimeout(() => {
                          setUploaded349(false); // Reset upload status after some time
                        }, 1000);
                  
                        setToggleForm349(false); // Hide form after submission
                      } catch (error) {
                        console.error("Error uploading files:", error);
                        setError349("Error uploading files. Please try again.");
                      } finally {
                        setUploading349(false); // Reset uploading status
                      }
                    };






                    const initialFormData352 = {
                      nameOfConsultants: '',
                      nameOfConsultancyProjects: '',
                      consultingAgency: '',
                      revenueGenerated: '',
                      totalRevenueGenerated: '',
                      corporateTrainingDetails: '',
                      titleOfTraining: '',
                      numberOfParticipants: '',
                      files: null,
                    };
                    
                      const [formData352, setFormData352] = useState(initialFormData352);
                      const [uploading352, setUploading352] = useState(false);
                      const [uploaded352, setUploaded352] = useState(false);
                      const [error352, setError352] = useState(null);
                      const [toggleForm352, setToggleForm352] = useState(false);
                    
                      const handleInputChange352 = (e) => {
                        const { name, value } = e.target;
                        setFormData352({ ...formData352, [name]: value });
                      };
                    
                      const handleFileChange352 = (e) => {
                        setFormData352({ ...formData352, files: e.target.files });
                      };
                    
                      const handleToggleForm352 = () => {
                        setToggleForm352((prevState) => !prevState);
                      };
                    
                      const handleSubmit352 = async (e) => {
                        e.preventDefault();
                        setUploading352(true);
                        setError352(null);
                    
                        const formData = new FormData();
                        const userName = Cookies.get("userName");
                        const id = userName + "352"; // Unique ID for data submission
                    
                        formData.append("id", id);
                        formData.append("nameOfConsultants", formData352.nameOfConsultants);
                        formData.append("nameOfConsultancyProjects", formData352.nameOfConsultancyProjects);
                        formData.append("consultingAgency", formData352.consultingAgency);
                        formData.append("revenueGenerated", formData352.revenueGenerated);
                        formData.append("totalRevenueGenerated", formData352.totalRevenueGenerated);
                        formData.append("corporateTrainingDetails", formData352.corporateTrainingDetails);
                        formData.append("titleOfTraining", formData352.titleOfTraining);
                        formData.append("numberOfParticipants", formData352.numberOfParticipants);
                    
                        if (formData352.files) {
                          formData.append("file", formData352.files[0]); // Supporting document upload
                        }
                    
                        try {
                          await axios.post("http://localhost:5000/352upload", formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          });
                    
                          setFormData352(initialFormData352); // Reset form data after submission
                          setUploaded352(true);
                    
                          setTimeout(() => {
                            setUploaded352(false); // Reset upload status after some time
                          }, 1000);
                    
                          setToggleForm352(false); // Hide form after submission
                        } catch (error) {
                          console.error("Error uploading files:", error);
                          setError352("Error uploading files. Please try again.");
                        } finally {
                          setUploading352(false); // Reset uploading status
                        }
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

      if (response.status === 200) {
        const results = response.data.results; // Each element is an array of data for a criterion

        // Validate the length of results and update table data
        setTableData311(results[0] || []); // Default to an empty array if not found
        setTableData312(results[1] || []);
        setTableData313(results[2] || []);
        setTableData314(results[3] || []);
        // setTableData315(results[4] || []);
        setTableData316(results[4] || []);
        setTableData321(results[5] || []);

      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  fetchData(); // Fetch data once when the component mounts
}, [
  uploaded311,
  uploaded312,
  uploaded313,
  uploaded314,
  uploaded315,
  uploaded316,
  uploaded321,
  handleDeleteFlag
]);





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
 <input
        type="file"
        onChange={handleFile311Change}
        
      />
                            <button className="submitFormBtn" onClick={handleUpload311} disabled={uploading311 || uploaded311}>
                        {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
                      </button>
                      {error311 && <div className="error">{error311}</div>}
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
              <button
                className="Editbtn"
                onClick={() => console.log(`Edit item with ID: ${data._id}`)}
              >
                Edit
              </button>
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
              </tr>
            ))}
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


              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}




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
            <label htmlFor="geoTaggedPicture">Geo-Tagged Picture:</label>
            <input
              type="file"
              id="geoTaggedPicture"
              name="geoTaggedPicture"
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
                value="Yes"
                checked={formData315.centralInstrumentationCentre === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="centralInstrumentationCentre"
                value="No"
                checked={formData315.centralInstrumentationCentre === 'No'}
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
                value="Yes"
                checked={formData315.animalHouseGreenHouse === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                  name="animalHouseGreenHouse"
                  value="No"
                  checked={formData315.animalHouseGreenHouse === 'No'}
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
                value="Yes"
                checked={formData315.museum === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="museum"
                  value="No"
                  checked={formData315.museum === 'No'}
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
                value="Yes"
                checked={formData315.mediaLaboratory === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="mediaLaboratory"
                value="No"
                checked={formData315.mediaLaboratory === 'No'}
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
                  value="Yes"
                  checked={formData315.businessLab === 'Yes'}
                  onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                  name="businessLab"
                  value="No"
                  checked={formData315.businessLab === 'No'}
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
                value="Yes"
                checked={formData315.researchStatisticalDatabases === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="researchStatisticalDatabases"
                  value="No"
                  checked={formData315.researchStatisticalDatabases === 'No'}
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
                value="Yes"
                checked={formData315.mootCourt === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                  name="mootCourt"
                  value="No"
                  checked={formData315.mootCourt === 'No'}
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
                  value="Yes"
                  checked={formData315.theatre === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="theatre"
                  value="No"
                  checked={formData315.theatre === 'No'}
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
                  value="Yes"
                  checked={formData315.artGallery === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                  type="radio"
                  name="artGallery"
                  value="No"
                  checked={formData315.artGallery === 'No'}
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
                value="Yes"
                checked={formData315.otherFacility === 'Yes'}
                onChange={handleInputChange315}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="otherFacility"
                value="No"
                checked={formData315.otherFacility === 'No'}
                onChange={handleInputChange315}
              />
              No
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={uploading315}>
            {uploading315 ? 'Submitting...' : 'Submit'}
          </button>

          {/* Error Message */}
          {error315 && <div style={{ color: 'red' }}>{error315}</div>}
          {uploaded315 && <div>Submission successful!</div>}
        </form>
      )}
    </div>

    {tableData315 && (

    <div>
      <h3>Data for Criterion 3.1.5</h3>
      <table>
        <thead>
          <tr>
            <th>Facility Name</th>
            <th>Year of Establishment</th>
            <th>Central Instrumentation Centre</th>
            <th>Animal House / Green House</th>
            <th>Museum</th>
            <th>Media Laboratory</th>
            <th>Business Lab</th>
            <th>Research Statistical Databases</th>
            <th>Moot Court</th>
            <th>Theatre</th>
            <th>Art Gallery</th>
            <th>Other Facility</th>
            <th>Geo-Tagged Picture</th>
          </tr>
        </thead>
        <tbody>
          {tableData315.map((item, index) => (
            <tr key={index}>
              <td>{item.facilityName}</td>
              <td>{item.yearOfEstablishment}</td>
              <td>{item.centralInstrumentationCentre ? 'Yes' : 'No'}</td>
              <td>{item.animalHouseGreenHouse ? 'Yes' : 'No'}</td>
              <td>{item.museum ? 'Yes' : 'No'}</td>
              <td>{item.mediaLaboratory ? 'Yes' : 'No'}</td>
              <td>{item.businessLab ? 'Yes' : 'No'}</td>
              <td>{item.researchStatisticalDatabases ? 'Yes' : 'No'}</td>
              <td>{item.mootCourt ? 'Yes' : 'No'}</td>
              <td>{item.theatre ? 'Yes' : 'No'}</td>
              <td>{item.artGallery ? 'Yes' : 'No'}</td>
              <td>{item.otherFacility ? 'Yes' : 'No'}</td>
              <td>
                {item.geoTaggedPicture ? (
                  <button onClick={() => handleDownloadFile(item.geoTaggedPicture)}>
                    Download Picture
                  </button>
                ) : (
                  'No Picture'
                )}
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
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )}


<div className="formDiv">
      <h4>
        3.2.2 Grants for research projects sponsored by government agencies during the year (INR in Lakhs)
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm322}>
        {toggleForm322 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm322 && (
        <form onSubmit={handleSubmit322}>
          <div>
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData322.projectName}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="principalInvestigator">Principal Investigator / Co-principal investigator:</label>
            <input
              type="text"
              id="principalInvestigator"
              name="principalInvestigator"
              value={formData322.principalInvestigator}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="yearOfAward">Year of Award:</label>
            <input
              type="text"
              id="yearOfAward"
              name="yearOfAward"
              value={formData322.yearOfAward}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="fundsProvided">Funds Provided:</label>
            <input
              type="text"
              id="fundsProvided"
              name="fundsProvided"
              value={formData322.fundsProvided}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration of the Project:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData322.duration}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="fundingAgency">Funding Agency:</label>
            <input
              type="text"
              id="fundingAgency"
              name="fundingAgency"
              value={formData322.fundingAgency}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="totalAmountFundsReceived">Total Amount Funds Received:</label>
            <input
              type="text"
              id="totalAmountFundsReceived"
              name="totalAmountFundsReceived"
              value={formData322.totalAmountFundsReceived}
              onChange={handleInputChange322}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Copy of Sanction order</ul>
              <ul>• Copy of Releasing of Funds</ul>
              <ul>• Any additional information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange322} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading322 || uploaded322}>
            {uploading322 ? "Submitting..." : uploaded322 ? "Submitted" : "Submit"}
          </button>

          {error322 && <div className="error">{error322}</div>}
        </form>
      )}
    </div>


    {tableData322 && (

    <div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Principal Investigator / Co-principal Investigator</th>
            <th>Year of Award</th>
            <th>Funds Provided</th>
            <th>Duration of the Project</th>
            <th>Funding Agency</th>
            <th>Total Amount Funds Received</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {tableData322.map((data, index) => (
            <tr key={index}>
              <td>{data.projectName}</td>
              <td>{data.principalInvestigator}</td>
              <td>{data.yearOfAward}</td>
              <td>{data.fundsProvided}</td>
              <td>{data.duration}</td>
              <td>{data.fundingAgency}</td>
              <td>{data.totalAmountFundsReceived}</td>
              <td>
                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  'No File Attached'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}



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




</div>


<div className="criterionCon33">
<h3 className="subTitle">Key Indicator - 3.3 Innovation Ecosystem</h3>


<div className="formDiv">
      <h4>
        3.3.2 Workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR), Entrepreneurship, Skill development during the year
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm332}>
        {toggleForm332 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm332 && (
        <form onSubmit={handleSubmit332}>
          <div>
            <label htmlFor="academicYear">Academic Year:</label>
            <input
              type="number"
              id="academicYear"
              name="academicYear"
              value={formData332.academicYear}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData332.department}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="seminarName">Name of the Seminars/Workshops:</label>
            <input
              type="text"
              id="seminarName"
              name="seminarName"
              value={formData332.seminarName}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="startDate">From:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData332.startDate}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="endDate">To:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData332.endDate}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="participantsCount">Number of Participants:</label>
            <input
              type="number"
              id="participantsCount"
              name="participantsCount"
              value={formData332.participantsCount}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="eventOrganizer">Event Organizer:</label>
            <input
              type="text"
              id="eventOrganizer"
              name="eventOrganizer"
              value={formData332.eventOrganizer}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Event Invitation</ul>
              <ul>• Report of the event</ul>
              <ul>• Any additional information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange332} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading332 || uploaded332}>
            {uploading332 ? "Submitting..." : uploaded332 ? "Submitted" : "Submit"}
          </button>

          {error332 && <div className="error">{error332}</div>}
        </form>
      )}
    </div>

    {tableData332 && (
    <div>
      <h3>Workshops/Seminars - Criterion 3.3.2</h3>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Department</th>
            <th>Name of Seminars/Workshops</th>
            <th>From</th>
            <th>To</th>
            <th>Number of Participants</th>
            <th>Event Organizer</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData332.map((data, index) => (
            <tr key={index}>
              <td>{data.academicYear}</td>
              <td>{data.department}</td>
              <td>{data.seminarName}</td>
              <td>{data.startDate}</td>
              <td>{data.endDate}</td>
              <td>{data.participantsCount}</td>
              <td>{data.eventOrganizer}</td>
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



<div className="formDiv">
      <h4>
        3.3.3. Awards/recognitions received for research/innovations by the institution/teachers/research scholars/students during the year
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm333}>
        {toggleForm333 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm333 && (
        <form onSubmit={handleSubmit333}>
          <div>
            <label htmlFor="serialNumber">Serial Number:</label>
            <input
              type="number"
              id="serialNumber"
              name="serialNumber"
              value={formData333.serialNumber}
              onChange={handleInputChange333}
            />
          </div>

          <div>
            <label htmlFor="academicYear">Academic Year:</label>
            <input
              type="number"
              id="academicYear"
              name="academicYear"
              value={formData333.academicYear}
              onChange={handleInputChange333}
            />
          </div>

          <div>
            <label htmlFor="awardeeName">Name of the Awardee:</label>
            <input
              type="text"
              id="awardeeName"
              name="awardeeName"
              value={formData333.awardeeName}
              onChange={handleInputChange333}
            />
          </div>

          <div>
            <label htmlFor="awardingAgency">Name of the Awarding Agency:</label>
            <input
              type="text"
              id="awardingAgency"
              name="awardingAgency"
              value={formData333.awardingAgency}
              onChange={handleInputChange333}
            />
          </div>

          <div>
            <label htmlFor="contactDetails">Contact Details:</label>
            <input
              type="text"
              id="contactDetails"
              name="contactDetails"
              value={formData333.contactDetails}
              onChange={handleInputChange333}
            />
          </div>

          <div>
            <label htmlFor="dateOfAward">Date of Award:</label>
            <input
              type="date"
              id="dateOfAward"
              name="dateOfAward"
              value={formData333.dateOfAward}
              onChange={handleInputChange333}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• E-copies of Award Letter</ul>
              <ul>• Any additional information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange333} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading333 || uploaded333}>
            {uploading333 ? "Submitting..." : uploaded333 ? "Submitted" : "Submit"}
          </button>

          {error333 && <div className="error">{error333}</div>}
        </form>
      )}
    </div>


    {tableData333 && (
      <div>
      <h3>Research Awards - Criterion 3.3.3</h3>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Academic Year</th>
            <th>Awardee Name</th>
            <th>Awarding Agency</th>
            <th>Contact Details</th>
            <th>Date of Award</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData333.map((data, index) => (
            <tr key={index}>
              <td>{data.serialNumber}</td>
              <td>{data.academicYear}</td>
              <td>{data.awardeeName}</td>
              <td>{data.awardingAgency}</td>
              <td>{data.contactDetails}</td>
              <td>{data.dateOfAward}</td>
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
</div>







<div className="criterionCon34">
<h3 className="subTitle">Key Indicators - 3.4 Research Publications and Awards</h3>


<div className="formDiv">
      <h4>
        3.4.2 The institution provides incentives to teachers who receive state, national, and international recognitions/awards
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm342}>
        {toggleForm342 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm342 && (
        <form onSubmit={handleSubmit342}>
          <div>
            <label htmlFor="academicYear">Academic Year:</label>
            <input
              type="number"
              id="academicYear"
              name="academicYear"
              value={formData342.academicYear}
              onChange={handleInputChange342}
            />
          </div>

          <div>
            <label htmlFor="awardeeName">Name of the Awardee with Contact Details:</label>
            <input
              type="text"
              id="awardeeName"
              name="awardeeName"
              value={formData342.awardeeName}
              onChange={handleInputChange342}
            />
          </div>

          <div>
            <label htmlFor="awardingAgency">Name of the Awarding Agency:</label>
            <input
              type="text"
              id="awardingAgency"
              name="awardingAgency"
              value={formData342.awardingAgency}
              onChange={handleInputChange342}
            />
          </div>

          <div>
            <label htmlFor="contactDetails">Contact Details:</label>
            <input
              type="text"
              id="contactDetails"
              name="contactDetails"
              value={formData342.contactDetails}
              onChange={handleInputChange342}
            />
          </div>

          <div>
            <label htmlFor="yearOfAward">Year of Award:</label>
            <input
              type="number"
              id="yearOfAward"
              name="yearOfAward"
              value={formData342.yearOfAward}
              onChange={handleInputChange342}
            />
          </div>

          <div>
            <label htmlFor="incentiveDetails">Incentive Details by the Institution:</label>
            <input
              type="text"
              id="incentiveDetails"
              name="incentiveDetails"
              value={formData342.incentiveDetails}
              onChange={handleInputChange342}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• E-copies of Award Letter</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange342} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading342 || uploaded342}>
            {uploading342 ? "Submitting..." : uploaded342 ? "Submitted" : "Submit"}
          </button>

          {error342 && <div className="error">{error342}</div>}
        </form>
      )}
    </div>

    {tableData342 && (
      <div>
      <h3>Incentives for Awards - Criterion 3.4.2</h3>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Awardee Name</th>
            <th>Awarding Agency</th>
            <th>Contact Details</th>
            <th>Year of Award</th>
            <th>Incentive Details</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData342.map((data, index) => (
            <tr key={index}>
              <td>{data.academicYear}</td>
              <td>{data.awardeeName}</td>
              <td>{data.awardingAgency}</td>
              <td>{data.contactDetails}</td>
              <td>{data.yearOfAward}</td>
              <td>{data.incentiveDetails}</td>
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



<div className="formDiv">
      <h4>3.4.3 Patents published/awarded during the year</h4>
      <button className="toggleFormbtn" onClick={handleToggleForm343}>
        {toggleForm343 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm343 && (
        <form onSubmit={handleSubmit343}>
          <div>
            <label htmlFor="academicYear">Academic Year:</label>
            <input
              type="number"
              id="academicYear"
              name="academicYear"
              value={formData343.academicYear}
              onChange={handleInputChange343}
            />
          </div>

          <div>
            <label htmlFor="patentName">Name of the Patent Published/Awarded:</label>
            <input
              type="text"
              id="patentName"
              name="patentName"
              value={formData343.patentName}
              onChange={handleInputChange343}
            />
          </div>

          <div>
            <label htmlFor="patentNumber">Patent Number:</label>
            <input
              type="number"
              id="patentNumber"
              name="patentNumber"
              value={formData343.patentNumber}
              onChange={handleInputChange343}
            />
          </div>

          <div>
            <label htmlFor="status">Published / Awarded / Granted:</label>
            <select
              id="status"
              name="status"
              value={formData343.status}
              onChange={handleInputChange343}
            >
              <option value="">Select Status</option>
              <option value="Published">Published</option>
              <option value="Awarded">Awarded</option>
              <option value="Granted">Granted</option>
            </select>
          </div>

          <div>
            <label htmlFor="yearOfAward">Year of Award:</label>
            <input
              type="number"
              id="yearOfAward"
              name="yearOfAward"
              value={formData343.yearOfAward}
              onChange={handleInputChange343}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange343} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading343 || uploaded343}>
            {uploading343 ? "Submitting..." : uploaded343 ? "Submitted" : "Submit"}
          </button>

          {error343 && <div className="error">{error343}</div>}
        </form>
      )}
    </div>

    {tableData343 && (
       <div>
       <h3>Patents - Criterion 3.4.3</h3>
       <table>
         <thead>
           <tr>
             <th>Academic Year</th>
             <th>Name of Patent</th>
             <th>Patent Number</th>
             <th>Status</th>
             <th>Year of Award</th>
             <th>Download File</th>
           </tr>
         </thead>
         <tbody>
           {tableData343.map((data, index) => (
             <tr key={index}>
               <td>{data.academicYear}</td>
               <td>{data.patentName}</td>
               <td>{data.patentNumber}</td>
               <td>{data.status}</td>
               <td>{data.yearOfAward}</td>
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




<div className="formDiv">
      <h4>3.4.4 Ph.D.s awarded during the year</h4>
      <button className="toggleFormbtn" onClick={handleToggleForm344}>
        {toggleForm344 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm344 && (
        <form onSubmit={handleSubmit344}>
          <div>
            <label htmlFor="serialNumber">Serial Number:</label>
            <input
              type="number"
              id="serialNumber"
              name="serialNumber"
              value={formData344.serialNumber}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="scholarName">Name of the PhD Scholar:</label>
            <input
              type="text"
              id="scholarName"
              name="scholarName"
              value={formData344.scholarName}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData344.department}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="guideName">Guide Name:</label>
            <input
              type="text"
              id="guideName"
              name="guideName"
              value={formData344.guideName}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="registrationYear">Year of Registration of the Scholar:</label>
            <input
              type="number"
              id="registrationYear"
              name="registrationYear"
              value={formData344.registrationYear}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="awardYear">Year of Award of PhD:</label>
            <input
              type="number"
              id="awardYear"
              name="awardYear"
              value={formData344.awardYear}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange344} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading344 || uploaded344}>
            {uploading344 ? "Submitting..." : uploaded344 ? "Submitted" : "Submit"}
          </button>

          {error344 && <div className="error">{error344}</div>}
        </form>
      )}
    </div>

    {tableData344 && (
    <div>
      <h3>Ph.D.s Awarded - Criterion 3.4.4</h3>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name of PhD Scholar</th>
            <th>Department</th>
            <th>Guide Name</th>
            <th>Year of Registration</th>
            <th>Year of Award</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData344.map((data, index) => (
            <tr key={index}>
              <td>{data.serialNumber}</td>
              <td>{data.scholarName}</td>
              <td>{data.department}</td>
              <td>{data.guideName}</td>
              <td>{data.registrationYear}</td>
              <td>{data.awardYear}</td>
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




<div className="formDiv">
      <h4>3.4.5 Research papers in the Journals notified on UGC website during the year</h4>
      <button className="toggleFormbtn" onClick={handleToggleForm345}>
        {toggleForm345 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm345 && (
        <form onSubmit={handleSubmit345}>
          <div>
            <label htmlFor="titleOfPaper">Title of Paper:</label>
            <input
              type="text"
              id="titleOfPaper"
              name="titleOfPaper"
              value={formData345.titleOfPaper}
              onChange={handleInputChange345}
            />
          </div>

          <div>
            <label htmlFor="authors">Name of the Authors:</label>
            <input
              type="text"
              id="authors"
              name="authors"
              value={formData345.authors}
              onChange={handleInputChange345}
            />
          </div>

          <div>
            <label htmlFor="department">Department of the Teacher:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData345.department}
              onChange={handleInputChange345}
            />
          </div>

          <div>
            <label htmlFor="journalName">Name of Journal:</label>
            <input
              type="text"
              id="journalName"
              name="journalName"
              value={formData345.journalName}
              onChange={handleInputChange345}
            />
          </div>

          <div>
            <label htmlFor="yearOfPublication">Year of Publication:</label>
            <input
              type="number"
              id="yearOfPublication"
              name="yearOfPublication"
              value={formData345.yearOfPublication}
              onChange={handleInputChange345}
            />
          </div>

          <div>
            <label htmlFor="issnNumber">ISSN Number:</label>
            <input
              type="number"
              id="issnNumber"
              name="issnNumber"
              value={formData345.issnNumber}
              onChange={handleInputChange345}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange345} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading345 || uploaded345}>
            {uploading345 ? "Submitting..." : uploaded345 ? "Submitted" : "Submit"}
          </button>

          {error345 && <div className="error">{error345}</div>}
        </form>
      )}
    </div>

    {tableData345 && (

    <div>
      <h3>Research Papers - Criterion 3.4.5</h3>
      <table>
        <thead>
          <tr>
            <th>Title of Paper</th>
            <th>Name of Authors</th>
            <th>Department</th>
            <th>Name of Journal</th>
            <th>Year of Publication</th>
            <th>ISSN Number</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>

        {tableData345.map((data, index) => (
            <tr key={index}>
              <td>{data.titleOfPaper}</td>
              <td>{data.authors}</td>
              <td>{data.department}</td>
              <td>{data.journalName}</td>
              <td>{data.yearOfPublication}</td>
              <td>{data.issnNumber}</td>
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





<div className="formDiv">
      <h4>
        3.4.6 Books and chapters in edited volumes published during the year
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm346}>
        {toggleForm346 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm346 && (
        <form onSubmit={handleSubmit346}>
          <div>
            <label htmlFor="teacherName">Name of the Teacher:</label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              value={formData346.teacherName}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="titleOfPaper">Title of the Paper:</label>
            <input
              type="text"
              id="titleOfPaper"
              name="titleOfPaper"
              value={formData346.titleOfPaper}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="titleOfBookOrChapter">Title of the Book/Chapter:</label>
            <input
              type="text"
              id="titleOfBookOrChapter"
              name="titleOfBookOrChapter"
              value={formData346.titleOfBookOrChapter}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="authorNames">Name of the Authors:</label>
            <input
              type="text"
              id="authorNames"
              name="authorNames"
              value={formData346.authorNames}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="titleOfProceedings">Title of the Conference Proceedings:</label>
            <input
              type="text"
              id="titleOfProceedings"
              name="titleOfProceedings"
              value={formData346.titleOfProceedings}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="publisher">Publisher (National/International):</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData346.publisher}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="isbnNumber">ISBN Number:</label>
            <input
              type="number"
              id="isbnNumber"
              name="isbnNumber"
              value={formData346.isbnNumber}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="yearOfPublication">Year of Publication:</label>
            <input
              type="number"
              id="yearOfPublication"
              name="yearOfPublication"
              value={formData346.yearOfPublication}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange346} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading346 || uploaded346}>
            {uploading346 ? "Submitting..." : uploaded346 ? "Submitted" : "Submit"}
          </button>

          {error346 && <div className="error">{error346}</div>}
        </form>
      )}
    </div>

    {tableData346 && (
    <div>
      <h3>Books and Chapters - Criterion 3.4.6</h3>
      <table>
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Title of the Paper</th>
            <th>Title of the Book/Chapter</th>
            <th>Author(s)</th>
            <th>Conference Proceedings</th>
            <th>Publisher (National/International)</th>
            <th>ISBN Number</th>
            <th>Year of Publication</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData346.map((data, index) => (
            <tr key={index}>
              <td>{data.teacherName}</td>
              <td>{data.titleOfPaper}</td>
              <td>{data.titleOfBookOrChapter}</td>
              <td>{data.authorNames}</td>
              <td>{data.titleOfProceedings}</td>
              <td>{data.publisher}</td>
              <td>{data.isbnNumber}</td>
              <td>{data.yearOfPublication}</td>
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


    <div className="formDiv">
      <h4>
        3.4.8 Bibliometric of the publications during the year based on average Citation Index in Scopus, Web of Science, or PubMed
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm348}>
        {toggleForm348 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm348 && (
        <form onSubmit={handleSubmit348}>
          <div>
            <label htmlFor="titleOfPaper">Title of the Paper:</label>
            <input
              type="text"
              id="titleOfPaper"
              name="titleOfPaper"
              value={formData348.titleOfPaper}
              onChange={handleInputChange348}
            />
          </div>

          <div>
            <label htmlFor="authorName">Name of the Author:</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData348.authorName}
              onChange={handleInputChange348}
            />
          </div>

          <div>
            <label htmlFor="journalTitle">Title of the Journal:</label>
            <input
              type="text"
              id="journalTitle"
              name="journalTitle"
              value={formData348.journalTitle}
              onChange={handleInputChange348}
            />
          </div>

          <div>
            <label htmlFor="yearOfPublication">Year of Publication:</label>
            <input
              type="number"
              id="yearOfPublication"
              name="yearOfPublication"
              value={formData348.yearOfPublication}
              onChange={handleInputChange348}
            />
          </div>

          <div>
            <label htmlFor="citationIndex">Citation Index:</label>
            <input
              type="number"
              id="citationIndex"
              name="citationIndex"
              value={formData348.citationIndex}
              onChange={handleInputChange348}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange348} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading348 || uploaded348}>
            {uploading348 ? "Submitting..." : uploaded348 ? "Submitted" : "Submit"}
          </button>

          {error348 && <div className="error">{error348}</div>}
        </form>
      )}
    </div>

    {tableData348 && (
      <div>
      <h3>Bibliometric - Criterion 3.4.8</h3>
      <table>
        <thead>
          <tr>
            <th>Title of the Paper</th>
            <th>Name of the Author</th>
            <th>Title of the Journal</th>
            <th>Year of Publication</th>
            <th>Citation Index</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData348.map((data, index) => (
            <tr key={index}>
              <td>{data.titleOfPaper}</td>
              <td>{data.authorName}</td>
              <td>{data.journalTitle}</td>
              <td>{data.yearOfPublication}</td>
              <td>{data.citationIndex}</td>
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




<div className="formDiv">
      <h4>
        3.4.9 Bibliometrics of the publications during the year based on Scopus/Web of Science h-Index of the University
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm349}>
        {toggleForm349 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm349 && (
        <form onSubmit={handleSubmit349}>
          <div>
            <label htmlFor="titleOfPaper">Title of the Paper:</label>
            <input
              type="text"
              id="titleOfPaper"
              name="titleOfPaper"
              value={formData349.titleOfPaper}
              onChange={handleInputChange349}
            />
          </div>

          <div>
            <label htmlFor="authorName">Name of the Author:</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              onChange={handleInputChange349}
              value={formData349.authorName}
            />
          </div>

          <div>
            <label htmlFor="journalTitle">Title of the Journal:</label>
            <input
              type="text"
              id="journalTitle"
              name="journalTitle"
              value={formData349.journalTitle}
              onChange={handleInputChange349}
            />
          </div>

          <div>
            <label htmlFor="yearOfPublication">Year of Publication:</label>
            <input
              type="number"
              id="yearOfPublication"
              name="yearOfPublication"
              value={formData349.yearOfPublication}
              onChange={handleInputChange349}
            />
          </div>

          <div>
            <label htmlFor="hIndex">H Index:</label>
            <input
              type="number"
              id="hIndex"
              name="hIndex"
              value={formData349.hIndex}
              onChange={handleInputChange349}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange349} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading349 || uploaded349}>
            {uploading349 ? "Submitting..." : uploaded349 ? "Submitted" : "Submit"}
          </button>

          {error349 && <div className="error">{error349}</div>}
        </form>
      )}
    </div>
    {tableData349 && (
    <div>
      <h3>Bibliometric - Criterion 3.4.9</h3>
      <table>
        <thead>
          <tr>
            <th>Title of the Paper</th>
            <th>Name of the Author</th>
            <th>Title of the Journal</th>
            <th>Year of Publication</th>
            <th>H Index</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData349.map((data, index) => (
            <tr key={index}>
              <td>{data.titleOfPaper}</td>
              <td>{data.authorName}</td>
              <td>{data.journalTitle}</td>
              <td>{data.yearOfPublication}</td>
              <td>{data.hIndex}</td>
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





<div className="formDiv">
      <h4>
        3.5.2 Revenue generated from consultancy and corporate training during the year (INR in Lakhs)
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm352}>
        {toggleForm352 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm352 && (
        <form onSubmit={handleSubmit352}>
          <div>
            <label htmlFor="nameOfConsultants">Name of the Consultants:</label>
            <input
              type="text"
              id="nameOfConsultants"
              name="nameOfConsultants"
              value={formData352.nameOfConsultants}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="nameOfConsultancyProjects">Name of Consultancy Projects:</label>
            <input
              type="text"
              id="nameOfConsultancyProjects"
              name="nameOfConsultancyProjects"
              value={formData352.nameOfConsultancyProjects}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="consultingAgency">Consulting/Sponsoring Agency:</label>
            <input
              type="text"
              id="consultingAgency"
              name="consultingAgency"
              value={formData352.consultingAgency}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="revenueGenerated">Revenue Generated (Amount in Rupees):</label>
            <input
              type="number"
              id="revenueGenerated"
              name="revenueGenerated"
              value={formData352.revenueGenerated}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="totalRevenueGenerated">Total Revenue Generated (Amount in Rupees):</label>
            <input
              type="number"
              id="totalRevenueGenerated"
              name="totalRevenueGenerated"
              value={formData352.totalRevenueGenerated}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="corporateTrainingDetails">Details of Corporate Training Provided:</label>
            <input
              type="text"
              id="corporateTrainingDetails"
              name="corporateTrainingDetails"
              value={formData352.corporateTrainingDetails}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="titleOfTraining">Title of the Training:</label>
            <input
              type="text"
              id="titleOfTraining"
              name="titleOfTraining"
              value={formData352.titleOfTraining}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="numberOfParticipants">Number of Participants Benefitted:</label>
            <input
              type="number"
              id="numberOfParticipants"
              name="numberOfParticipants"
              value={formData352.numberOfParticipants}
              onChange={handleInputChange352}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange352} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading352 || uploaded352}>
            {uploading352 ? "Submitting..." : uploaded352 ? "Submitted" : "Submit"}
          </button>

          {error352 && <div className="error">{error352}</div>}
        </form>
      )}
    </div>

    <div>
      <h3>Revenue Generated - Criterion 3.5.2</h3>
      <table>
        <thead>
          <tr>
            <th>Name of Consultants</th>
            <th>Name of Consultancy Projects</th>
            <th>Consulting/Sponsoring Agency</th>
            <th>Revenue Generated</th>
            <th>Total Revenue Generated</th>
            <th>Corporate Training Details</th>
            <th>Title of the Training</th>
            <th>Number of Participants Benefitted</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tableData352.map((data, index) => (
            <tr key={index}>
              <td>{data.nameOfConsultants}</td>
              <td>{data.nameOfConsultancyProjects}</td>
              <td>{data.consultingAgency}</td>
              <td>{data.revenueGenerated}</td>
              <td>{data.totalRevenueGenerated}</td>
              <td>{data.corporateTrainingDetails}</td>
              <td>{data.titleOfTraining}</td>
              <td>{data.numberOfParticipants}</td>
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










</div>


</div>
    </div>
  );
};

export default Criterion3;
