import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();

const port = process.env.PORT | 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

const startServer = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.log(err.message, "Failed to start the server!");
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected Successfully!");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

app.listen(port, async () => {
  await startServer();
});
