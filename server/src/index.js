import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import { ExpressErrors } from "./utils/responseHandler.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Working on Shophoria Server");
});

app.use("/api/auth", authRouter);

app.use(ExpressErrors)

app.listen(process.env.PORT, () => {
  console.log(`Shophoria Backend Listening on ${process.env.PORT}`);
});
