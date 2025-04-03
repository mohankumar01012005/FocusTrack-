const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("📩 Signup Request Received:", req.body); // Debugging

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "❌ User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "✅ User registered successfully",userId: newUser._id });
    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ message: "❌ Server Error", error: error.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("🔑 Login Request Received:", req.body); // Debugging

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "❌ Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "❌ Invalid credentials" });
        }

        res.status(200).json({ message: "✅ Login successful", userId: user._id });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "❌ Server Error", error: error.message });
    }
});

module.exports = router;
