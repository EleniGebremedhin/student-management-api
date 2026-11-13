const students = require("../data/students");

// Get all students
const getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
};

// Get a student by ID
const getStudentById = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
};

const createStudent = (req, res) => {
  const newStudent = {
    id:
      students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1,
    ...req.body,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
};

const updateStudent = (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  const updatedStudent = {
    id,
    ...req.body,
  };

  students[studentIndex] = updatedStudent;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: updatedStudent,
  });
};

const patchStudent = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  Object.assign(student, req.body);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
};

const deleteStudent = (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent[0],
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent,
};
