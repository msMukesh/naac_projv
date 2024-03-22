import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Home from "./components/Home";
import MyHomePage from "./components/MyHomePage";
import { useUserContext } from "./context/userContext";
import Criterion3 from "./components/criterion3";
function App() {
  const { user, loading, error } = useUserContext();

  return (
    <>
      <Home/>
      
    </>
  /*  <BrowserRouter>
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
    </BrowserRouter>*/
  );
}
/*  {error && <p className="error">{error}</p>}
     {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}  */ 
export default App;
