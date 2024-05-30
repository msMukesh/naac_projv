import React, { useState, useEffect } from 'react';


const DynamicTable = ({ headers, submitUrl, userData }) => {
  const [data, setData] = useState([{ id: 0 }]);
//  ;
  const [criterionData, setCriterionData] = useState(userData);

  const headerMapping222  = {
    "Academic Year":"academicYear",
    "Total Number admitted Students in all programs":"totalNumberAdmittedStudentsInAllPrograms",
    "Total Number of Teachers":"totalNumberOfTeachers",
    "Full time Ratio":"fullTimeRatio",
    'Academic Year': "academicYear",
    'Name of the programme': "nameOfProgram",
    'Number of seats Available': "numberOfSeatsAvailable",
    'Number of Eligible Applications Received': "numberOfEligibleApplicationsReceived",
    'Number of Seats filled': "numberOfSeatsFilled",
    'Number of teachers on roll': "numberOfTeachersOnRoll",
    'Number of teachers using ICT (LMS, eResources)': "numberOfTeachersUsingICT",
    'ICT tools and resources available': "ictToolsAndResourcesAvailable",
    'Number of ICT enabled classrooms': "numberOfICTEnabledClassrooms",
    'E-Resources and techniques used': "eResourcesAndTechniquesUsed",
    'Academic Year': "academicYear",
    'Number of Mentors': "numberOfMentors",
    'Number of Students per mentor': "numberOfStudentsPerMentor",
    'Name of the Full time teacher': "name",
            'Highest Qualification': "highestQualification",
            'Designation': "designation",
            'Date of Joining': "dateOfJoining",
            'Academic Year': "academicYear",
            'Name of the Teacher': "name",
            'Maximum Qualification': "maximumQualification",
            'Any Additional Information': "additionalInformation",
            'Year of Award': "yearOfAward",
            'Name of Full time Teacher': "nameOfFullTimeTeacher",
            'Designation': "designation",
            'International/National/State': "level",
            'Name of the Award': "nameOfAward",
            'Sponsoring Agency': "sponsoringAgency",
            'Semester-wise': "semesterWise",
            'Last date of the last semester-end examination': "lastDateOfLastSemesterEndExamination",
            'Date of declaration of results of semester-end examination': "dateOfDeclarationOfResultsOfSemesterEndExamination",
            'Number of days taken for declaration of the results': "numberOfDaysTakenForDeclarationOfResults",
            'Average number of days for declaration of results during the year': "averageNumberOfDaysForDeclarationOfResultsDuringTheYear",
            'Academic Year': "academicYear",
            'Total number of students appeared in the examinations': "totalNumberOfStudentsAppearedInExaminations",
            'Number of complaints/grievances about evaluation': "numberOfComplaintsGrievancesAboutEvaluation",
            'Any other information': "anyOtherInformation",
            'Academic Year': "academicYear",
            'Sem. No': "semesterNumber",
            'Course Code & Name': "courseCodeAndName",
            'Name of the Teacher': "teacherName",
            '% of online Teaching': "onlineTeachingPercentage",
            'Name of the LMS for online Teaching': "LMSName",
            'Methods of ICT for Teaching': "ICTMethods",
            'Method of LMS for Exam': "examLMSMethod",
            'Names of Exam committee': "examCommitteeNames",
            'Course code': "courseCode",
            'Evaluation Marks Galley Sheet (Enclosure)': "evaluationMarksGalleySheet",
            'Attendance sheet of exam (Enclosure)': "attendanceSheetOfExam",
            'Question Paper attachment': "questionPaperAttachment",
            'scrutiny of syllabus coverage with Question Paper': "syllabusCoverageWithQuestionPaper",
            'Other related document': "otherRelatedDocument",
            'Names of the Teacher': "teacherNames",
            'Course code (PG/Ph.D.)': "courseCode",
            'No. of students registered': "studentsRegistered",
            'No of students attended exam': "studentsAttendedExam",
            'No. of students pass in exam': "studentsPassedExam",
            '% of Failure students': "failurePercentage",
            'Other related': "otherRelated",
            'Academic Year': "academicYear",
            'Programme Code': "programmeCode",
            'Name of the Programme': "programmeName",
            'Number of Students Appeared': "studentsAppeared",
            'Number of Students Passed': "studentsPassed",
            'Pass (%)': "passPercentage",
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