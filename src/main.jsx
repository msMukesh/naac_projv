// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { UserContextProvider } from "./context/userContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <UserContextProvider>
//       <App />
//     </UserContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
import React from "react";
import { createRoot } from "react-dom"; // Import createRoot from "react-dom"
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";

// Use createRoot to render the app
const root = createRoot(document.getElementById("root")); // Use createRoot from "react-dom"

// Wrap the App component with UserContextProvider
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
