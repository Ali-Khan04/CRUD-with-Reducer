import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error Connecting to DB", err));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is set up and running" });
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ success: false, message, statusCode });
});
app.listen(3000, () => {
  console.log("Server is Running on http://localhost:3000/");
});
