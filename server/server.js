const express = require("express");
const cors =require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Connect MongoDB
connectDB();


// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Feedback Board Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});