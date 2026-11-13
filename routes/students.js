const express = require("express");
const router = express.Router();

const validateStudent = require("../middleware/validateStudent");

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent,
  searchStudents,
  getStudentStats,
} = require("../controllers/studentController");

// Get all students or search/filter students
router.get("/", (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    return searchStudents(req, res, next);
  }

  getAllStudents(req, res, next);
});

// Get student statistics
router.get("/stats", getStudentStats);

// Get a single student by ID
router.get("/:id", getStudentById);

// Create a new student
router.post("/", validateStudent, createStudent);

// Fully update a student
router.put("/:id", validateStudent, updateStudent);

// Partially update a student
router.patch("/:id", validateStudent, patchStudent);
// Delete a student
router.delete("/:id", deleteStudent);

module.exports = router;
