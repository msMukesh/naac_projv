
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Home from "./components/Home";
import MyHomePage from "./components/MyHomePage";
import { useUserContext } from "./context/userContext";

function App() {
  const { user, loading, error } = useUserContext();

  return (
    <>
      <Home/>
    </>
  );
}
/*  {error && <p className="error">{error}</p>}
     {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}  */ 
export default App;
