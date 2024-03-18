import React, { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";
import GoogleButton from "./googleButton";
import { useUserContext } from "../context/userContext";
import MyHomePage from "./MyHomePage"; // Import MyHomePage component

const Auth = () => {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };
  const { signInWithGoogle } = useUserContext();
  // const handleSignInSuccess = () => {
  //   // Redirect to MyHomePage after successful sign-in
  //   // You can implement the redirection logic here
  //   console.log("Redirecting to MyHomePage...");
  // };
  return (
    <div className="container">
      {!index ? <Signin  /> : <Signup />}
      <GoogleButton onClick={signInWithGoogle}>
        Continue with Google
      </GoogleButton>
      <p onClick={toggleIndex}>
        {!index ? "New user? Click here " : "Already have an account?"}
      </p>
    </div>
  );
};
export default Auth;