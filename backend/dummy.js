     {/* Criterion 3.1.3 Form */}
     <div>
     <h2>Criterion 3.1.3 - Teachers receiving national/international fellowship/financial support:</h2>
     <button onClick={handleToggleForm313}>
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
         <label htmlFor="file">Upload relevant supporting document:</label>
         <input
           type="file"
           id="file"
           name="file"
           onChange={handleFile313Change}
         />
       </div>
       <button type="submit" disabled={uploading313 || uploaded313}>
         {uploading313 ? "Submitting..." : uploaded313 ? "Submitted" : "Submit"}
       </button>
       {error313 && <div className="error">{error313}</div>}
     </form>
     )}
   </div>



const handleSubmit313 = async (e) => {
  e.preventDefault();
  setUploading313(true);

  const formDataToSend = new FormData();
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
    setUploaded313(true);
  } catch (error) {
    console.error("Error submitting data:", error);
    setError313("Error submitting data. Please try again.");
  } finally {
    setUploading313(false);
  }
};