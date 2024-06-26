import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import { useUserContext } from './context/userContext';
import LoadingSpinner from './components/LoadingSpinner'; // Import the loading spinner component
import Criterion3 from './components/Criterion3'; // Import Criterion3 component
import Criterion2 from './components/Criterion2';
import Criterion1 from './components/Criterion1';
import NaacReport from './components/NaacReport';
import './App.css'; // Import the CSS file
import backgroundImage from './assets/bgimage.jpg'; // Import the image file

//
function App() {
  const { user, loading, error } = useUserContext();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <>
              {loading && <LoadingSpinner />} {/* Render the loading spinner while loading */}
              {error && <p className="error">{error}</p>}
              {!loading && !error && ( // Render the dashboard only when not loading and no error
                <>
                  {user ? <Dashboard /> : <Auth />} {/* Render dashboard if user is authenticated, otherwise render Auth */}
                </>
              )}
            </>
          }
        />
        <Route path="/NaacReport" element={<NaacReport />} /> {/* Add Criterion1 route */}

        <Route path="/Criterion1" element={<Criterion1 />} /> {/* Add Criterion1 route */}
        <Route path="/Criterion2" element={<Criterion2 />} /> {/* Add Criterion2 route */}
        <Route path="/Criterion3" element={<Criterion3 />} /> {/* Add Criterion3 route */}
      </Routes>
      </HashRouter>
  );
}

export default App;
