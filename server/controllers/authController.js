import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in the database
    await otpModel.create({
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    }); // Expires in 10 minutes

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Registration on Cipher Key",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Please verify to complete registration.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Verify OTP and complete registration
export const verifyOTP = async (req, res) => {
  try {
    const { name, email, otp, password } = req.body;

    if (!name || !email || !otp || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const otpRecord = await otpModel.findOne({ email, otp });

    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await userModel.create({ name, email, password: hashedPassword });

    // Delete OTP record
    await otpModel.deleteOne({ email });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
