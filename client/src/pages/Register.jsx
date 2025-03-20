import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import { BASE_URL } from "../constants.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: Enter OTP
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(form.name)) {
      alert(
        "Name must contain only letters and be at least 3 characters long."
      );
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setLoading(false);
      return;
    }

    if (form.password !== form.cpassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log(response);

      alert("OTP sent to your email!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        name: form.name,
        email: form.email,
        otp,
        password: form.password,
      });
      console.log(response);

      alert("Registration successful!");
      setForm({ name: "", email: "", password: "", cpassword: "" });
      navigate("/login");
      setStep(1); // Reset back to registration step
      setOtp("");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar name="register" />
      <div className="register-container">
        <div className="register-box">
          {step === 1 ? (
            <>
              <h1>Register</h1>
              <form className="form-group" onSubmit={handleSubmit}>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Enter Name..."
                  value={form.name}
                  required
                />
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter Email..."
                  value={form.email}
                  required
                />
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter Password..."
                  value={form.password}
                  required
                />
                <input
                  onChange={handleChange}
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password..."
                  value={form.cpassword}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Send OTP"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1>Verify OTP</h1>
              <form className="form-group" onSubmit={handleVerifyOTP}>
                <input
                  onChange={handleOTPChange}
                  type="text"
                  name="otp"
                  placeholder="Enter OTP..."
                  value={otp}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
