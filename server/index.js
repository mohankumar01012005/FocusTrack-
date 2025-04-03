const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// ✅ Enable CORS (Allow all origins or specify allowed origins)
app.use(cors({
  origin: "*", // Change to frontend URL for security (e.g., "http://localhost:3000")
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // Middleware for JSON parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((error) => {
  console.error("❌ MongoDB Connection Error:", error);
  process.exit(1);
});

// Import Routes
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/taskRoute")); // ✅ Add Task Routes

// Default Route
app.get("/", (req, res) => {
  res.send("✅ Task Manager API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
