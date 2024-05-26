import React, { useState } from "react";
import NavBar from "./Navbar";
import DynamicTable from "./DynamicTable";
import DocumentAttachment from "./DocumentAttachmet";
import axios from "axios";

const Criterion1 = () => {
  const [rowCount, setRowCount] = useState(1);
  const [tableData, setTableData] = useState([Array(6).fill("")]);
  const [longText, setLongText] = useState("");
  const [description, setDescription] = useState("");

  const handleAddRow = () => {
    setRowCount(rowCount + 1);
    setTableData([...tableData, Array(6).fill("")]);
  };

  const handleInputChange = (rowIndex, columnIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][columnIndex] = value;
    setTableData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch("http://127.0.0.1:8000/api/criterion1.1.1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longText }), // Send the row data to backend
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

  const handleTextareaChange = (e) => {
    setLongText(e.target.value);
  };
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  {
    /*for 1.4.1*/
  }
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {

    setSelectedOption(event.target.value);
  };

  return (
    <>
      <NavBar />
      <h1>I. CURRICULAR ASPECTS (150 Points)</h1>
      <h2>Key Indicator - 1.1: Curriculum Design & Development</h2>
      <p>
        1.1.1 Curricula developed and implemented have relevance to the local/
        national / regional/global developmental needs which is reflected with
        learning objectives including Programme outcomes (POs), Programme
        specific outcomes (PSOs) and course outcomes (Cos) of all the Programme
        offered by the University.
      </p>
      <p>Write description in maximum of 500 words File Description</p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your text here"
          value={longText}
          onChange={handleTextareaChange}
        />

        <button type="submit">Submit</button>
      </form>
      <h3>
        1.1.2 Programmes where syllabus revision was carried out during the
        academic year{" "}
      </h3>
      <DynamicTable headers={['Academic Year','Programme Code','Names of Programs Revised','Copy of the Data Template','Relevant Supporting Documents','Link for Additional Information']} submitUrl="http://127.0.0.1:8000/api/criterion1.1.2"></DynamicTable>
      <DocumentAttachment documents={['Details of program syllabus revisions','Minutes of relevant Academic Council/ BOS Meeting','Any additional relevant information']}></DocumentAttachment>
      <h3>
        1.1.3 Courses having focus on employability/ entrepreneurship/ skill
        development during the academic year
      </h3>
      <DynamicTable headers={['Academic Year','Programme Code','Names of the Course',' Activities with direct bearing on Employability/Entrepreneurship/Skill Development','Name of the Program','Copy of the Data Template']} submitUrl="http://127.0.0.1:8000/api/criterion2.6.3"></DynamicTable>
      <DocumentAttachment documents={['Programme/ Curriculum/ Syllabus of the Course','Minutes of BOS/ Academic Council Meeting with approvals for these courses','MoUs with relevant organizations for these courses','Data template on the courses having the focus onEmployability/Entrepreneurship/ Skill development','Any other related additional information']}></DocumentAttachment>
     
        <h2>Key Indicator – 1.2: Academic Flexibility</h2>
        <button onClick={toggleForm}>
          {showForm ? "Hide Form" : "Show Form"}
        </button>
        {showForm && (
          <div>
            <h3>1.2.1 New Courses introduced during the academic year</h3>
            <DynamicTable headers={['Names of the New Courses Introduced','Name of the Program',' Copy of the Data Template','Relevant Supporting Documents']} submitUrl="http://127.0.0.1:8000/api/criterion2.6.3"></DynamicTable>

            <DocumentAttachment
              documents={[
                "Programme/ Curriculum/ Syllabus of the New Course",
                "Minutes of BOS/ Academic Council Meeting with approvals for these courses",
                "Data template on the courses having the focus on Employability/Entrepreneurship/ Skill Development",
                "Any other related additional information",
              ]}
            />{" "}
          </div>
        )}

        <h3>
          1.2.2 Programmes in which Choice Based Credit System (CBCS)/elective
          course system has been implemented during the year ( Nil )
        </h3>
        <DynamicTable
          headers={[
            "Names of the programs adopting CBCS",
            "Names of the programs adopting ECS",
            "Copy of the Data Template",
            "Relevant Supporting Documents",
          ]}
        ></DynamicTable>
        <DocumentAttachment
          documents={[
            "Programme/ Curriculum/ Syllabus of the Course",
            "Data template on the courses having the focus on CBCS/ECS",
            "Any other related additional information",
          ]}
        />
     
      <h2>Key Indicator – 1.3: Curriculum Enrichment</h2>
      <button onClick={toggleForm}>
        {showForm ? "Hide Form" : "Show Form"}
      </button>
      {showForm && (
        <>
          <h3>
            1.3.1 Departmental cross cutting issues relevant to Gender,
            Environment and Sustainability, Human Values and Professional Ethics
            into the Curriculum
          </h3>
          <p>Write description in maximum of 500 words</p>
          <textarea />
          <h4>File Description(Upload)/ Documents to Attach</h4>
          <DocumentAttachment
            documents={[
              "Any additional information",
              "Upload the list and description of the courses which address the Gender, Environment and Sustainability, Human Values and Professional Ethics into the Curriculum",
            ]}
          />

          <h3>
            1.3.2 Value-added courses imparting transferable and life skills
            offered during the academic year
          </h3>
          <DynamicTable
            headers={[
              "Academic Year",
              "Name(s) of the New Value added course with 30 or more contact hours",
              "Number of times the course is offered in the same year",
            ]}
          ></DynamicTable>
          <DocumentAttachment
            documents={[
              "Programme/ Curriculum/ Syllabus of the Course",
              "Any other related additional information",
            ]}
          ></DocumentAttachment>

          <h3>1.3.3 Students enrolled in the courses under 1.3.2 above</h3>
          <DynamicTable
            headers={[
              "Academic Year",
              "Total number of students admitted",
              "Number of students completed the course",
            ]}
          ></DynamicTable>
          <DocumentAttachment
            documents={[
              "Admitted List of the students",
              "Attendance & Assessment Reports",
              "Class work Time tables",
              "Lesson/Teaching Plan  Schedules",
              "List of Faculty members involved in the course program(both departmental/outsourcing)",
              "Any other related additional information",
            ]}
          ></DocumentAttachment>

          <h3>
            1.3.4 Students undertaking field projects / internships during the
            academic year
          </h3>
          <DynamicTable
            headers={[
              "Academic Year",
              "Name of the programme",
              "Number of students undertaking the field projects",
              "Number of students undertaking the research  projects",
            ]}
          ></DynamicTable>
          <DocumentAttachment
            documents={[
              "Admitted List of the students",
              "Attendance & Assessment Reports",
              "Class work Time tables",
              "Lesson/Teaching Plan  Schedules",
              "List of Faculty members involved in the course program(both departmental/outsourcing)",
              "Any other related additional information",
            ]}
          ></DocumentAttachment>
        </>
      )}

      <h2>Key Indicator – 1.4: Feedback Systems ( Not For The Departments)</h2>
      <button onClick={toggleForm}>
        {showForm ? "Hide Form" : "Show Form"}
      </button>
      {showForm && (
        <>
          <div>
            <h3>
              1.4.1 Structured feedback for design and review of syllabus --
              Semester wise feedback received from:
            </h3>
            <p>1) Students, 2) Teachers, 3) Employers, 4) Alumni</p>
            <form>
              <input
                type="radio"
                id="all"
                name="feedbackOption"
                value="All 4 of the above"
                checked={selectedOption === "All 4 of the above"}
                onChange={handleChange}
              />
              <label htmlFor="all">All 4 of the above</label>
              <br />
              <input
                type="radio"
                id="any3"
                name="feedbackOption"
                value="Any 3 of the above"
                checked={selectedOption === "Any 3 of the above"}
                onChange={handleChange}
              />
              <label htmlFor="any3">Any 3 of the above</label>
              <br />
              <input
                type="radio"
                id="any2"
                name="feedbackOption"
                value="Any 2 of the above"
                checked={selectedOption === "Any 2 of the above"}
                onChange={handleChange}
              />
              <label htmlFor="any2">Any 2 of the above</label>
              <br />
              <input
                type="radio"
                id="any1"
                name="feedbackOption"
                value="Any 1 of the above"
                checked={selectedOption === "Any 1 of the above"}
                onChange={handleChange}
              />
              <label htmlFor="any1">Any 1 of the above</label>
              <br />
              <input
                type="radio"
                id="none"
                name="feedbackOption"
                value="None of the above"
                checked={selectedOption === "None of the above"}
                onChange={handleChange}
              />
              <label htmlFor="none">None of the above</label>
            </form>
            <p>Selected option: {selectedOption}</p>
          </div>
          <DocumentAttachment
            documents={[
              "URL for stakeholder feedback report",
              "Action taken report of the University on feedback report as stated in the minutes of the Governing Council, Syndicate, Board of Management (Upload)",
              "Any additional information (Upload)",
            ]}
          ></DocumentAttachment>

          <div>
            <h3>
              1.4.2 Feedback processes of the institution may be classified as
              follows:(opt any one)
            </h3>
            <form>
              <input
                type="radio"
                id="optionA"
                name="feedbackProcess"
                value="Feedback collected, analysed and action taken and feedback available on website"
                checked={
                  selectedOption ===
                  "Feedback collected, analysed and action taken and feedback available on website"
                }
                onChange={handleChange}
              />
              <label htmlFor="optionA">
                Feedback collected, analysed and action taken and feedback
                available on website
              </label>
              <br />
              <input
                type="radio"
                id="optionB"
                name="feedbackProcess"
                value="Feedback collected, analysed and action has been taken"
                checked={
                  selectedOption ===
                  "Feedback collected, analysed and action has been taken"
                }
                onChange={handleChange}
              />
              <label htmlFor="optionB">
                Feedback collected, analysed and action has been taken
              </label>
              <br />
              <input
                type="radio"
                id="optionC"
                name="feedbackProcess"
                value="Feedback collected and analysed"
                checked={selectedOption === "Feedback collected and analysed"}
                onChange={handleChange}
              />
              <label htmlFor="optionC">Feedback collected and analysed</label>
              <br />
              <input
                type="radio"
                id="optionD"
                name="feedbackProcess"
                value="Feedback collected"
                checked={selectedOption === "Feedback collected"}
                onChange={handleChange}
              />
              <label htmlFor="optionD">Feedback collected</label>
              <br />
              <input
                type="radio"
                id="optionE"
                name="feedbackProcess"
                value="Feedback not collected"
                checked={selectedOption === "Feedback not collected"}
                onChange={handleChange}
              />
              <label htmlFor="optionE">Feedback not collected</label>
            </form>
            <p>Selected option: {selectedOption}</p>
          </div>
          <DocumentAttachment
            documents={[
              "Upload Stakeholder feedback report",
              "Action taken report of the university on it asstated in the minutes of the Governing Council,Syndicate, Board of Management",
              "Upload any additional information",
              "URL for feedback report",
            ]}
          ></DocumentAttachment>
        </>
      )}
    </>
  );
};

export default Criterion1;
