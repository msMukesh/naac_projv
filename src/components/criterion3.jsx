import React, { useState } from "react";
import NavBar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";

const Criterion3 = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }
  
    setUploading(true);
  
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // Get user name from cookie
      const userName = Cookies.get("userName");
      formData.append("userName", userName);
  
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response.data);
      alert("File uploaded successfully.");
      setUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="criterion3-container">
        <div className="content">
          <h1>Criterion III - Research, Innovations and Extension</h1>
          <h2>Key Indicator - 3.1 Promotion of Research and Facilities</h2>
          <p>
            3.1.1 The institution's research facilities are frequently updated,
            and there is a well-defined policy for the promotion of research,
            which is uploaded on the institutional website and implemented.
          </p>
          <p>Upload relevant supporting document:</p>
          <h2>Name: {Cookies.get("userName")}</h2>

          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={uploading || uploaded}>
            {uploading ? "Uploading..." : uploaded ? "Uploaded" : "Upload"}
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Criterion3;
