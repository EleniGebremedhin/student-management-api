const express = require("express");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Custom request logger middleware
app.use(logger);

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Student Management API",
  });
});

// Student API routes
app.use("/api/students", studentRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Centralized error-handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
