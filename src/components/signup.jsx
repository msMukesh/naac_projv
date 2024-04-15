import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const { registerUser } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = async (e) => 
  {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = psdRef.current.value;
    if (email && password && name) 
    {
      try 
      {
        await registerUser(email, password, name);
        // Navigate to the login page
        navigate("/dashboard");
      } 
      catch (error) 
      {
        // Handle error
        console.error("Registration failed:", error.message);
      }
    }
  };

  return (
    <div className="form">
      <h2>New User</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Name" type="text" ref={nameRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
