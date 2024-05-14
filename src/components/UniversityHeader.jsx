import React from 'react';
import pulogo from "../assets/pulogo.png";

function UniversityHeader() {
  return (
    <>
      <center>
        <img src={pulogo} alt="Pondicherry University Logo" style={{ width: '200px', height: '150px' }} />
        <h4 style={{ marginTop: '16px', color: 'white' }}>Pondicherry University</h4>
        <p style={{ color: 'white' }}>{`(A Central University)`}</p>
        <h4 style={{ marginTop: '16px', color: 'white' }}>INTERNAL QUALITY ASSURANCE CELL</h4>
        <h4 style={{ marginTop: '16px', color: 'white' }}>INTERNAL ACADEMIC & ADMINISTRATIVE AUDITING FORMAT FOR THE ACADEMIC YEAR 2022-23</h4>
        <h4 style={{ marginTop: '16px', color: 'white' }}>SOURCE: NAAC INSTITUTIONAL ACCREDITATION MANUAL FOR SSR OF UNIVERSITY</h4>
      </center>
    </>
  );
}

export default UniversityHeader;
