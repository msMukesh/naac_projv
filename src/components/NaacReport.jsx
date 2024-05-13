import React, { useEffect, useState, useRef } from "react";
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
  const [tableData315, setTableData315] = useState(null);
  const [tableData322, setTableData322] = useState(null);
  const [tableData323, setTableData323] = useState(null);
  const [tableData331, setTableData331] = useState(null);
  const [tableData332, setTableData332] = useState(null);
  const [tableData333, setTableData333] = useState(null);
  const [tableData341, setTableData341] = useState(null);
  const [tableData342, setTableData342] = useState(null);
  const [tableData343, setTableData343] = useState(null);
  const [tableData344, setTableData344] = useState(null);
  const [tableData345, setTableData345] = useState(null);
  const [tableData346, setTableData346] = useState(null);
  const [tableData347, setTableData347] = useState(null);
  const [tableData348, setTableData348] = useState(null);
  const [tableData349, setTableData349] = useState(null);
  const [tableData351, setTableData351] = useState(null);
  const [tableData352, setTableData352] = useState(null);
  const [tableData361, setTableData361] = useState(null);
  const [tableData362, setTableData362] = useState(null);
  const [tableData363, setTableData363] = useState(null);
  const [tableData364, setTableData364] = useState(null);
  const [tableData371, setTableData371] = useState(null);
  const [tableData372, setTableData372] = useState(null);



