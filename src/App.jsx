// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import { useUserContext } from './context/userContext';
import LoadingSpinner from './components/LoadingSpinner'; // Import the loading spinner component
import Criterion3 from './components/criterion3'; // Import Criterion3 component
import Criterion1 from './components/criterion1';
import Criterion2 from './components/criterion2';

function App() {
  const { user, loading, error } = useUserContext();

  return (
    <BrowserRouter>
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

                <Route path="/criterion3" element={<Criterion3 />} /> {/* Add Criterion3 route */}
                <Route path="/criterion1" element={<Criterion1 />} /> 
                <Route path="/criterion2" element={<Criterion2 />} /> 

        <Route path="/criterion3" element={<Criterion3 />} /> {/* Add Criterion3 route */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
