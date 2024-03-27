// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import { useUserContext } from './context/userContext';
import LoadingSpinner from './components/LoadingSpinner'; // Import the loading spinner component

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
