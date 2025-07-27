const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const billRoutes = require("./routes/bill");
const emailRoutes = require("./routes/email");
const companyRoutes=require("./routes/company");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/company",companyRoutes);

// app.use("*", (req, res) => {
//   res.status(404).json({ message: `Route ${req.originalUrl} not found` });
// });

// Root route
app.get("/", (req, res) => {
  res.send("Auto Bill Generator API is running 🚀");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
