import React, { useState } from 'react';

const DynamicTable = ({ headers }) => {
  const [data, setData] = useState([{ id: 0 }]); 
  const [newRow, setNewRow] = useState({});

  const handleChange = (e, header, rowIndex) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [header]: e.target.value };
    setData(newData);
  };

  const handleSubmit = async (rowIndex) => {
    console.log('Submitted row data:', data[rowIndex]);
    try {
   {/*  const response = await axios.post('http://127.0.0.1:8000/api/criterion1.1.2', data[rowIndex]);
    console.log('Submitted row data:', response.data);*/} 
      const response = await fetch("http://127.0.0.1:8000/api/criterion2.1.1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data[rowIndex]), // Send the row data to backend
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleAddRow = () => {
    setData([...data, { id: data.length }]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id}>
              {headers.map((header, index) => (
                <td key={index}>
                  <input
                    type="text"
                    value={data[rowIndex][header] || ''}
                    onChange={(e) => handleChange(e, header, rowIndex)}
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
    </div>
  );
};

export default DynamicTable;
