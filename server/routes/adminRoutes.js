const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const router = express.Router();


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await Admin.findOne({ username });
        console.log("Username received:", username);
        console.log("Admin found:", admin);

        if (!admin) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
        });
    }
});

module.exports = router;