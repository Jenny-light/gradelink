import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

export default router;
