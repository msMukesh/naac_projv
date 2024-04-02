// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import UniversityHeader from './UniversityHeader';
import HomePageDesc from './HomePageDesc';

function Home() {
  return (
    <>
      <UniversityHeader />
      <HomePageDesc />
      <button>
        <Link to="/Login">Login</Link>
      </button>
    </>
  );
}

export default Home;