const[handleDeleteFlag,sethandleDeleteFlag]=useState(false);

  const handleDelete = async (id) => {
    sethandleDeleteFlag(!handleDeleteFlag);
    try {
      const response = await axios.delete(`https://naac-projv.onrender.com/deleteFile/${id}`);
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
        "https://naac-projv.onrender.com/311upload",
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
// for (const pair of formDataToSend.entries()) {
//   console.log(pair[0], pair[1]);
// } 

  // Check if a file is uploaded before appending it to FormData
  // if (formData312.file312) {
  //   formDataToSend.append("file", formData312.file312);
  // }

    try {
      const response = await axios.post(
        "https://naac-projv.onrender.com/312upload",
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
        "https://naac-projv.onrender.com/313upload",
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


  // async function getDetails() {
  //   try {

  //     const response = await axios.get("https://naac-projv.onrender.com/getFile313");
  //     console.log(response.data);
  //     // Handle the response data as needed
  //   } catch (error) {
  //     console.error("Error fetching details:", error);
  //     // Handle errors
  //   }
  // }

  // useEffect(()=>{
  //   getDetails()

  // },[])
  

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
      const response = await axios.post("https://naac-projv.onrender.com/314upload", formData, {
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
    centralInstrumentationCentre: '',
    animalHouseGreenHouse: '',
    museum: '',
    mediaLaboratory: '',
    businessLab: '',
    researchStatisticalDatabases: '',
    mootCourt: '',
    theatre: '',
    artGallery: '',
    otherFacility: '',
    files: null, // File for supporting documents

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
    setFormData315({ ...formData315, [name]: value });

  };

  const handleFileChange315 = (e) => {
    setFormData315({ ...formData315, files: e.target.files });

  };


  const handleSubmit315 = async (e) => {
    e.preventDefault();
    setUploading315(true);
    setError315(null);

    const formData = new FormData();
    // const userName = Cookies.get('userName') || 'default_user'; // Handle missing userName

    const userName = Cookies.get("userName");
    const id = userName + "315"; // Unique ID for data submission

    formData.append("id", id);
    formData.append('facilityName', formData315.facilityName);
    formData.append('yearOfEstablishment', formData315.yearOfEstablishment);
    formData.append('centralInstrumentationCentre', formData315.centralInstrumentationCentre);
    formData.append('animalHouseGreenHouse', formData315.animalHouseGreenHouse);
    formData.append('museum', formData315.museum );
    formData.append('mediaLaboratory', formData315.mediaLaboratory );
    formData.append('businessLab', formData315.businessLab );
    formData.append('researchStatisticalDatabases', formData315.researchStatisticalDatabases);
    formData.append('mootCourt', formData315.mootCourt );
    formData.append('theatre', formData315.theatre );
    formData.append('artGallery', formData315.artGallery);
    formData.append('otherFacility', formData315.otherFacility );

    if(formData315.files){
      formData.append('file', formData315.files[0]);

    }


    try {
      await axios.post('https://naac-projv.onrender.com/315upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData315(initialFormData315);
      setUploaded315(true);
      
      setTimeout(() => {
        setUploaded315(false); // Reset upload status after some time
      }, 1000);

      setToggleForm315(false); // Hide form after submission

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
  setFormData316({ ...formData316, files: e.target.files[0] });
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
    const response = await axios.post("https://naac-projv.onrender.com/316upload", dataToSend, {
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
    const response = await axios.post("https://naac-projv.onrender.com/321upload", dataToSend, {
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
    await axios.post("https://naac-projv.onrender.com/322upload", formData, {
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
      await axios.post("https://naac-projv.onrender.com/323upload", formData, {
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


  const initialFormData331 = {
    innovationEcosystem: '',
    ecosystemLaboratory: '',
    innovationCenter: '',
    knowledgeIncubationCenter: '',
    startupCenter: '',
    otherSimilar: '',
    description: '',
    files: null, // File for supporting documents
  };
  
    const [formData331, setFormData331] = useState(initialFormData331);
    const [uploading331, setUploading331] = useState(false);
    const [uploaded331, setUploaded331] = useState(false);
    const [error331, setError331] = useState(null);
    const [toggleForm331, setToggleForm331] = useState(false);
  
    const handleInputChange331 = (e) => {
      const { name, value } = e.target;
      setFormData331({ ...formData331, [name]: value });
    };
  
    const handleFileChange331 = (e) => {
      setFormData331({ ...formData331, files: e.target.files });
    };
  
    const handleToggleForm331 = () => {
      setToggleForm331((prevState) => !prevState);
    };
  
    const handleSubmit331 = async (e) => {
      e.preventDefault();
      setUploading331(true);
      setError331(null);
  
      const formData = new FormData();
      const userName = Cookies.get("userName");
      const id = userName + "_331"; // Unique ID for data submission
  
      formData.append("id", id);
      formData.append("innovationEcosystem", formData331.innovationEcosystem);
      formData.append("ecosystemLaboratory", formData331.ecosystemLaboratory);
      formData.append("innovationCenter", formData331.innovationCenter);
      formData.append("knowledgeIncubationCenter", formData331.knowledgeIncubationCenter);
      formData.append("startupCenter", formData331.startupCenter);
      formData.append("otherSimilar", formData331.otherSimilar);
      formData.append("description", formData331.description);
  
      if (formData331.files) {
        formData.append("file", formData331.files[0]); // Supporting document upload
      }
  
      try {
        await axios.post("https://naac-projv.onrender.com/331upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setFormData331(initialFormData331); // Reset form data after submission
        setUploaded331(true);
  
        setTimeout(() => {
          setUploaded331(false); // Reset upload status after some time
        }, 1000);
  
        setToggleForm331(false); // Hide form after submission
      } catch (error) {
        console.error("Error uploading files:", error);
        setError331("Error uploading files. Please try again.");
      } finally {
        setUploading331(false); // Reset uploading status
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
        await axios.post("https://naac-projv.onrender.com/332upload", formData, {
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
          await axios.post("https://naac-projv.onrender.com/333upload", formData, {
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
      await axios.post("https://naac-projv.onrender.com/341upload", formData, {
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
            await axios.post("https://naac-projv.onrender.com/342upload", formData, {
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
              await axios.post("https://naac-projv.onrender.com/343upload", formData, {
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
                await axios.post("https://naac-projv.onrender.com/344upload", formData, {
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
                  await axios.post("https://naac-projv.onrender.com/345upload", formData, {
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
                    await axios.post("https://naac-projv.onrender.com/346upload", formData, {
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
              




                const initialFormData347 = {
                  teacherName: '',
                  moduleName: '',
                  platform: '',
                  launchDate: '',
                  platformCount: '',
                  files: null,
                };
                
                  const [formData347, setFormData347] = useState(initialFormData347);
                  const [uploading347, setUploading347] = useState(false);
                  const [uploaded347, setUploaded347] = useState(false);
                  const [error347, setError347] = useState(null);
                  const [toggleForm347, setToggleForm347] = useState(false);
                
                  const handleInputChange347 = (e) => {
                    const { name, value } = e.target;
                    setFormData347({ ...formData347, [name]: value });
                  };
                
                  const handleFileChange347 = (e) => {
                    setFormData347({ ...formData347, files: e.target.files });
                  };
                
                  const handleToggleForm347 = () => {
                    setToggleForm347((prevState) => !prevState);
                  };
                
                  const handleSubmit347 = async (e) => {
                    e.preventDefault();
                    setUploading347(true);
                    setError347(null);
                
                    const formData = new FormData();
                    const userName = Cookies.get("userName");
                    const id = userName + "347"; // Unique ID for data submission
                
                    formData.append("id", id);
                    formData.append("teacherName", formData347.teacherName);
                    formData.append("moduleName", formData347.moduleName);
                    formData.append("platform", formData347.platform);
                    formData.append("launchDate", formData347.launchDate);
                    formData.append("platformCount", formData347.platformCount);
                
                    if (formData347.files) {
                      formData.append("file", formData347.files[0]); // Supporting document upload
                    }
                
                    try {
                      await axios.post("https://naac-projv.onrender.com/347upload", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      });
                
                      setFormData347(initialFormData347); // Reset form data after submission
                      setUploaded347(true);
                
                      setTimeout(() => {
                        setUploaded347(false); // Reset upload status after some time
                      }, 1000);
                
                      setToggleForm347(false); // Hide form after submission
                    } catch (error) {
                      console.error("Error uploading files:", error);
                      setError347("Error uploading files. Please try again.");
                    } finally {
                      setUploading347(false); // Reset uploading status
                    }
                  };

                  




                  const initialFormDataPlatforms = {
                    ePgPathshala: { status: '', details: '' },
                    cecUndergraduate: { status: '', details: '' },
                    swayam: { status: '', details: '' },
                    moocsPlatform: { status: '', details: '' },
                    governmentInitiatives: { status: '', details: '' },
                    institutionalLms: { status: '', details: '' },
                    files: null,
                  };
                  
                    const [formData, setFormData] = useState(initialFormDataPlatforms);
                    const [uploading, setUploading] = useState(false);
                    const [uploaded, setUploaded] = useState(false);
                    const [error, setError] = useState(null);
                    const [toggleForm, setToggleForm] = useState(false);
                  
                    const handleInputChange = (e) => {
                      const { name, value } = e.target;
                      const [key, subkey] = name.split('_'); // Split to get the platform and the subkey
                      setFormData((prevData) => ({
                        ...prevData,
                        [key]: {
                          ...prevData[key],
                          [subkey]: value,
                        },
                      }));
                    };
                  
                    const handleFileChange = (e) => {
                      setFormData({ ...formData, files: e.target.files });
                    };
                  
                    const handleToggleForm = () => {
                      setToggleForm((prevState) => !prevState);
                    };
                  
                    const handleSubmit3471 = async (e) => {
                      e.preventDefault();
                      setUploading(true);
                      setError(null);
                  
                      const formDataToSend = new FormData();
                      const userName = Cookies.get("userName");
                      const id = `${userName}_platforms`;
                  
                      formDataToSend.append("id", id);
                  
                      Object.keys(formData).forEach((key) => {
                        if (key !== 'files') {
                          formDataToSend.append(`${key}_status`, formData[key].status);
                          formDataToSend.append(`${key}_details`, formData[key].details);
                        }
                      });
                  
                      if (formData.files) {
                        formDataToSend.append("files", formData.files[0]); // Supporting document upload
                      }
                  
                      try {
                        await axios.post("https://naac-projv.onrender.com/platforms_upload", formDataToSend, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        });
                  
                        setFormData(initialFormDataPlatforms); // Reset form data after submission
                        setUploaded(true);
                  
                        setTimeout(() => {
                          setUploaded(false); // Reset upload status after some time
                        }, 1000);
                  
                        setToggleForm(false); // Hide form after submission
                      } catch (error) {
                        console.error("Error uploading files:", error);
                        setError("Error uploading files. Please try again.");
                      } finally {
                        setUploading(false); // Reset uploading status
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
                      await axios.post("https://naac-projv.onrender.com/348upload", formData, {
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
                        await axios.post("https://naac-projv.onrender.com/349upload", formData, {
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









                    const initialFormData351 = {
                      governingMinutes: null,
                      consultancyPolicy: null,
                      additionalInfo: null,
                    };
                    
                      const [formData351, setFormData351] = useState(initialFormData351);
                      const [uploading351, setUploading351] = useState(false);
                      const [uploaded351, setUploaded351] = useState(false);
                      const [error351, setError351] = useState(null);
                      const [toggleForm351, setToggleForm351] = useState(false);
                    
                      const handleFileChange351 = (e) => {
                        const { name, files } = e.target;
                        setFormData351({ ...formData351, [name]: files });
                      };
                    
                      const handleToggleForm351 = () => {
                        setToggleForm351((prevState) => !prevState);
                      };
                    
                      const handleSubmit351 = async (e) => {
                        e.preventDefault();
                        setUploading351(true);
                        setError351(null);
                    
                        const formData = new FormData();
                        const userName = Cookies.get("userName");
                        const id = userName + "351"; // Unique ID for data submission
                    
                        formData.append("id", id);
                    
                        if (formData351.governingMinutes) {
                          formData.append("governingMinutes", formData351.governingMinutes[0]); // Assuming single file for minutes
                        }
                        if (formData351.consultancyPolicy) {
                          formData.append("consultancyPolicy", formData351.consultancyPolicy[0]); // Consultancy policy document
                        }
                        if (formData351.additionalInfo) {
                          formData.append("additionalInfo", formData351.additionalInfo[0]); // Additional information, if any
                        }
                    
                        try {
                          await axios.post("https://naac-projv.onrender.com/351upload", formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          });
                    
                          setFormData351(initialFormData351); // Reset form data after submission
                          setUploaded351(true);
                    
                          setTimeout(() => {
                            setUploaded351(false); // Reset upload status after some time
                          }, 1000);
                    
                          setToggleForm351(false); // Hide form after submission
                        } catch (error) {
                          console.error("Error uploading files:", error);
                          setError351("Error uploading files. Please try again.");
                        } finally {
                          setUploading351(false); // Reset uploading status
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
                          await axios.post("https://naac-projv.onrender.com/352upload", formData, {
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




                      const initialFormData361 = {
                        titleOfProgram: '',
                        beneficiaryOrganization: '',
                        outreachProgramDescription: '',
                        eventDate: '',
                        eventVenue: '',
                        outcome: '',
                        impactDescription: '',
                        files: null,
                      };
                      
                        const [formData361, setFormData361] = useState(initialFormData361);
                        const [uploading361, setUploading361] = useState(false);
                        const [uploaded361, setUploaded361] = useState(false);
                        const [error361, setError361] = useState(null);
                        const [toggleForm361, setToggleForm361] = useState(false);
                      
                        const handleInputChange361 = (e) => {
                          const { name, value } = e.target;
                          setFormData361({ ...formData361, [name]: value });
                        };
                      
                        const handleFileChange361 = (e) => {
                          setFormData361({ ...formData361, files: e.target.files });
                        };
                      
                        const handleToggleForm361 = () => {
                          setToggleForm361((prevState) => !prevState);
                        };
                      
                        const handleSubmit361 = async (e) => {
                          e.preventDefault();
                          setUploading361(true);
                          setError361(null);
                      
                          const formData = new FormData();
                          const userName = Cookies.get("userName");
                          const id = userName + "361"; // Unique ID for data submission
                      
                          formData.append("id", id);
                          formData.append("titleOfProgram", formData361.titleOfProgram);
                          formData.append("beneficiaryOrganization", formData361.beneficiaryOrganization);
                          formData.append("outreachProgramDescription", formData361.outreachProgramDescription);
                          formData.append("eventDate", formData361.eventDate);
                          formData.append("eventVenue", formData361.eventVenue);
                          formData.append("outcome", formData361.outcome);
                          formData.append("impactDescription", formData361.impactDescription);
                      
                          if (formData361.files) {
                            formData.append("file", formData361.files[0]); // Supporting document upload
                          }
                      
                          try {
                            await axios.post("https://naac-projv.onrender.com/361upload", formData, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            });
                      
                            setFormData361(initialFormData361); // Reset form data after submission
                            setUploaded361(true);
                      
                            setTimeout(() => {
                              setUploaded361(false); // Reset upload status after some time
                            }, 1000);
                      
                            setToggleForm361(false); // Hide form after submission
                          } catch (error) {
                            console.error("Error uploading files:", error);
                            setError361("Error uploading files. Please try again.");
                          } finally {
                            setUploading361(false); // Reset uploading status
                          }
                        };








                        const initialFormData362 = {
                          teacherName: '',
                          activityName: '',
                          awardName: '',
                          awardingBody: '',
                          yearOfAward: '',
                          files: null,
                        };
                        
                          const [formData362, setFormData362] = useState(initialFormData362);
                          const [uploading362, setUploading362] = useState(false);
                          const [uploaded362, setUploaded362] = useState(false);
                          const [error362, setError362] = useState(null);
                          const [toggleForm362, setToggleForm362] = useState(false);
                        
                          const handleInputChange362 = (e) => {
                            const { name, value } = e.target;
                            setFormData362({ ...formData362, [name]: value });
                          };
                        
                          const handleFileChange362 = (e) => {
                            setFormData362({ ...formData362, files: e.target.files });
                          };
                        
                          const handleToggleForm362 = () => {
                            setToggleForm362((prevState) => !prevState);
                          };
                        
                          const handleSubmit362 = async (e) => {
                            e.preventDefault();
                            setUploading362(true);
                            setError362(null);
                        
                            const formData = new FormData();
                            const userName = Cookies.get("userName");
                            const id = userName + "362"; // Unique ID for data submission
                        
                            formData.append("id", id);
                            formData.append("teacherName", formData362.teacherName);
                            formData.append("activityName", formData362.activityName);
                            formData.append("awardName", formData362.awardName);
                            formData.append("awardingBody", formData362.awardingBody);
                            formData.append("yearOfAward", formData362.yearOfAward);
                        
                            if (formData362.files) {
                              formData.append("file", formData362.files[0]); // Supporting document upload
                            }
                        
                            try {
                              await axios.post("https://naac-projv.onrender.com/362upload", formData, {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              });
                        
                              setFormData362(initialFormData362); // Reset form data after submission
                              setUploaded362(true);
                        
                              setTimeout(() => {
                                setUploaded362(false); // Reset upload status after some time
                              }, 1000);
                        
                              setToggleForm362(false); // Hide form after submission
                            } catch (error) {
                              console.error("Error uploading files:", error);
                              setError362("Error uploading files. Please try again.");
                            } finally {
                              setUploading362(false); // Reset uploading status
                            }
                          };
                        



                          const initialFormData363 = {
                            activityName: '',
                            organizingUnit: '',
                            schemeName: '',
                            numberOfStudents: '',
                            issuesAddressed: '',
                            files: null,
                          };
                          
                            const [formData363, setFormData363] = useState(initialFormData363);
                            const [uploading363, setUploading363] = useState(false);
                            const [uploaded363, setUploaded363] = useState(false);
                            const [error363, setError363] = useState(null);
                            const [toggleForm363, setToggleForm363] = useState(false);
                          
                            const handleInputChange363 = (e) => {
                              const { name, value } = e.target;
                              setFormData363({ ...formData363, [name]: value });
                            };
                          
                            const handleFileChange363 = (e) => {
                              setFormData363({ ...formData363, files: e.target.files });
                            };
                          
                            const handleToggleForm363 = () => {
                              setToggleForm363((prevState) => !prevState);
                            };
                          
                            const handleSubmit363 = async (e) => {
                              e.preventDefault();
                              setUploading363(true);
                              setError363(null);
                          
                              const formData = new FormData();
                              const userName = Cookies.get("userName");
                              const id = userName + "363"; // Unique ID for data submission
                          
                              formData.append("id", id);
                              formData.append("activityName", formData363.activityName);
                              formData.append("organizingUnit", formData363.organizingUnit);
                              formData.append("schemeName", formData363.schemeName);
                              formData.append("numberOfStudents", formData363.numberOfStudents);
                              formData.append("issuesAddressed", formData363.issuesAddressed);
                          
                              if (formData363.files) {
                                formData.append("file", formData363.files[0]); // Supporting document upload
                              }
                          
                              try {
                                await axios.post("https://naac-projv.onrender.com/363upload", formData, {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                });
                          
                                setFormData363(initialFormData363); // Reset form data after submission
                                setUploaded363(true);
                          
                                setTimeout(() => {
                                  setUploaded363(false); // Reset upload status after some time
                                }, 1000);
                          
                                setToggleForm363(false); // Hide form after submission
                              } catch (error) {
                                console.error("Error uploading files:", error);
                                setError363("Error uploading files. Please try again.");
                              } finally {
                                setUploading363(false); // Reset uploading status
                              }
                            };

                            
                            const initialFormData364 = {
                              activityName: '',
                              schemeName: '',
                              yearOfActivity: '',
                              studentNames: '',
                              files: null,
                            };
                            
                              const [formData364, setFormData364] = useState(initialFormData364);
                              const [uploading364, setUploading364] = useState(false);
                              const [uploaded364, setUploaded364] = useState(false);
                              const [error364, setError364] = useState(null);
                              const [toggleForm364, setToggleForm364] = useState(false);
                            
                              const handleInputChange364 = (e) => {
                                const { name, value } = e.target;
                                setFormData364({ ...formData364, [name]: value });
                              };
                            
                              const handleFileChange364 = (e) => {
                                setFormData364({ ...formData364, files: e.target.files });
                              };
                            
                              const handleToggleForm364 = () => {
                                setToggleForm364((prevState) => !prevState);
                              };
                            
                              const handleSubmit364 = async (e) => {
                                e.preventDefault();
                                setUploading364(true);
                                setError364(null);
                            
                                const formData = new FormData();
                                const userName = Cookies.get("userName");
                                const id = userName + "364"; // Unique ID for data submission
                            
                                formData.append("id", id);
                                formData.append("activityName", formData364.activityName);
                                formData.append("schemeName", formData364.schemeName);
                                formData.append("yearOfActivity", formData364.yearOfActivity);
                                formData.append("studentNames", formData364.studentNames);
                            
                                if (formData364.files) {
                                  formData.append("file", formData364.files[0]); // Supporting document upload
                                }
                            
                                try {
                                  await axios.post("https://naac-projv.onrender.com/364upload", formData, {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  });
                            
                                  setFormData364(initialFormData364); // Reset form data after submission
                                  setUploaded364(true);
                            
                                  setTimeout(() => {
                                    setUploaded364(false); // Reset upload status after some time
                                  }, 1000);
                            
                                  setToggleForm364(false); // Hide form after submission
                                } catch (error) {
                                  console.error("Error uploading files:", error);
                                  setError364("Error uploading files. Please try again.");
                                } finally {
                                  setUploading364(false); // Reset uploading status
                                }
                              };







                              const initialFormData371 = {
                                collaborativeTitle: '',
                                collaboratingAgency: '',
                                financialSupportSource: '',
                                collaborationYear: '',
                                collaborationDuration: '',
                                facultyInvolved: '',
                                natureOfActivity: '',
                                files: null,
                              };
                              
                                const [formData371, setFormData371] = useState(initialFormData371);
                                const [uploading371, setUploading371] = useState(false);
                                const [uploaded371, setUploaded371] = useState(false);
                                const [error371, setError371] = useState(null);
                                const [toggleForm371, setToggleForm371] = useState(false);
                              
                                const handleInputChange371 = (e) => {
                                  const { name, value } = e.target;
                                  setFormData371({ ...formData371, [name]: value });
                                };
                              
                                const handleFileChange371 = (e) => {
                                  setFormData371({ ...formData371, files: e.target.files });
                                };
                              
                                const handleToggleForm371 = () => {
                                  setToggleForm371((prevState) => !prevState);
                                };
                              
                                const handleSubmit371 = async (e) => {
                                  e.preventDefault();
                                  setUploading371(true);
                                  setError371(null);
                              
                                  const formData = new FormData();
                                  const userName = Cookies.get("userName");
                                  const id = userName + "371"; // Unique ID for data submission
                              
                                  formData.append("id", id);
                                  formData.append("collaborativeTitle", formData371.collaborativeTitle);
                                  formData.append("collaboratingAgency", formData371.collaboratingAgency);
                                  formData.append("financialSupportSource", formData371.financialSupportSource);
                                  formData.append("collaborationYear", formData371.collaborationYear);
                                  formData.append("collaborationDuration", formData371.collaborationDuration);
                                  formData.append("facultyInvolved", formData371.facultyInvolved);
                                  formData.append("natureOfActivity", formData371.natureOfActivity);
                              
                                  if (formData371.files) {
                                    formData.append("file", formData371.files[0]); // Supporting document upload
                                  }
                              
                                  try {
                                    await axios.post("https://naac-projv.onrender.com/371upload", formData, {
                                      headers: {
                                        "Content-Type": "multipart/form-data",
                                      },
                                    });
                              
                                    setFormData371(initialFormData371); // Reset form data after submission
                                    setUploaded371(true);
                              
                                    setTimeout(() => {
                                      setUploaded371(false); // Reset upload status after some time
                                    }, 1000);
                              
                                    setToggleForm371(false); // Hide form after submission
                                  } catch (error) {
                                    console.error("Error uploading files:", error);
                                    setError371("Error uploading files. Please try again.");
                                  } finally {
                                    setUploading371(false); // Reset uploading status
                                  }
                                };







                                const initialFormData372 = {
                                  organizationName: '',
                                  mouYear: '',
                                  mouDuration: '',
                                  facultyCoordinators: '',
                                  actualActivities: '',
                                  participants: '',
                                  files: null,
                                };
                                
                                  const [formData372, setFormData372] = useState(initialFormData372);
                                  const [uploading372, setUploading372] = useState(false);
                                  const [uploaded372, setUploaded372] = useState(false);
                                  const [error372, setError372] = useState(null);
                                  const [toggleForm372, setToggleForm372] = useState(false);
                                
                                  const handleInputChange372 = (e) => {
                                    const { name, value } = e.target;
                                    setFormData372({ ...formData372, [name]: value });
                                  };
                                
                                  const handleFileChange372 = (e) => {
                                    setFormData372({ ...formData372, files: e.target.files });
                                  };
                                
                                  const handleToggleForm372 = () => {
                                    setToggleForm372((prevState) => !prevState);
                                  };
                                
                                  const handleSubmit372 = async (e) => {
                                    e.preventDefault();
                                    setUploading372(true);
                                    setError372(null);
                                
                                    const formData = new FormData();
                                    const userName = Cookies.get("userName");
                                    const id = userName + "372"; // Unique ID for data submission
                                
                                    formData.append("id", id);
                                    formData.append("organizationName", formData372.organizationName);
                                    formData.append("mouYear", formData372.mouYear);
                                    formData.append("mouDuration", formData372.mouDuration);
                                    formData.append("facultyCoordinators", formData372.facultyCoordinators);
                                    formData.append("actualActivities", formData372.actualActivities);
                                    formData.append("participants", formData372.participants);
                                
                                    if (formData372.files) {
                                      formData.append("file", formData372.files[0]); // Supporting document upload
                                    }
                                
                                    try {
                                      await axios.post("https://naac-projv.onrender.com/372upload", formData, {
                                        headers: {
                                          "Content-Type": "multipart/form-data",
                                        },
                                      });
                                
                                      setFormData372(initialFormData372); // Reset form data after submission
                                      setUploaded372(true);
                                
                                      setTimeout(() => {
                                        setUploaded372(false); // Reset upload status after some time
                                      }, 1000);
                                
                                      setToggleForm372(false); // Hide form after submission
                                    } catch (error) {
                                      console.error("Error uploading files:", error);
                                      setError372("Error uploading files. Please try again.");
                                    } finally {
                                      setUploading372(false); // Reset uploading status
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
//           const response = await axios.get(`https://naac-projv.onrender.com/getFile${number}`);
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
      const criterionNumbers = [311, 312, 313, 314,315, 316, 321, 322, 323, 331, 332, 333, 341, 342, 343, 344, 345, 346, 347, 348, 349, 351, 352, 361, 362, 363, 364, 371, 372];

      // [311, 312, 313, 314, 315, 316, 321, 322, 323, 331, 332, 333, 341, 342, 343, 344, 345, 346, 347, 348, 349, 351, 352, 361, 362, 363, 364, 371, 372]


      // Construct query parameters
      const params = {
        userName,
        criterionNumbers: criterionNumbers.join(','),
      };

      // Send GET request with query parameters
      const response = await axios.get("https://naac-projv.onrender.com/getAll", { params });

      if (response.status === 200) {
        const results = response.data.results; // Each element is an array of data for a criterion

        // Validate the length of results and update table data
        setTableData311(results[0] || []); // Default to an empty array if not found
        setTableData312(results[1] || []);
        setTableData313(results[2] || []);
        setTableData314(results[3] || []);
        setTableData315(results[4] || []);
        setTableData316(results[5] || []);
        setTableData321(results[6] || []);
        setTableData322(results[7] || []);
        setTableData323(results[8] || []);
        setTableData331(results[9] || []);
        setTableData332(results[10] || []);
        setTableData333(results[11] || []);
        setTableData341(results[12] || []);
        setTableData342(results[13] || []);
        setTableData343(results[14] || []);
        setTableData344(results[15] || []);
        setTableData345(results[16] || []);
        setTableData346(results[17] || []);
        setTableData347(results[18] || []);
        setTableData348(results[19] || []);
        setTableData349(results[20] || []);
        setTableData351(results[21] || []);
        setTableData352(results[22] || []);
        setTableData361(results[23] || []);
        setTableData362(results[24] || []);
        setTableData363(results[25] || []);
        setTableData364(results[26] || []);
        setTableData371(results[27] || []);
        setTableData372(results[28] || []);



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
  uploaded322,
  uploaded323,
  uploaded331,
  uploaded332,
  uploaded333,
  uploaded341,
  uploaded342,
  uploaded343,
  uploaded344,
  uploaded345,
  uploaded346,
  uploaded347,
  uploaded348,
  uploaded349,
  uploaded351,
  uploaded352,
  uploaded361,
  uploaded362,
  uploaded363,
  uploaded364,
  uploaded371,
  uploaded372,

  handleDeleteFlag
]);

// [311, 312, 313, 314, 315, 316, 321, 322, 323, 331, 332, 333, 341, 342, 343, 344, 
//345, 346, 347, 348, 349, 351, 352, 361, 362, 363, 364, 371, 372]

const handleDownloadFile = (fileName) => {
  window.open(`https://naac-projv.onrender.com/downloadFile?fileName=${encodeURIComponent(fileName)}`, "_blank");
};

function getFileNameFromPath(filePath1) {
  if (!filePath1) {
    // Return null or any default value if filePath1 is null or undefined
    return null;
  }

  // Split the file path by the directory separator ("/" or "\")
  const separatorIndex = Math.max(filePath1.lastIndexOf('/'), filePath1.lastIndexOf('\\'));
  
  // Check if the separatorIndex is -1, meaning no directory separator was found
  if (separatorIndex === -1) {
    // If no separator was found, return the whole filePath1
    return filePath1;
  }
  
  // Extract the filename by slicing the path from the last directory separator
  const fileName1 = filePath1.slice(separatorIndex + 1);
  // console.log("fileName: " + fileName1);

  return fileName1;
}


const [showForm, setShowForm] = useState(true);
const [hideActions, setHideActions] = useState(false); // State to control visibility of actions

const handleGenerateReport = () => {
  setShowForm(!showForm);
  setHideActions(!hideActions); // Toggle the visibility of actions
};




 const containerRef = React.useRef(null);


 const handleClickPrint = () => {
  if (containerRef.current) {
    const containerContent = containerRef.current.innerHTML;
    const printWindow = window.open(); // Open a new print window
    printWindow.document.write(`
      <html>
      <head>
        <style>
          /* Add styles for table borders */
          table {
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
          }
          .downloadReport, .navbar {
            display: none !important;
          }
        </style>
      </head>
      <body>${containerContent}</body>
      </html>
    `); // Write content to print window
    printWindow.document.close(); // Close the document for printing
    printWindow.focus(); // Focus the window for printing
    printWindow.print(); // Trigger printing
  }
};


  return (

    <div className="displayContainer" ref={containerRef} >
      <NavBar />

      <div className="criterion-container">
      <button className="downloadReport"  onClick={handleGenerateReport}>Generate Report</button>

      <button className="downloadReport" onClick={handleClickPrint}>Print Container</button>

      <div className="criterionCon31">

          <h2 class="criterionMainTitle">Criterion III - Research, Innovations and Extension</h2>
          <h3 className="subTitle1">Key Indicator - 3.1 Promotion of Research and Facilities</h3>

          {/* Criterion 3.1.1 Form */}
          <div className="formDiv">
              <h4>3.1.1 The institution Research facilities are frequently updated and there is well defined policy for
                  promotion of research which is uploaded on the institutional website and implemented 
              </h4>



              {showForm && (
          <div>
            <p>Upload relevant supporting document</p>
            <input type="file" onChange={handleFile311Change} />
            <button className="submitFormBtn" onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? 'Uploading...' : uploaded311 ? 'Uploaded' : 'Upload'}
            </button>
            {error311 && <div className="error">{error311}</div>}
          </div>
        )}


          </div>



          {tableData311 && (
  <div>
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>File</th>
          {!hideActions && (
          <th className={hideActions ? 'Deltd hidden' : 'Deltd'}>Actions</th>)}
        </tr>
      </thead>
      <tbody>
        {/* Map over the tableData311 array to create a row for each object */}
        {tableData311.map((data, index) => (
          <tr key={index}>
            <td>{data._id}</td> {/* ID column */}
            <td>

            <div>{getFileNameFromPath(data.filePath)}</div>

              <button
                className="Downloadbtn"
                onClick={() => handleDownloadFile(data.filePath)}
              >
                Download File
              </button>
            </td>
            {!hideActions && (
            <td className={hideActions ? 'Deltd hidden' : 'Deltd'}>
                    {/* Conditional rendering of delete button based on hideActions state */}
                    
                      <button className="Deletebtn" onClick={() => handleDelete(data._id)}>Delete</button>
                   
                  </td> )}
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
          
          
          {showForm && (
<div>
           <button className="toggleFormbtn" onClick={handleToggleForm312}>
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
          <th>File</th>          {!hideActions && (

          <th>Actions</th> )}
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

              <div>{getFileNameFromPath(data.filePath)}</div>

              <button
                className="Downloadbtn"
                onClick={() => handleDownloadFile(data.filePath)}
              >
                Download File
              </button>
            </td>
            {!hideActions && (
            <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              
            </td>)}
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

            {showForm && (
<div>
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
                {!hideActions && (

                <th>Actions</th>          )}

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
                <div>{getFileNameFromPath(data.filePath)}</div>

                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData313.filePath}</td> */}
                {!hideActions && (

                <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              
            </td>          )}

              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}


<div className="formDiv">
    <h4>3.1.4 - JRFs, SRFs, Post-Doctoral Fellows, Research Associates, and other research fellows enrolled in the institution during the year</h4>
    {showForm && (
<div>
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
                {!hideActions && (

                <th>Actions</th>
              )}
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
                <div>{getFileNameFromPath(data.filePath)}</div>

                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData314.filePath}</td> */}

                {!hideActions && (

                <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              
            </td>
            )}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}




<div className="formDiv">
      <h4>3.1.5.	Your department is having the following facilities to support research:</h4>
     

      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm315}>
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
            <label>Media laboratory/Studios:</label>
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
            <label>Research/Statistical Databases:</label>
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
            <label>Any other facility to support research :</label>
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
          )}
    </div>




    {tableData315 && (

    <div>
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
            {!hideActions && (

            <th>Actions</th>
          )}
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
              {!hideActions && (

              <td> {/* Actions column */}
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
              
            </td>
            )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}



{/* Criterion 3.1.6 Form */}
  <div className="formDiv">
  <h4>Criterion 3.1.6 - Departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR, and other recognitions by national and international agencies during the year</h4>
  
  
  {showForm && (
<div>
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
          )}


        </div>

        {tableData316 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name of the Scheme</th>
                <th>Principal Investigator / Co-principal investigator</th>
                <th>Name of the Funding Agency</th>
                <th>Type Govt. / Non Govt.</th>
                <th>department</th>
                <th>Year of Award</th>
                <th>Fund Layout amount Provided</th>
                <th>Duration</th>
                <th>File</th>
                {!hideActions && (

                <th>Actions</th>
              )}
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
                <div>{getFileNameFromPath(data.filePath)}</div>

                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                  Download File
                  </button>
                </td>
                {/* <td>{tableData316.filePath}</td> */}
                {!hideActions && (

                <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
)}
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
   
   

    {showForm && (
<div>
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
          <label htmlFor="department">Department.:</label>
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
            <th>Department.</th>
            <th>Year of Award</th>
            <th>Funds (Amount) Provided</th>
            <th>Duration</th>
            <th>File </th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
            <div>{getFileNameFromPath(data.filePath)}</div>

                    <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                    </button>
                  </td>
            {/* <td>{tableData321.filePath}</td> */}

            {!hideActions && (

            <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
)}
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

      {showForm && (
<div>

      <button className="toggleFormbtn" onClick={handleToggleForm322}>
        {toggleForm322 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm322 && (
        <form onSubmit={handleSubmit322}>
          <div>
            <label htmlFor="projectName">Name of the Project:</label>
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
          )}


    </div>


    {tableData322 && (

    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Project</th>
            <th>Principal Investigator / Co-principal Investigator</th>
            <th>Year of Award</th>
            <th>Funds Provided</th>
            <th>Duration of the Project</th>
            <th>Funding Agency</th>
            <th>Total Amount Funds Received</th>
            <th>File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  'No File Attached'
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}



<div className="formDiv">
      <h4>3.2.3 Research projects funded by government and non-government agencies during the year</h4>
      
      
      
      {showForm && (
<div>
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
          )}


    </div>


    {tableData323 && (

    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Project</th>
            <th>Name of the Principal Investigator & Department</th>
            <th>Name of the Research Project Name</th>
            <th>Amount/Funds Received</th>
            <th>Name of Funding Agency</th>
            <th>Year of Sanction</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}

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
        3.3.1 Whether the department has created an ecosystem for innovations, including Incubation center and other initiatives for the creation and transfer of knowledge
      </h4>

      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm331}>
        {toggleForm331 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm331 && (
        <form onSubmit={handleSubmit331}>
          <div>
            <label>Innovation Ecosystem:</label>
            <label>
              <input
                type="radio"
                name="innovationEcosystem"
                value="Yes"
                checked={formData331.innovationEcosystem === 'Yes'}
                onChange={handleInputChange331}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="innovationEcosystem"
                value="No"
                checked={formData331.innovationEcosystem === 'No'}
                onChange={handleInputChange331}
              />
              No
            </label>
          </div>

          <div>
            <label>Ecosystem Laboratory:</label>
            <label>
              <input
                type="radio"
                name="ecosystemLaboratory"
                value="Yes"
                checked={formData331.ecosystemLaboratory === 'Yes'}
                onChange={handleInputChange331}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="ecosystemLaboratory"
                value="No"
                checked={formData331.ecosystemLaboratory === 'No'}
                onChange={handleInputChange331}
              />
              No
            </label>
          </div>

          <div>
            <label>Innovation Center:</label>
            <label>
              <input
                type="radio"
                name="innovationCenter"
                value="Yes"
                checked={formData331.innovationCenter === 'Yes'}
                onChange={handleInputChange331}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="innovationCenter"
                value="No"
                checked={formData331.innovationCenter === 'No'}
                onChange={handleInputChange331}
              />
              No
            </label>
          </div>

          <div>
            <label>Knowledge Incubation Center:</label>
            <label>
              <input
                type="radio"
                name="knowledgeIncubationCenter"
                value="Yes"
                checked={formData331.knowledgeIncubationCenter === 'Yes'}
                onChange={handleInputChange331}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="knowledgeIncubationCenter"
                value="No"
                checked={formData331.knowledgeIncubationCenter === 'No'}
                onChange={handleInputChange331}
              />
              No
            </label>
          </div>

          <div>
            <label>Startup/Entrepreneurship Center:</label>
            <label>
              <input
                type="radio"
                name="startupCenter"
                value="Yes"
                checked={formData331.startupCenter === 'Yes'}
                onChange={handleInputChange331}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="startupCenter"
                value="No"
                checked={formData331.startupCenter === 'No'}
                onChange={handleInputChange331}
              />
              No
            </label>
          </div>

          <div>
            <label>Any other similar (mention if any):</label>
            <div>AI and ML LAB with 2 workstations,
IOT lab
</div>
            <input
              type="text"
              name="otherSimilar"
              value={formData331.otherSimilar}
              onChange={handleInputChange331}
            />
          </div>

          <div>
            <label>Describe available incubation center and evidence of its usage (activity) within a maximum of 500 words):</label>
            <input
              type="text"
              name="description"
              value={formData331.description}
              onChange={handleInputChange331}
            />
          </div>

          <div>
            <label htmlFor="files">File description :</label>
            <div>
              <ul>• Upload any additional information</ul>
              <ul>• 
Provide the link for additional information
</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange331} />
          </div>

          <button
            className="submitFormBtn"
            type="submit"
            disabled={uploading331 || uploaded331}
          >
            {uploading331 ? "Submitting..." : uploaded331 ? "Submitted" : "Submit"}
          </button>

          {error331 && <div className="error">{error331}</div>}
        </form>
      )}

</div>
          )}


    </div>

    {tableData331 && (
      <div>
      <table>
        <thead>
          <tr>
            <th>Innovation Ecosystem</th>
            <th>Ecosystem laboratory</th>
            <th>Innovation Center</th>
            <th>knowledg Incubation Center</th>
            <th>Startup/Entrepreneurship Center:
</th>
            <th>other Similar</th>
            <th>Description</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
          </tr>
        </thead>
        <tbody>
          {tableData331.map((data, index) => (
            <tr key={index}>
              <td>{data.innovationEcosystem}</td>
              <td>{data.ecosystemLaboratory}</td>
              <td>{data.innovationCenter}</td>
              <td>{data.knowledgeIncubationCenter}</td>
              <td>{data.startupCenter}</td>
              <td>{data.otherSimilar}</td>
              <td>{data.description}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
            )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}




<div className="formDiv">
      <h4>
        3.3.2 Workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR), Entrepreneurship, Skill development during the year
      </h4>
      <h5>
3.3.2.1: Total number of workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR),Entrepreneurship, Skill development year wise during  the year 
</h5>

{showForm && (
<div>
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
            <label htmlFor="seminarName">Name of the Seminars/Workshops ect:</label>
            <input
              type="text"
              id="seminarName"
              name="seminarName"
              value={formData332.seminarName}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="startDate">From Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData332.startDate}
              onChange={handleInputChange332}
            />
          </div>

          <div>
            <label htmlFor="endDate">To Date:</label>
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
          )}
    </div>

    {tableData332 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Department</th>
            <th>Name of the Seminars/Workshops etc.</th>
            <th>From</th>
            <th>To</th>
            <th>Number of Participants</th>
            <th>Event Organizer</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
            )}
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
      <h5>
3.3.3.1: Total number of awards / recognitions received for research/innovations won by institution/teachers/research scholars/students year wise during the year
</h5>

{showForm && (
<div>
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
            <label htmlFor="awardingAgency">Name of the Awarding Agency with Contact Details:</label>
            <input
              type="text"
              id="awardingAgency"
              name="awardingAgency"
              value={formData333.awardingAgency}
              onChange={handleInputChange333}
            />
          </div>
{/* 
          <div>
            <label htmlFor="contactDetails">Contact Details:</label>
            <input
              type="text"
              id="contactDetails"
              name="contactDetails"
              value={formData333.contactDetails}
              onChange={handleInputChange333}
            />
          </div> */}

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
          )}
    </div>


    {tableData333 && (
      <div>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Academic Year</th>
            <th>Name of the Awardee</th>
            <th>Name of the Awarding Agency with Contact Details</th>
            <th>Date of Award</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
          </tr>
        </thead>
        <tbody>
          {tableData333.map((data, index) => (
            <tr key={index}>
              <td>{data.serialNumber}</td>
              <td>{data.academicYear}</td>
              <td>{data.awardeeName}</td>
              <td>{data.awardingAgency}</td>
              <td>{data.dateOfAward}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
)}
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
        3.4.1 The department ensures implementation of its stated Code of Ethics for research  as in the following 
      </h4>

      {showForm && (
<div>
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
          )}


    </div>

    {tableData341 && (
    <div>
      <table>
      <thead>
  <tr>
    <th>Inclusion of Research ethics in Research Methodology course work</th>
    <th>Presence of Departmental ethics committees  
(Animal, Chemical, Bio-Ethics, etc.)
</th>
    <th>Ethics of scientific research writing</th>
    <th>check for Plagiarism and Unfair means of research </th>
    <th>Research Advisory Committee</th>
    <th>Other related item (if any)</th>
    <th>Download File</th>
    {!hideActions && (

    <th>Actions</th>
  )}
  </tr>
</thead>
<tbody>
  {tableData341.map((data, index) => (
    <tr key={index}>
      <td>{data.researchMethodology}</td>
      <td>{data.departmentalEthicsCommittees}</td>
      <td>{data.scientificResearchWriting}</td>
      <td>{data.plagiarismCheck}</td>
      <td>{data.researchAdvisoryCommittee}</td>
      <td>{data.otherRelatedItem}</td>
      <td>
      <div>{getFileNameFromPath(data.filePath)}</div>

        {data.filePath ? (
          <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
            Download File
          </button>
        ) : (
          "No File Attached"
        )}
      </td>
      {!hideActions && (

      <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
    </tr>
  ))}
</tbody>
      </table>
    </div>
    )}




<div className="formDiv">
      <h4>
        3.4.2 The institution provides incentives to teachers who receive state, national, and international recognitions/awards
      </h4>
      <div>
              <ul>1.Commendation and monetary incentive at a University function</ul>
              <ul>2.Commendation and medal at a University function</ul>
              <ul>3. Certificate of honor</ul>
              <ul>4.Announcement in the Newsletter / website</ul>

            </div>

            {showForm && (
<div>
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
            <label htmlFor="contactDetails">Contact Details of the Awardee:</label>
            <input
              type="text"
              id="contactDetails"
              name="contactDetails"
              value={formData342.contactDetails}
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
              <ul>• Upload relevant supporting document</ul>
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
          )}
    </div>

    {tableData342 && (
      <div>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Name of the Awardee </th>
            <th>Contact Details of the Awardee</th>
            <th>Name of the Awarding Agency</th>
            <th>Year of Award</th>
            <th>Incentive Details</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
          </tr>
        </thead>
        <tbody>
          {tableData342.map((data, index) => (
            <tr key={index}>
              <td>{data.academicYear}</td>
              <td>{data.awardeeName}</td>
              <td>{data.contactDetails}</td>
              <td>{data.awardingAgency}</td>
              <td>{data.yearOfAward}</td>
              <td>{data.incentiveDetails}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}



<div className="formDiv">
      <h4>3.4.3 Patents published/awarded during the year</h4>

      {showForm && (
<div>
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
          )}


    </div>

    {tableData343 && (
       <div>
       <table>
         <thead>
           <tr>
             <th>Academic Year</th>
             <th>Name of the Patent Published Awarded</th>
             <th>Patent Number</th>
             <th>Published / Awarded / Granted</th>
             <th>Year of Award</th>
             <th>Download File</th>
             {!hideActions && (

             <th>Actions</th>
            )}
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
               <div>{getFileNameFromPath(data.filePath)}</div>

                 {data.filePath ? (
                   <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                     Download File
                   </button>
                 ) : (
                   "No File Attached"
                 )}
               </td>
               {!hideActions && (
               <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
             </tr>
           ))}
         </tbody>
       </table>
     </div>
    )}




<div className="formDiv">
      <h4>3.4.4 Ph.D.s awarded during the year</h4>


      {showForm && (
<div>
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
            <label htmlFor="department">Name of the Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData344.department}
              onChange={handleInputChange344}
            />
          </div>

          <div>
            <label htmlFor="guideName">Name of the Guide:</label>
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
          )}
    </div>

    {tableData344 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name of PhD Scholar</th>
            <th>Name of the Department</th>
            <th>Name of the Guide</th>
            <th>Year of Registration</th>
            <th>Year of award of PhD</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}




<div className="formDiv">
      <h4>3.4.5 Research papers in the Journals notified on UGC website during the year</h4>
      
      {showForm && (
<div>
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
          )}
    </div>

    {tableData345 && (

    <div>
      <table>
        <thead>
          <tr>
            <th>Title of Paper</th>
            <th>Name of Authors</th>
            <th>Department of the teacher</th>
            <th>Name of Journal</th>
            <th>Year of Publication</th>
            <th>ISSN Number</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
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
      {showForm && (
<div>
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
            <label htmlFor="titleOfBookOrChapter">Title of the Book/chapter published:</label>
            <input
              type="text"
              id="titleOfBookOrChapter"
              name="titleOfBookOrChapter"
              value={formData346.titleOfBookOrChapter}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="authorNames">Name of the author (s):</label>
            <input
              type="text"
              id="authorNames"
              name="authorNames"
              value={formData346.authorNames}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="titleOfProceedings">Title of the Proceedings of the Conference:</label>
            <input
              type="text"
              id="titleOfProceedings"
              name="titleOfProceedings"
              value={formData346.titleOfProceedings}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="publisher">Name of the Publisher National / International:</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData346.publisher}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="isbnNumber">ISBN  Number of the Proceeding:</label>
            <input
              type="number"
              id="isbnNumber"
              name="isbnNumber"
              value={formData346.isbnNumber}
              onChange={handleInputChange346}
            />
          </div>

          <div>
            <label htmlFor="yearOfPublication">Year of Publications:</label>
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
          )}
    </div>

    {tableData346 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Teacher</th>
            <th>Title of the Paper</th>
            <th>Title of the Book/chapter published</th>
            <th>Name of the author (s)</th>
            <th>Title of the Proceedings of the Conference</th>
            <th>Name of the Publisher National / International</th>
            <th>ISBN  Number of the Proceeding</th>
            <th>Year of Publications</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        )}



<div className="formDiv">
      <h4>
        3.4.7 E-content developed by teachers
      </h4>

      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm347}>
        {toggleForm347 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm347 && (
        <form onSubmit={handleSubmit347}>
          <div>
            <label htmlFor="teacherName">Name of the Teacher:</label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              value={formData347.teacherName}
              onChange={handleInputChange347}
            />
          </div>

          <div>
            <label htmlFor="moduleName">Name of the Module:</label>
            <input
              type="text"
              id="moduleName"
              name="moduleName"
              value={formData347.moduleName}
              onChange={handleInputChange347}
            />
          </div>

          <div>
            <label htmlFor="platform">Platform on which the module is developed:</label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={formData347.platform}
              onChange={handleInputChange347}
            />
          </div>

          <div>
            <label htmlFor="launchDate">Date of Launching e-content:</label>
            <input
              type="date"
              id="launchDate"
              name="launchDate"
              value={formData347.launchDate}
              onChange={handleInputChange347}
            />
          </div>

          <div>
            <label htmlFor="platformCount">Number of platform on which e-content has been developed by teacher:</label>
            <input
              type="number"
              id="platformCount"
              name="platformCount"
              value={formData347.platformCount}
              onChange={handleInputChange347}
            />
          </div>

          <div>
            <label htmlFor="files">Supporting Document:</label>
            <input type="file" id="files" name="files" onChange={handleFileChange347} />
          </div>

          <button
            className="submitFormBtn"
            type="submit"
            disabled={uploading347 || uploaded347}
          >
            {uploading347 ? "Submitting..." : uploaded347 ? "Submitted" : "Submit"}
          </button>

          {error347 && <div className="error">{error347}</div>}
        </form>
      )}
      </div>
          )}
    </div>

    {tableData347 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Teacher</th>
            <th>Name of the Module</th>
            <th>Platform on which module is developed</th>
            <th>Date of launching e-content</th>
            <th>Number of platform on which e-content has been developed by teacher</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}
          </tr>
        </thead>
        <tbody>
          {tableData347.map((data, index) => (
            <tr key={index}>
              <td>{data.teacherName}</td>
              <td>{data.moduleName}</td>
              <td>{data.platform}</td>
              <td>{data.launchDate}</td>
              <td>{data.platformCount}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        )}


<div className="formDiv">
      <h4>
        Platforms for E-content Development
      </h4>
      <button className="toggleFormbtn" onClick={handleToggleForm}>
        {toggleForm ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>For E-PG-Pathshala:</label>
            <label>
              <input
                type="radio"
                name="ePgPathshala_status"
                value="Yes"
                checked={formData.ePgPathshala.status === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="ePgPathshala_status"
                value="No"
                checked={formData.ePgPathshala.status === 'No'}
                onChange={handleInputChange}
              />
              No
            </label>
            <input
              type="text"
              name="ePgPathshala_details"
              placeholder="Content Details"
              value={formData.ePgPathshala.details}
              onChange={handleInputChange}
            />
          </div>

          {/* Similarly, add other platforms */}
          <div>
            <label>For CEC (Undergraduate):</label>
            <label>
              <input
                type="radio"
                name="cecUndergraduate_status"
                value="Yes"
                checked={formData.cecUndergraduate.status === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="cecUndergraduate_status"
                value="No"
                checked={formData.cecUndergraduate.status === 'No'}
                onChange={handleInputChange}
              />
              No
            </label>
            <input
              type="text"
              name="cecUndergraduate_details"
              placeholder="Content Details"
              value={formData.cecUndergraduate.details}
              onChange={handleInputChange}
            />
          </div>

          {/* Add other platform inputs similarly */}
          <div>
            <label>For SWAYAM:</label>
            <label>
              <input
                type="radio"
                name="swayam_status"
                value="Yes"
                checked={formData.swayam.status === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="swayam_status"
                value="No"
                checked={formData.swayam.status === 'No'}
                onChange={handleInputChange}
              />
              No
            </label>
            <input
              type="text"
              name="swayam_details"
              placeholder="Content Details"
              value={formData.swayam.details}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="files">Supporting Document:</label>
            <input type="file" id="files" name="files" onChange={handleFileChange} />
          </div>

          <button
            className="submitFormBtn"
            type="submit"
            disabled={uploading || uploaded}
          >
            {uploading ? "Submitting..." : uploaded ? "Submitted" : "Submit"}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>




    <div className="formDiv">
      <h4>
      3.4.8 Bibliometric of the publications during the year based on average Citation Index in Scopus/ Web of Science/PubMed      </h4>
     
     
      {showForm && (
<div>
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
              <ul>• Give links or upload document of e-content developed</ul>
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
          )}
    </div>

    {tableData348 && (
      <div>
      <table>
        <thead>
          <tr>
            <th>Title of the Paper</th>
            <th>Name of the Author</th>
            <th>Title of the Journal</th>
            <th>Year of Publication</th>
            <th>Citation Index</th>
            <th>Download File</th>    
            {!hideActions && (
        
            <th>Action</th>
          )}
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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
                      )}

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

      {showForm && (
<div>
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
          )}
    </div>
    {tableData349 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title of the Paper</th>
            <th>Name of the Author</th>
            <th>Title of the Journal</th>
            <th>Year of Publication</th>
            <th>H Index</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

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
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
                      )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}



</div>



<div className="criterionCon35">
<h3 className="subTitle">Key Indicators – 3.5 Consultancy</h3>


<div className="formDiv">
      <h4>
      3.5.1 Institution has a policy on consultancy including revenue sharing between the institution and the individual and encourages its faculty to undertake consultancy      </h4>
      
      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm351}>
        {toggleForm351 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm351 && (
        <form onSubmit={handleSubmit351}>
          <div>
            <label htmlFor="governingMinutes">Minutes of the Governing Council/ Syndicate/Board of Management related to the Consultancy policy:</label>
            <input
              type="file"
              id="governingMinutes"
              name="governingMinutes"
              onChange={handleFileChange351}
            />
          </div>

          <div>
            <label htmlFor="consultancyPolicy">Copy of the Consultancy Policy:</label>
            <input
              type="file"
              id="consultancyPolicy"
              name="consultancyPolicy"
              onChange={handleFileChange351}
            />
          </div>

          <div>
            <label htmlFor="additionalInfo">Additional Information (if any), Upload relevant supporting document:</label>
            <input
              type="file"
              id="additionalInfo"
              name="additionalInfo"
              onChange={handleFileChange351}
            />
          </div>

          <button
            type="submit"
            disabled={uploading351 || uploaded351}
          >
            {uploading351 ? "Submitting..." : uploaded351 ? "Submitted" : "Submit"}
          </button>

          {error351 && <div className="error">{error351}</div>}
        </form>
      )}
      </div>
          )}
    </div>
{tableData351 && (
<div>
      <table>
        <thead>
          <tr>
            <th>Minutes of the Governing Council</th>
            <th>Consultancy Policy</th>
            <th>Supporting document</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData351.map((data, index) => (
            <tr key={index}>
              <td>
              <div>{getFileNameFromPath(data.governingMinutes)}</div>

                {data.governingMinutes ? (
                  <button                 className="Downloadbtn"
                  onClick={() => handleDownloadFile(data.governingMinutes)}>
                    Download Minutes
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              <td>
              <div>{getFileNameFromPath(data.consultancyPolicy)}</div>

                {data.consultancyPolicy ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.consultancyPolicy)}>
                    Download Policy
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              <td>
              <div>{getFileNameFromPath(data.additionalInfo)}</div>

                {data.additionalInfo ? (
                  <button className="Downloadbtn" onClick={() => handleDownloadFile(data.additionalInfo)}>
                    Download Additional Info
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
                      )}

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
     
      {showForm && (
<div>
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
            <label htmlFor="consultingAgency">Consulting/Sponsoring agency with contact details:</label>
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
          )}
    </div>
    {tableData352 && (

    <div>
  <table>
    <thead>
      <tr>
        <th>Name of the Consultants</th>
        <th>Name of Consultancy Projects</th>
        <th>Consulting/Sponsoring agency with contact details</th>
        <th>Revenue generated (amount in rupees)</th>
        <th>Total Revenue Generated</th>
        <th>Details of Corporate training provided</th>
        <th>Title of the Training</th>
        <th>Number of Participants Benefitted</th>
        <th>Download File</th>
        {!hideActions && (

        <th>Actions</th>
      )}

      </tr>
    </thead>
    <tbody>
      {tableData352.map((item, index) => (
        <tr key={index}>
          <td>{item.nameOfConsultants}</td>
          <td>{item.nameOfConsultancyProjects}</td>
          <td>{item.consultingAgency}</td>
          <td>{item.revenueGenerated}</td>
          <td>{item.totalRevenueGenerated}</td>
          <td>{item.corporateTrainingDetails}</td>
          <td>{item.titleOfTraining}</td>
          <td>{item.numberOfParticipants}</td>
          <td>
          <div>{getFileNameFromPath(item.filePath)}</div>

            {item.filePath ? (
              <button className="Downloadbtn"  onClick={() => handleDownloadFile(item.filePath)}>
                Download File
              </button>
            ) : (
              "No File Attached"
            )}
          </td>
          {!hideActions && (

          <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
                      )}

        </tr>
      ))}
    </tbody>
  </table>
</div>

    )}

</div>




<div className="criterionCon36">
<h3 className="subTitle">Key Indicators - 3.6 Extension Activities</h3>

<div className="formDiv">
      <h4>
        3.6.1 Extension activities in the neighborhood community in terms of impact and sensitizing the students to social issues and holistic development during the year
      </h4>

      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm361}>
        {toggleForm361 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm361 && (
        <form onSubmit={handleSubmit361}>
          <div>
            <label htmlFor="titleOfProgram">Title of the Program:</label>
            <input
              type="text"
              id="titleOfProgram"
              name="titleOfProgram"
              value={formData361.titleOfProgram}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="beneficiaryOrganization">Beneficiary Organization:</label>
            <input
              type="text"
              id="beneficiaryOrganization"
              name="beneficiaryOrganization"
              value={formData361.beneficiaryOrganization}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="outreachProgramDescription">Description of the Outreach Program:</label>
            <textarea
              id="outreachProgramDescription"
              name="outreachProgramDescription"
              value={formData361.outreachProgramDescription}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="eventDate">Date of the Event:</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData361.eventDate}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="eventVenue">Venue of the Event:</label>
            <input
              type="text"
              id="eventVenue"
              name="eventVenue"
              value={formData361.eventVenue}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="outcome">Outcome:</label>
            <textarea
              id="outcome"
              name="outcome"
              value={formData361.outcome}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="impactDescription">Describe the Impact (within 500 words):</label>
            <textarea
              id="impactDescription"
              name="impactDescription"
              value={formData361.impactDescription}
              onChange={handleInputChange361}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Provide the link for additional information</ul>
              <ul>• Upload any additional information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange361} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading361 || uploaded361}>
            {uploading361 ? "Submitting..." : uploaded361 ? "Submitted" : "Submit"}
          </button>

          {error361 && <div className="error">{error361}</div>}
        </form>
      )}

</div>
          )}
    </div>

    {tableData361 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title of the Program</th>
            <th>Beneficiary Organization</th>
            <th>Description of the Outreach Program</th>
            <th>Date of the Event</th>
            <th>Venue of the Event</th>
            <th>Outcome</th>
            <th>Impact Description</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData361.map((data, index) => (
            <tr key={index}>
              <td>{data.titleOfProgram}</td>
              <td>{data.beneficiaryOrganization}</td>
              <td>{data.outreachProgramDescription}</td>
              <td>{data.eventDate}</td>
              <td>{data.eventVenue}</td>
              <td>{data.outcome}</td>
              <td>{data.impactDescription}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
                      )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
        )}


<div className="formDiv">
      <h4>
      3.6.2 Awards received by the Institution, its teachers and students from Government /Government recognized bodies in recognition of the extension activities carried out  during the year      </h4>
      
      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm362}>
        {toggleForm362 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm362 && (
        <form onSubmit={handleSubmit362}>
          <div>
            <label htmlFor="teacherName">Name of the teacher received the recognition :</label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              value={formData362.teacherName}
              onChange={handleInputChange362}
            />
          </div>

          <div>
            <label htmlFor="activityName">Name of the Activity:</label>
            <input
              type="text"
              id="activityName"
              name="activityName"
              value={formData362.activityName}
              onChange={handleInputChange362}
            />
          </div>

          <div>
            <label htmlFor="awardName">Name of the Award/Recognition:</label>
            <input
              type="text"
              id="awardName"
              name="awardName"
              value={formData362.awardName}
              onChange={handleInputChange362}
            />
          </div>

          <div>
            <label htmlFor="awardingBody">Name of the Awarding Government/Government recognized bodies:</label>
            <input
              type="text"
              id="awardingBody"
              name="awardingBody"
              value={formData362.awardingBody}
              onChange={handleInputChange362}
            />
          </div>

          <div>
            <label htmlFor="yearOfAward">Year of the Award:</label>
            <input
              type="number"
              id="yearOfAward"
              name="yearOfAward"
              value={formData362.yearOfAward}
              onChange={handleInputChange362}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange362} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading362 || uploaded362}>
            {uploading362 ? "Submitting..." : uploaded362 ? "Submitted" : "Submit"}
          </button>

          {error362 && <div className="error">{error362}</div>}
        </form>
      )}

</div>
          )}
    </div>


    {tableData362 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the teacher received the recognition </th>
            <th>Name of the Activity</th>
            <th>Name of the Award/Recognition</th>
            <th>Name of the Awarding Government/Government recognized bodies</th>
            <th>Year of the Award</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData362.map((data, index) => (
            <tr key={index}>
              <td>{data.teacherName}</td>
              <td>{data.activityName}</td>
              <td>{data.awardName}</td>
              <td>{data.awardingBody}</td>
              <td>{data.yearOfAward}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>
                      )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}



<div className="formDiv">
      <h4>
      3.6.3 Extension and outreach programs conducted  by the institution including those through  NSS/NCC, Government and Government recognized bodies  during the year      </h4>
      
      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm363}>
        {toggleForm363 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm363 && (
        <form onSubmit={handleSubmit363}>
          <div>
            <label htmlFor="activityName">Name of the Activity:</label>
            <input
              type="text"
              id="activityName"
              name="activityName"
              value={formData363.activityName}
              onChange={handleInputChange363}
            />
          </div>

          <div>
            <label htmlFor="organizingUnit">Organizing unit/ agency/ collaborating agency:</label>
            <input
              type="text"
              id="organizingUnit"
              name="organizingUnit"
              value={formData363.organizingUnit}
              onChange={handleInputChange363}
            />
          </div>

          <div>
            <label htmlFor="schemeName">Name of the Scheme:</label>
            <input
              type="text"
              id="schemeName"
              name="schemeName"
              value={formData363.schemeName}
              onChange={handleInputChange363}
            />
          </div>

          <div>
            <label htmlFor="numberOfStudents">Number of students participated in such activities:</label>
            <input
              type="number"
              id="numberOfStudents"
              name="numberOfStudents"
              value={formData363.numberOfStudents}
              onChange={handleInputChange363}
            />
          </div>

          <div>
            <label htmlFor="issuesAddressed">Issues addressed if any:</label>
            <textarea
              id="issuesAddressed"
              name="issuesAddressed"
              value={formData363.issuesAddressed}
              onChange={handleInputChange363}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange363} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading363 || uploaded363}>
            {uploading363 ? "Submitting..." : uploaded363 ? "Submitted" : "Submit"}
          </button>

          {error363 && <div className="error">{error363}</div>}
        </form>
      )}
      </div>
          )}
    </div>

    {tableData363 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Activity</th>
            <th>Organizing Unit/Agency</th>
            <th>Name of the Scheme</th>
            <th>Number of Students Participated</th>
            <th>Issues Addressed</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData363.map((data, index) => (
            <tr key={index}>
              <td>{data.activityName}</td>
              <td>{data.organizingUnit}</td>
              <td>{data.schemeName}</td>
              <td>{data.numberOfStudents}</td>
              <td>{data.issuesAddressed}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>          )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}




<div className="formDiv">
      <h4>
        3.6.4 Students participating in extension activities listed at 3.6.3 above during the year
      </h4>
      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm364}>
        {toggleForm364 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm364 && (
        <form onSubmit={handleSubmit364}>
          <div>
            <label htmlFor="activityName">Name of the Activity:</label>
            <input
              type="text"
              id="activityName"
              name="activityName"
              value={formData364.activityName}
              onChange={handleInputChange364}
            />
          </div>

          <div>
            <label htmlFor="schemeName">Name of the Scheme:</label>
            <input
              type="text"
              id="schemeName"
              name="schemeName"
              value={formData364.schemeName}
              onChange={handleInputChange364}
            />
          </div>

          <div>
            <label htmlFor="yearOfActivity">Year of the Activity:</label>
            <input
              type="number"
              id="yearOfActivity"
              name="yearOfActivity"
              value={formData364.yearOfActivity}
              onChange={handleInputChange364}
            />
          </div>

          <div>
            <label htmlFor="studentNames">Names of the Students Participating in Such Activities:</label>
            <textarea
              id="studentNames"
              name="studentNames"
              value={formData364.studentNames}
              onChange={handleInputChange364}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange364} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading364 || uploaded364}>
            {uploading364 ? "Submitting..." : uploaded364 ? "Submitted" : "Submit"}
          </button>

          {error364 && <div className="error">{error364}</div>}
        </form>
      )}
      </div>
          )}
    </div>

    {tableData364 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Activity</th>
            <th>Name of the Scheme</th>
            <th>Year of the Activity</th>
            <th>Names of the Students Participating in Such activities</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData364.map((data, index) => (
            <tr key={index}>
              <td>{data.activityName}</td>
              <td>{data.schemeName}</td>
              <td>{data.yearOfActivity}</td>
              <td>{data.studentNames}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>          )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}





</div>


<div className="criterionCon37">
<h3 className="subTitle">Key Indicator - 3.7 Collaboration</h3>

<div className="formDiv">
      <h4>
        3.7.1 Collaborative activities with other institutions/research establishment/industry for research and academic development of faculty and students per year
      </h4>
      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm371}>
        {toggleForm371 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm371 && (
        <form onSubmit={handleSubmit371}>
          <div>
            <label htmlFor="collaborativeTitle">Title of the Collaborative Activity:</label>
            <input
              type="text"
              id="collaborativeTitle"
              name="collaborativeTitle"
              value={formData371.collaborativeTitle}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="collaboratingAgency">Name of the Collaborating Agency (with contact details):</label>
            <input
              type="text"
              id="collaboratingAgency"
              name="collaboratingAgency"
              value={formData371.collaboratingAgency}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="financialSupportSource">Source of Financial Support:</label>
            <input
              type="text"
              id="financialSupportSource"
              name="financialSupportSource"
              value={formData371.financialSupportSource}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="collaborationYear">Year of the Collaboration:</label>
            <input
              type="number"
              id="collaborationYear"
              name="collaborationYear"
              value={formData371.collaborationYear}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="collaborationDuration">Duration of the Collaboration:</label>
            <input
              type="number"
              id="collaborationDuration"
              name="collaborationDuration"
              value={formData371.collaborationDuration}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="facultyInvolved">Names of the Faculty Members Involved:</label>
            <input
              type="text"
              id="facultyInvolved"
              name="facultyInvolved"
              value={formData371.facultyInvolved}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="natureOfActivity">Nature of the Activity:</label>
            <input
              type="text"
              id="natureOfActivity"
              name="natureOfActivity"
              value={formData371.natureOfActivity}
              onChange={handleInputChange371}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange371} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading371 || uploaded371}>
            {uploading371 ? "Submitting..." : uploaded371 ? "Submitted" : "Submit"}
          </button>

          {error371 && <div className="error">{error371}</div>}
        </form>
      )}
      </div>
          )}
    </div>

    {tableData371 && (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title of the Collaborative Activity</th>
            <th>Name of the Collaborating Agency</th>
            <th>Source of Financial Support</th>
            <th>Year of the Collaboration</th>
            <th>Duration of the Collaboration</th>
            <th>Names of the Faculty Members Involved</th>
            <th>Nature of the Activity</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData371.map((data, index) => (
            <tr key={index}>
              <td>{data.collaborativeTitle}</td>
              <td>{data.collaboratingAgency}</td>
              <td>{data.financialSupportSource}</td>
              <td>{data.collaborationYear}</td>
              <td>{data.collaborationDuration}</td>
              <td>{data.facultyInvolved}</td>
              <td>{data.natureOfActivity}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>          )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}


<div className="formDiv">
      <h4>
      3.7.2 Functional MoUs with institutions/ industries  in India and abroad for internship, on-the-job training, project work, student / faculty exchange and  collaborative research  during the year      </h4>
      {showForm && (
<div>
      <button className="toggleFormbtn" onClick={handleToggleForm372}>
        {toggleForm372 ? "Hide Form" : "Show Form"}
      </button>

      {toggleForm372 && (
        <form onSubmit={handleSubmit372}>
          <div>
            <label htmlFor="organizationName">Name of the Organization with which MoU is signed:</label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData372.organizationName}
              onChange={handleInputChange372}
            />
          </div>

          <div>
            <label htmlFor="mouYear">Year of signing & Duration of the MoU:</label>
            <input
              type="number"
              id="mouYear"
              name="mouYear"
              value={formData372.mouYear}
              onChange={handleInputChange372}
            />
          </div>

          <div>
            <label htmlFor="mouDuration">Duration of the MoU (in years):</label>
            <input
              type="number"
              id="mouDuration"
              name="mouDuration"
              value={formData372.mouDuration}
              onChange={handleInputChange372}
            />
          </div>

          <div>
            <label htmlFor="facultyCoordinators">Names(s) of the Faculty Coordinators:</label>
            <textarea
              id="facultyCoordinators"
              name="facultyCoordinators"
              value={formData372.facultyCoordinators}
              onChange={handleInputChange372}
            />
          </div>

          <div>
            <label htmlFor="actualActivities">List the Actual Activities Under Each MoU:</label>
            <textarea
              id="actualActivities"
              name="actualActivities"
              value={formData372.actualActivities}
              onChange={handleInputChange372}
            />
          </div>

          <div>
            <label htmlFor="participants">Year-wise Number of students/teachers who participated under MoUs:</label>
            <textarea
              id="participants"
              name="participants"
              value={formData372.participants}
              onChange={handleInputChange372}
            />
          </div>

          <div>
            <label htmlFor="files">Document to Attach:</label>
            <div>
              <ul>• Relevant Supporting Document</ul>
              <ul>• Any Additional Information</ul>
            </div>
            <input type="file" id="files" name="files" onChange={handleFileChange372} />
          </div>

          <button className="submitFormBtn" type="submit" disabled={uploading372 || uploaded372}>
            {uploading372 ? "Submitting..." : uploaded372 ? "Submitted" : "Submit"}
          </button>

          {error372 && <div className="error">{error372}</div>}
        </form>
      )}
</div>
          )}
{tableData372 && (
 <div>
      <table>
        <thead>
          <tr>
            <th>Name of the Organisation with which MoU is signed</th>
            <th>Year of Signing of the MoU</th>
            <th>Duration of the MoU</th>
            <th>Names(s) of the Faculty Coordinators</th>
            <th>Actual Activities under each MoU</th>
            <th>Year-wise Number of students/teachers who participated under MoUs</th>
            <th>Download File</th>
            {!hideActions && (

            <th>Actions</th>
          )}

          </tr>
        </thead>
        <tbody>
          {tableData372.map((data, index) => (
            <tr key={index}>
              <td>{data.organizationName}</td>
              <td>{data.mouYear}</td>
              <td>{data.mouDuration}</td>
              <td>{data.facultyCoordinators}</td>
              <td>{data.actualActivities}</td>
              <td>{data.participants}</td>
              <td>
              <div>{getFileNameFromPath(data.filePath)}</div>

                {data.filePath ? (
                  <button className="Downloadbtn"  onClick={() => handleDownloadFile(data.filePath)}>
                    Download File
                  </button>
                ) : (
                  "No File Attached"
                )}
              </td>
              {!hideActions && (

              <td> 
              <button
                className="Deletebtn"
                onClick={() => handleDelete(data._id)} // Use handleDelete
              >
                Delete
              </button>
            </td>          )}


            </tr>
          ))}
        </tbody>
      </table>
    </div>
)}





    </div>






</div>





</div>
    </div>
  );
};

export default NaacReport;
