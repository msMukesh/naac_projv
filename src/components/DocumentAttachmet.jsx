import React, { useState } from 'react';

const DocumentAttachment = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };
  

  const handleUpload = async(index) => {
    if (selectedDocument) {
      console.log('Uploading document:', selectedDocument);
      const formData = new FormData();
      formData.append('document', selectedDocument);
      formData.append('documentName', documents[index]);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('Document uploaded successfully');
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
      <label htmlFor="document">Documents to Attach</label>
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
