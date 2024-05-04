
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client"
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";

// Use createRoot to render the app
const root = createRoot(document.getElementById("root")); // Use createRoot from "react-dom/client"

// Wrap the App component with UserContextProvider
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

