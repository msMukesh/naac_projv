import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NavBar from "./Navbar";

const Criterion1 = () => {
  // State for Criterion 3.1.1
  const [file311, setFile311] = useState(null);
  const [uploading311, setUploading311] = useState(false);
  const [uploaded311, setUploaded311] = useState(false);
  const [error311, setError311] = useState(null);

  // State for Criterion 3.1.2
  const [formData312, setFormData312] = useState({
    teacherName: "",
    amount: "",
    year: "",
    additionalInfo: "",
    file312: null,
  });

  // State for Criterion 3.1.3
  const [formData313, setFormData313] = useState({
    year: "",
    teacherName: "",
    designation: "",
    fellowshipType: "",
    fellowshipName: "",
    sponsoringAgency: "",
    file313: null,
  });

  const [toggleForm312, setToggleForm312] = useState(false);
  const [uploading312, setUploading312] = useState(false);
  const [uploaded312, setUploaded312] = useState(false);
  const [error312, setError312] = useState(null);

  const handleToggleForm312 = () => {
    setToggleForm312(!toggleForm312);
  };

  const handleFile311Change = (e) => {
    setFile311(e.target.files[0]);
  };

  const handleFile312Change = (e) => {
    setFormData312({
      ...formData312,
      file312: e.target.files[0],
    });
  };

  const handleFile313Change = (e) => {
    setFormData313({
      ...formData313,
      file313: e.target.files[0],
    });
  };

  const handleInputChange312 = (e) => {
    const { name, value } = e.target;
    setFormData312({
      ...formData312,
      [name]: value,
    });
  };

  const handleInputChange313 = (e) => {
    const { name, value } = e.target;
    setFormData313({
      ...formData313,
      [name]: value,
    });
  };

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

      const response = await axios.post(
        "http://localhost:5000/311upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("File uploaded successfully.");
      setUploaded311(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError311("Error uploading file. Please try again.");
    } finally {
      setUploading311(false);
    }
  };

  const handleSubmit312 = async (e) => {
    e.preventDefault();
    setUploading312(true);

    const formDataToSend = new FormData();
    formDataToSend.append("teacherName", formData312.teacherName);
    formDataToSend.append("amount", formData312.amount);
    formDataToSend.append("year", formData312.year);
    formDataToSend.append("additionalInfo", formData312.additionalInfo);
    formDataToSend.append("file", formData312.file312);
 const handleToggleForm312 = () => {
    setToggleForm312(!toggleForm312);
  };
    try {
      const response = await axios.post(
        "http://localhost:5000/312upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Data submitted successfully.");
      setUploaded312(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError312("Error submitting data. Please try again.");
    } finally {
      setUploading312(false);
    }
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
    formDataToSend.append("year", formData313.year);
    formDataToSend.append("teacherName", formData313.teacherName);
    formDataToSend.append("designation", formData313.designation);
    formDataToSend.append("fellowshipType", formData313.fellowshipType);
    formDataToSend.append("fellowshipName", formData313.fellowshipName);
    formDataToSend.append("sponsoringAgency", formData313.sponsoringAgency);
    formDataToSend.append("file", formData313.file313);

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

  return (
    <>
      <NavBar />
      <div className="criterion-container">
        <div className="content">
          <h1>Criterion I - Research, Innovations and Extension</h1>

          {/* Criterion 3.1.1 Form */}
          <div>
            <h2>Criterion 3.1.1 - Upload relevant supporting document:</h2>

            <input type="file" onChange={handleFile311Change} />
            <button onClick={handleUpload311} disabled={uploading311 || uploaded311}>
              {uploading311 ? "Uploading..." : uploaded311 ? "Uploaded" : "Upload"}
            </button>
            {error311 && <div className="error">{error311}</div>}
          </div>

          {/* Criterion 3.1.2 Form */}
          <div>
            <h2>Criterion 3.1.2 - Seed Money Details:</h2>
            <button onClick={handleToggleForm312}>
              {toggleForm312 ? "Hide Form" : "Show Form"}
            </button>
            {toggleForm312 && (
              <form onSubmit={handleSubmit312}>
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
                  <label htmlFor="file">Upload relevant supporting document:</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFile312Change}
                  />
                </div>
                <button type="submit" disabled={uploading312 || uploaded312}>
                  {uploading312 ? "Submitting..." : uploaded312 ? "Submitted" : "Submit"}
                </button>
                {error312 && <div className="error">{error312}</div>}
              </form>
            )}
          </div>

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
        </div>
      </div>
    </>
  );
};

export default Criterion1;
