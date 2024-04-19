// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import UniversityHeader from './UniversityHeader';

function Home() {
  return (
    <>
      <UniversityHeader />
      <button>
  <Link to="/Login" style={{ color: "white", textDecoration: "none" }}>Continue Login</Link>
</button>

    </>
  );
}

export default Home;
