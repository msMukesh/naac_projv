import React, { useState, useEffect } from 'react';


const DynamicTable = ({ headers, submitUrl, userData }) => {
  const [data, setData] = useState([{ id: 0 }]);
//  ;
  const [criterionData, setCriterionData] = useState(userData);

  const headerMapping222  = {
    "Academic Year":"academicYear",
    "Total Number admitted Students in all programs":"totalNumberAdmittedStudentsInAllPrograms",
    "Total Number of Teachers":"totalNumberOfTeachers",
    "Full time Ratio":"fullTimeRatio"
  }

  useEffect(() => {
    setCriterionData(userData);
  }, [userData]);

  const handleChange = (e, header, rowIndex) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [header]: e.target.value };
    setData(newData);
  };

  const handleSubmit = async (rowIndex) => {
    console.log('Submitted row data:', data[rowIndex]);
    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data[rowIndex]),
      });
      if (response.ok) {
        console.log('Data submitted successfully');
        alert('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleAddRow = () => {
    setData([...data, { id: data.length }]);
  };

  const handleDeleteRow = () => {
    if (data && data.length > 1) {
      const newData = data.slice(0, -1);
      setData(newData);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{
          criterionData && criterionData.map((row, rowIndex)=>(
            <tr key={row.id}>
            {headers.map((header, index) => (
              
              <td key={index}>
                
                <input
                  type="text"
                  value={criterionData[rowIndex][headerMapping222[header]] || ''}
                  onChange={(e) => handleChange(e, header, rowIndex)}
                  className="myInput"
                />
              </td>
            ))}
            <td>
              <button className="btn" onClick={() => handleSubmit(rowIndex)}>Submit</button>
            </td>
          </tr>
          ))
          }
          { data && data.map((row, rowIndex) => (
            <tr key={row.id}>
              {headers.map((header, index) => (
                <td key={index}>
                  <input
                    type="text"
                    value={data[rowIndex][header] || ''}
                    onChange={(e) => handleChange(e, header, rowIndex)}
                    className="myInput"
                  />
                </td>
              ))}
              <td>
                <button className="btn" onClick={() => handleSubmit(rowIndex)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={handleAddRow}>Add Row</button>
      <button className="btn" onClick={handleDeleteRow} disabled={data && data.length === 1}>
        Delete Row
      </button>
    </div>
  );
};

export default DynamicTable;