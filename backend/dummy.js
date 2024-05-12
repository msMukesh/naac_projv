
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