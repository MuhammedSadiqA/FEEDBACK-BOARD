const express = require("express");
const Feedback = require("../models/Feedbacks");

const router = express.Router();

// POST - Submit feedback
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    const feedback = await Feedback.create({
      name,
      message,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to submit feedback",
    });
  }
});

// GET - Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch feedback",
    });
  }
});

// DELETE - Delete feedback
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete feedback",
    });
  }
});

module.exports = router;