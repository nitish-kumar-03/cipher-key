// imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";

// calls
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// variables
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGO_URL = process.env.MONGO_URL;

if (!PORT || !HOST || !MONGO_URL) {
  console.error("❌ env variables are missing");
}

// route
app.get("/", (req, res) => {
  res.send("<h1>👋 hello from server");
});

app.use('/api/auth',authRouter);

// db
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`📦 database : connected`);
    app.listen(PORT, () => {
      console.log(`🚀 server : http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
