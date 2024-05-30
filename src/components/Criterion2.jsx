import React,{useState, useEffect,  useMemo , useRef} from "react";
import NavBar from "./Navbar";
import DynamicTable from './DynamicTable';
import DocumentAttachment from "./DocumentAttachmet";
import Chatbot from "./Chatbot";
import './Chatbot.css'
import './Criterion.css'


import axios from 'axios';

const Criterion2 = () => { 

  const [showForm, setShowForm] = useState(true);
  const [longText, setLongText] = useState("");
  const [data, setData] = useState(null);
  const [Criterion211, setCriterion211] = useState(null);
  const [Criterion222, setCriterion222] = useState(null);
  const [Criterion232, setCriterion232] = useState(null);
  const [Criterion233, setCriterion233] = useState(null);
  const [Criterion241, setCriterion241] = useState(null);
  const [Criterion242, setCriterion242] = useState(null);
  const [Criterion244, setCriterion244] = useState(null);
  const [Criterion251, setCriterion251] = useState(null);
  const [Criterion252, setCriterion252] = useState(null);
  const [Criterion2521, setCriterion2521] = useState(null);
  const [Criterion253, setCriterion253] = useState(null);
  const [Criterion254, setCriterion254] = useState(null);
  const [Criterion262, setCriterion262] = useState(null);
  const [Criterion263, setCriterion263] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {memoizedData262
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.2.2');
        setCriterion222(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData222 = useMemo(() => Criterion222, [Criterion222]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/criterion2.1.1');
        setCriterion211(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

   const memoizedData211 = useMemo(() => Criterion211, [Criterion211]);

   useEffect(() => {
     const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.3.2');
        setCriterion232(()=>response.data);
         console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
     fetchData();
   }, []);

   const memoizedData232 = useMemo(() => Criterion232, [Criterion232]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.3.3');
        setCriterion233(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData233 = useMemo(() => Criterion233, [Criterion233]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.4.1');
        setCriterion241(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData241 = useMemo(() => Criterion241, [Criterion241]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.4.2');
        setCriterion242(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData242 = useMemo(() => Criterion242, [Criterion242]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.4.4');
        setCriterion244(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData244 = useMemo(() => Criterion244, [Criterion244]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.5.1');
        setCriterion251(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData251 = useMemo(() => Criterion251, [Criterion251]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.5.2');
        setCriterion252(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData252 = useMemo(() => Criterion252, [Criterion252]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterionRoute2.5.2');
        setCriterion2521(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData2521 = useMemo(() => Criterion2521, [Criterion2521]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.5.3');
        setCriterion253(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData253 = useMemo(() => Criterion253, [Criterion253]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.6.2');
        setCriterion262(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData262 = useMemo(() => Criterion262, [Criterion262]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.5.4');
        setCriterion254(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData254 = useMemo(() => Criterion254, [Criterion254]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/criterion2.6.3');
        setCriterion263(()=>response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const memoizedData263 = useMemo(() => Criterion263, [Criterion263]);

  const toggleForm = () => {
    setShowForm(true);
  };

  const handleTextareaChange = (e) => {
    setLongText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch("http://127.0.0.1:8000/api/criterion2.3.1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longText }),
      });
      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleSubmit253 = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch("http://127.0.0.1:8000/api/criterion2.5.3Text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longText }),
      });
      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleSubmit261 = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch("http://127.0.0.1:8000/api/criterion2.6.1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longText }),
      });
      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleSubmit262 = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch("http://127.0.0.1:8000/api/criterion2.6.2Text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longText }),
      });
      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleClickPrint = () => {
    if (containerRef.current) {
      const containerContent = containerRef.current.innerHTML;
      const printWindow = window.open(); // Open a new print window
      printWindow.document.write(`
        <html>
        <head>
          <style>
            /* Add styles for table borders */
            .printable {
              align-items: center;
              justify-content: center;
              display: flex;
              flex-direction: column;
              margin: 0 auto;
              width: 100%; /* Set a fixed width */
              padding: 20px;
              border: 1px solid black;
              border-radius: 5px;
          }
            table {
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
            }
            .btn {
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
    <>
    <div className="parent">
      <NavBar />
     
      <Chatbot></Chatbot>
      <div ref={containerRef} className="printable">
      <div style={{ marginBottom: "20px" }}>
          <button className="downloadReport" onClick={handleClickPrint}>
            Print Container
          </button>
        </div>
      <div className="criterion-container">
        <div className="content">
          <h1>Criterion II - Learning and Evaluation(200 Points)</h1>
          <div>
            <h2>Key Indicator - 2.1: Student Enrollment & Profile</h2>
            <h3>2.1.1 Demand Ratio</h3>
            <p>Seats Available per year</p>
            <DynamicTable headers={['Academic Year','Name of the programme','Number of seats Available','Number of Eligible Applications Received','Number of Seats filled']}  submitUrl="http://127.0.0.1:8000/api/criterion2.1.1" userData={memoizedData211}/>
            <DocumentAttachment documents={['List of Applications Received','Admitted List of the students','Any other related additional information']} />

            <h3>2.1.2 Seats filled against seats reserved for various categories(SC, ST, OBC, EWS, Divyanga, etc.) as per applicable reservation policy during the year</h3>
            <DocumentAttachment documents={['List of Applications Received','Admitted List of the students reservation category wise','Any other related additional information']}  />
          </div>
        </div>
      </div>
      <h3>Key Indicator 2.2: Catering to Student Diversity</h3>
      <button className="btn" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <>
        <DocumentAttachment documents={['List of students with category of learning','Organized programs for handling the remedial measures','Any other related additional information']}></DocumentAttachment>

        <h3>2.2.2 Student - Full time Teacher Ratio (Academic year data)</h3>
        <DynamicTable headers={['Academic Year','Total Number admitted Students in all programs','Total Number of Teachers','Full time Ratio']}  submitUrl="http://127.0.0.1:8000/api/criterion2.2.2"  userData={memoizedData222}></DynamicTable>
        <DocumentAttachment documents={['Total number of students enrolled','Total number of full time teachers Formula: Students : Teachers','data in prescribed format, List of Full Time Teachers & List of Final admitted Students','Any additional information']}></DocumentAttachment>
        </>
      )}
      <h3>Key Indicator- 2.3: Teaching Learning Process</h3>
      <button className="btn" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <>
        <h3>2.3.1 Student centric methods, such as experiential learning, participative learning and problem solving methodologies are used for enhancing learning experiences</h3>
        <p>Write description in maximum of 200 words</p>
        <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your text here"
          value={longText}
          onChange={handleTextareaChange}
        />

        <button className="btn" type="submit">Submit</button>
      </form>
        <DocumentAttachment documents={['Upload any additional information','Link for Additional Information']}></DocumentAttachment>

        <h3>2.3.2 Teachers using ICT for effective teaching with Learning Management Systems (LMS), E-learning resources etc. (current year data)</h3>
        <DynamicTable headers={['Number of teachers on roll','Number of teachers using ICT (LMS, eResources)','ICT tools and resources available','Number of ICT enabled classrooms','E-Resources and techniques used']} submitUrl="http://127.0.0.1:8000/api/criterion2.3.2" userData={memoizedData232}></DynamicTable>
        <DocumentAttachment documents={['Upload any additional information','Link for Additional Information']}></DocumentAttachment>

        <h3>2.3.3. Ratio of students to mentor for academic and stress related issues (current year data) </h3>
        <h4>2.3.3.1: Number of mentors </h4>
        <p>Number of students assigned to each Mentor</p>
        <DynamicTable headers={['Academic Year','Number of Mentors','Number of Students per mentor']} submitUrl="http://127.0.0.1:8000/api/criterion2.3.3" userData={memoizedData233}></DynamicTable>
        <DocumentAttachment documents={['List (Names) of Mentors & Operated programs','List of students under each mentor ','Any additional information','Formula: Mentor : Mentee ','• Upload year wise list of number of students, full time teachers and mentor/mentee ratio']}></DocumentAttachment>
        </>
      )}

      <h3>Key Indicator – 2.4: Teacher Profile & Quality</h3>
      <button className="btn" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <>
        <h3>2.4.1 Full time teachers against sanctioned posts during the current academic year</h3>
        <DocumentAttachment documents={['Data Template']}></DocumentAttachment>
        <DynamicTable headers={['Name of the Full time teacher','Highest Qualification','Designation','Date of Joining']} submitUrl="http://127.0.0.1:8000/api/criterion2.4.1" userData={memoizedData241}></DynamicTable>
        <DocumentAttachment documents={['List of  full time teachers and sanctioned posts for during the year','Any additional information']}></DocumentAttachment>

        <h3>2.4.2 Full time teachers with Ph.D./D.M/M.Ch./D.N.B Super speciality/D.Sc./D’Lit. during the year</h3>
        <DynamicTable headers={['Academic Year','Name of the Teacher','Maximum Qualification','Any Addition information']} submitUrl="http://127.0.0.1:8000/api/criterion2.4.2" userData={memoizedData242}></DynamicTable>
        <DocumentAttachment documents={['Relevant Supporting Document']}></DocumentAttachment>

        <h3>2.4.4 Full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year.</h3>
        <DynamicTable headers={['Year of Award','Name of Full time Teacher','Designation','International/National /State','Name of the Award','Sponsoring Agency']} submitUrl="http://127.0.0.1:8000/api/criterion2.4.4" userData={memoizedData244}></DynamicTable>
        <DocumentAttachment documents={['Relevant Supporting Document','Any Additional information']}>  </DocumentAttachment>

        </>
      )}

      <h3>Key Indicator - 2.5 Evaluation Process and Reforms</h3>
      <button  className="btn" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <>
        <h3>2.5.1 Days from the date of last semester-end examination till the declaration of results during the year</h3>
        <DynamicTable headers={['Semester-wise','Last date of the last semester-end examination','Date of declaration of results of semester-end examination','Number of days taken for declaration of the results','Average number of days for declaration of results during the year']} submitUrl="http://127.0.0.1:8000/api/criterion2.5.1" userData={memoizedData251}></DynamicTable>
        <DocumentAttachment documents={['Relevant Supporting Document','Any additional information']}></DocumentAttachment>
        <h3>2.5.2 Student complaints/grievances about evaluation against total number appeared in the examinations during the year</h3>
        <DynamicTable headers={['Academic Year','Total number of students appeared in the examinations','Number of complaints/grievances about evaluation','Any other information']} submitUrl="http://127.0.0.1:8000/api/criterion2.5.2" userData={memoizedData252}></DynamicTable>
        <DynamicTable headers={['Academic Year','Sem. No','Course Code and Name','Name of the Teacher','No of students having grievances on results','No of students resolved the grievances ','Reasons for non-clearing grievances ']}  submitUrl="http://127.0.0.1:8000/api/criterionRoute2.5.2"></DynamicTable>
        <DocumentAttachment documents={['Relevant Supporting Document','Any additional information']}></DocumentAttachment>
        <h3>2.5.3 IT integration and reforms in the examination procedures and processes (continuous internal assessment and end-semester assessment) have brought in considerable improvement in examination management system of the institution</h3>
        <DynamicTable headers={['Academic Year','Sem. No','Course Code & Name','Name of the Teacher','% of online Teaching','Name of the LMS for online Teaching','Methods of ICT for Teaching','Method of LMS for Exam']} submitUrl="http://127.0.0.1:8000/api/criterion2.5.3" userData={memoizedData253}></DynamicTable>
        <p>Write a description in maximum of 200 words</p>
        <form onSubmit={handleSubmit253}>
        <textarea
          placeholder="Enter your text here"
          value={longText}
          onChange={handleTextareaChange}
        />

        <button className="btn" type="submit">Submit</button>
      </form>
        <DocumentAttachment documents={['Relevant Supporting Document','Any additional information','Number of applications, students and revaluation cases']} ></DocumentAttachment>
        <h3>2.5.4 Status of automation of Examination division along with approved Examination Manual Ensure all the following check list</h3>
        <DynamicTable headers={['Names of Exam committee','Course code','Evaluation Marks Galley Sheet (Enclosure)','Attendance sheet of exam (Enclosure)','Question Paper attachment','scrutiny of syllabus coverage with Question Paper','Other related document']} submitUrl="http://127.0.0.1:8000/api/criterion2.5.4" userData={memoizedData254}></DynamicTable>
        </>
      )}
      <h3>Key Indicator - 2.6 Student Performance and Learning Outcomes</h3>
      <button className="btn" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <>
          <h3>2.6.1 The institution has stated learning outcomes (generic and programme specific)/graduate attributes which are integrated into the assessment process and widely publicized through the website and other documents.</h3>
          <p>Write a description in maximum of 200 words</p>
          <form onSubmit={handleSubmit261}>
        <textarea
          placeholder="Enter your text here"
          value={longText}
          onChange={handleTextareaChange}
        />

        <button className="btn" type="submit">Submit</button>
      </form>
          <DocumentAttachment documents={['Upload Relevant Supporting Document','Upload any additional information','Upload COs for all courses (exemplars from Glossary)']}></DocumentAttachment>
          <h3>2.6.2 Attainment of Programme outcomes, Programme specific outcomes and course outcomes are evaluated by the institution during the year</h3>
          <DynamicTable headers={['Names of the Teacher','Course code (PG/Ph.D.)','No. of students registered','No of students attended exam','No. of students pass in exam','% of Failure students','Other related']} submitUrl="http://127.0.0.1:8000/api/criterion2.6.2" userData={memoizedData262}></DynamicTable>
          <p>Describe the method of measuring the level of attainment of POs , PSOs and COs in not more than 200 words.</p>
          <form onSubmit={handleSubmit262}>
        <textarea
          placeholder="Enter your text here"
          value={longText}
          onChange={handleTextareaChange}
        />

        <button className="btn" type="submit">Submit</button>
      </form>
          <DocumentAttachment documents={['Upload relevant supporting document']}></DocumentAttachment>
          <h3>2.6.3 Students passed during the year</h3>
          <p>2.6.3.1: Outgoing students successfully completed the programme </p>
          <p>2.6.3.2: Final year students who appeared for the examination</p>
          <DynamicTable headers={['Academic Year','Programme Code','Name of the Programme','Number of Students Appeared','Number of Students Passed','Pass (%)']} submitUrl="http://127.0.0.1:8000/api/criterion2.6.3" userData={memoizedData263}></DynamicTable>
          <DocumentAttachment documents={['Upload relevant supporting document','Any additional information']}></DocumentAttachment>
        </>
      )}
      <h3>Key Indicator 2.7. Student Satisfaction Survey</h3>
        <button className="btn" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <>
        <h3>2.7.1. Online Student Satisfaction Survey regarding the teaching-learning process. (Online survey to be conducted by IQAC)</h3>
        <p>Data Requirements: (As per Data Template)</p>
        <ul>
          <li>
          Name/ Class/ Gender
          </li>
          <li>Student Id number/ Aadhar number</li>
          <li>Mobile number</li>
          <li>Email id</li>
          <li>Degree Programme </li>
        </ul>
        <p>(Database of all currently enrolled students need to be prepared and shared with NAAC along with the online submission of QIF)</p>
        <DocumentAttachment documents={['Upload any additional information']}></DocumentAttachment>
        <p>Upload database of all currently enrolled students (Data  Template)</p>
        
        </>

      )}
      </div>
      </div>
    </>
  );
};

export default Criterion2;
