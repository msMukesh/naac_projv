import React, { useState } from 'react';
import './DocumentAttachment.css'; // Import the CSS file

const DocumentAttachment = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const handleUpload = async (index) => {
    if (selectedDocument) {
      console.log('Uploading document:', selectedDocument);
      const formData = new FormData();
      formData.append('file', selectedDocument);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/upload2.1.1/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('Document uploaded successfully');
          alert('Document uploaded successfully');
        } else {
          console.error('Failed to upload document');
        }
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    } else {
      console.log('No document selected');
    }
  };

  return (
    <div>
      <label className="document" htmlFor="document">Documents to Attach</label>
      <div>
        {documents.map((document, index) => (
          <div className="document-row" key={index}>
            <span className="document-label ">{document}</span>
            <input
              type="file"
              id={`document-${index}`}
              onChange={handleFileChange}
              className="document-input btn"
            />
            <button  onClick={() => handleUpload(index)} className="upload-button btn">
              Upload
            </button>
          </div>
        ))}
      </div>
      {selectedDocument && (
        <div>
          <p>Document selected: {selectedDocument.name}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentAttachment;
