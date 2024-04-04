import React, { useState} from 'react'
import NavBar from './Navbar'

function criterion1() {
    const [rowCount, setRowCount] = useState(1);
    const [tableData, setTableData] = useState([Array(6).fill('')]);
  
    const handleAddRow = () => {
      setRowCount(rowCount + 1);
      setTableData([...tableData, Array(6).fill('')]);
    };
  
    const handleInputChange = (rowIndex, columnIndex, value) => {
      const newData = [...tableData];
      newData[rowIndex][columnIndex] = value;
      setTableData(newData);
    };
  
    const handleSubmit = (rowIndex) => {
      // Handle submission logic here for the specific row
      console.log("Submitted row data:", tableData[rowIndex]);
    };
  
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
      setShowForm(!showForm);
    };

  return (
    <>
      <NavBar/>
      <h1>I. CURRICULAR ASPECTS (150 Points)</h1>
      <h2>Key Indicator - 1.1: Curriculum Design & Development</h2>
      <p>1.1.1 Curricula developed and implemented have relevance to the local/ national / regional/global developmental needs which is reflected with learning objectives including Programme outcomes (POs), Programme specific outcomes (PSOs) and course outcomes (Cos) of all the Programme offered by the University.</p>
      <p>Write description in maximum of 500 words File Description</p>
      <textarea placeholder='Enter your text here'/>
      <h3>1.1.2 Programmes where syllabus revision was carried out during the academic year </h3>
      <div>
      <h2>Dynamic Table</h2>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Program Code</th>
            <th>Names of Programs Revised</th>
            <th>Copy of the Data Template</th>
            <th>Relevant Supporting Documents</th>
            <th>Link for Additional Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleSubmit(rowIndex)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>

      <h3>Documents to attach</h3>
            <p>Details of program syllabus revisions</p>
            {/*<input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
              {error311 && <div className="error">{error311}</div>} */}

            <p>Minutes of relevant Academic Council/ BOS Meeting</p>
           {/* <input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
            {error311 && <div className="error">{error311}</div>} */}

             <p>Any additional relevant information</p>
          {/*  <input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
            {error311 && <div className="error">{error311}</div>} */}
    </div>
            <h3>1.1.3 Courses having focus on employability/ entrepreneurship/ skill development during the academic year</h3>
            <div>
      <h2>Dynamic Table</h2>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Course Code</th>
            <th>Names of the Course</th>
            <th>Activities with direct bearing on Employability/Entrepreneurship/Skill Development</th>
            <th>Name of the Program</th>
            <th>Copy of the Data Template</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleSubmit(rowIndex)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>

      <h3>Documents to attach</h3>
            <p>Programme/ Curriculum/ Syllabus of the Course</p>
            {/*<input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
              {error311 && <div className="error">{error311}</div>} */}

            <p>Minutes of BOS/ Academic Council Meeting with approvals for these courses</p>
           {/* <input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
            {error311 && <div className="error">{error311}</div>} */}

             <p>MoUs with relevant organizations for these courses</p>
          {/*  <input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
            {error311 && <div className="error">{error311}</div>} */}
            <p>Data template on the courses having the focus on Employability/Entrepreneurship/ Skill development</p>
            <p>Any other related additional information</p>
    </div>
    <div>
      <h2>Key Indicator – 1.2:  Academic Flexibility</h2>
      <button onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>
      {showForm && (
        <div>
        <h3>1.2.1  New Courses introduced during the academic year</h3>
        <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>Course Code</th>
            <th>Names of the Course</th>
            <th>Activities with direct bearing on Employability/Entrepreneurship/Skill Development</th>
            <th>Name of the Program</th>
            <th>Copy of the Data Template</th>
            <th>Action</th>
          </tr>
        </thead>
        
        </table>
        </div>
      )}
    </div>
    </>
  )
}

export default criterion1