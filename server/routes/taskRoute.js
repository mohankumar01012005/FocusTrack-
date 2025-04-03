const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// ✅ Create a Task (Only for Authenticated User)
router.post("/", async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newTask = new Task({ title, description, status, userId });
    await newTask.save();

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
});

// ✅ Get All Tasks for a Specific User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({ userId });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
});

// ✅ Update Task (User Can Only Update Their Own Task)
router.put("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, userId } = req.body;

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
});

// ✅ Delete Task (Only the User Who Created It Can Delete It)
router.delete("/:taskId/:userId", async (req, res) => {
  try {
    const { taskId, userId } = req.params;

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
});

module.exports = router;
