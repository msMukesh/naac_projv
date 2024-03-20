import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import { useUserContext } from "./context/userContext";
import Criterion3 from "./components/criterion3";
function App() {
  const { user, loading, error } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {error && <p className="error">{error}</p>}
              {loading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  {user ? <Dashboard /> : <Auth />}
                </>
              )}
            </>
          }
        />
        <Route path="/criterion3" element={<Criterion3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
