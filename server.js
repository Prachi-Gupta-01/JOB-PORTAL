import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
//configuring dotenv
dotenv.config(); // agar kisi ar folder mai .env file hai to paranthesis mai path bhi de sakte hain like dotenv.config({path: './config/.env'})

//rest object
const app = express();
app.use(cors());
app.use(morgan("dev"));
//importing database connection
connectDB();

//middleware
app.use(express.json());

//importing routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});
app.use("/api/v1/auth", authRoutes);

//error middleware || next function
app.use(errorMiddleware);
//port extraction
const PORT = process.env.PORT || 4000;
//listen to the port
app.listen(4000, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});
