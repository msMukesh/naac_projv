import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
// import Dashboard from "./dashboard"; // Corrected the import path

const Signin = ({ onSignInSuccess }) => {
  const emailRef = useRef();
  const psdRef = useRef();
  const { signInUser } = useUserContext(); // Ensuring that signInUser is properly obtained from context

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      try {
        await signInUser(email, password); // Calling signInUser from context
        // Call the callback function passed from the parent component
        onSignInSuccess();
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
