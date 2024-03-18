import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
import Dashboard from "./dashboard";

  const Signin = ({ onSignInSuccess }) => {
  const emailRef = useRef();
  const psdRef = useRef();
  const { signInUser, forgotPassword } = useUserContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      try {
        await signInUser(email, password);
        // Call the callback function passed from the parent component
        <Dashboard/>
        onSignInSuccess();
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    }
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email) {
      forgotPassword(email)
        .then(() => {
          emailRef.current.value = "";
        })
        .catch((error) => {
          console.error("Error sending reset password email:", error.message);
        });
    }
  };

  return (
    <div className="form">
      <h2> Login </h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button type="submit">Sign In</button>
        <p onClick={forgotPasswordHandler}>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Signin;