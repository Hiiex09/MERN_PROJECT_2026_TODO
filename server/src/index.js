import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth_routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Running at port: ${PORT}`);
  });
};

startServer();
