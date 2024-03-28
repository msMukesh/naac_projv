// Signin.js

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Signin = () => {
  const emailRef = useRef();
  const psdRef = useRef();
  const navigate = useNavigate();
  const { signInUser } = useUserContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      try {
        await signInUser(email, password);
        navigate("/dashboard");
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
