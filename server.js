import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productRoutes from "./routes/productRoute.js";

// Configure env
dotenv.config();

// Database config
connectDB();

// Get the current module's directory path
const currentModulePath = dirname(fileURLToPath(import.meta.url));

// Create the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(join(currentModulePath, "client/build")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Route for serving the HTML file
app.use("*", function (req, res) {
  res.sendFile(join(currentModulePath, "client/build/index.html"));
});

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
