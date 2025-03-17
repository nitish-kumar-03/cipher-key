import React from "react";
import Navbar from "../components/Navbar.jsx";

const Register = () => {
  return (
    <div>
      <Navbar name="register" />
      <div className="register-container">
        <div className="register-box">
          <h1>Register</h1>
          <div className="form-group">
            <input type="text" placeholder="Enter Name..." />
            <input type="email" placeholder="Enter Email..." />
            <input type="password" placeholder="Enter Password..." />
            <input type="password" placeholder="Confirm Password..." />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
