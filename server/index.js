const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1);
  });

// Routes
app.use("/auth", require("./routes/auth"));  // Ensure correct filename

// Default Route
app.get("/", (req, res) => {
    res.send("✅ Task Manager API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
