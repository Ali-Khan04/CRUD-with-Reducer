import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error Connecting to DB", err));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is set up and running" });
});
app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ success: false, message, statusCode });
});
app.listen(3000, () => {
  console.log("Server is Running on http://localhost:3000/");
});
