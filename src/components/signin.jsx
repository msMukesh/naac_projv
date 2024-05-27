// Signin.js

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Signin = () => {
  const emailRef = useRef();
  const psdRef = useRef();
  const navigate = useNavigate();
  // const { signInUser } = useUserContext();
  const { signInUser, forgotPassword } = useUserContext();

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
        navigate("/Signin");

      }
    }
  };

  
  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email) {
      forgotPassword(email)
        .then(() => {
          emailRef.current.value = "";
          alert("Check your email to reset password");

        })
        .catch((error) => {
          console.error("Error sending reset password email:", error.message);
        });
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button className="sbtn" type="submit">Sign In</button>
        <p onClick={forgotPasswordHandler}>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Signin;
