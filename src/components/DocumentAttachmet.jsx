import React, { useState } from 'react';

const DocumentAttachment = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle upload logic for selected document
    if (selectedDocument) {
      console.log('Uploading document:', selectedDocument);
      // You can use FormData to upload the selected document to the server
    } else {
      console.log('No document selected');
    }
  };

  return (
    <div>
      <label htmlFor="document">Select Document:</label>
      <div>
        {documents.map((document, index) => (
          <div key={index}>
            <span>{document}</span>
            <input type="file" id={`document-${index}`} onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
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
