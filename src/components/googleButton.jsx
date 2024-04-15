import React from "react";
import GoogleIcon from "../assets/g.png";

const GoogleButton = ({ children, ...buttonProps }) => {
  return (
    <button className="sbtn"{...buttonProps}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          style={googleIconStyles}
          src={GoogleIcon}
          alt="google button"
        />
        <p className="btn-text">
          <b>{children}</b>
        </p>
      </div>
    </button>
  );
};

const googleIconStyles = {
  // backgroundColor: "yellow",
  width: "40px", // Set width to make the logo smaller
  height: "40px", // Set height to make the logo smaller
};

export default GoogleButton;
