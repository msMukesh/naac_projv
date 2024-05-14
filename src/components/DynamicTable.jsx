import React, { useState } from 'react';

const DynamicTable = ({ headers }) => {
  const [data, setData] = useState([{ id: 0 }]); // Initially, one blank row is added
  const [newRow, setNewRow] = useState({});

  const handleChange = (e, header, rowIndex) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [header]: e.target.value };
    setData(newData);
  };

  const handleSubmit = (rowIndex) => {
    // Handle submitting row data
    console.log('Submitted row data:', data[rowIndex]);
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
