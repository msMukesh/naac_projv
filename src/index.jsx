// App.jsx or index.js

// Import necessary modules
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserContextProvider } from "./context/userContext";

// Render the application with UserContextProvider wrapped around it
ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
