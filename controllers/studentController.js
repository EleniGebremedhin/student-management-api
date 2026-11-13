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

const searchStudents = (req, res) => {
  let results = [...students];

  const { name, email, status, course, gpa } = req.query;

  // Search by name
  if (name) {
    results = results.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  // Search by email
  if (email) {
    results = results.filter((student) =>
      student.email.toLowerCase().includes(email.toLowerCase()),
    );
  }

  // Filter by status
  if (status) {
    results = results.filter(
      (student) => student.status.toLowerCase() === status.toLowerCase(),
    );
  }

  // Filter by course
  if (course) {
    results = results.filter((student) =>
      student.course.toLowerCase().includes(course.toLowerCase()),
    );
  }

  // Filter by exact GPA
  if (gpa !== undefined) {
    const gpaValue = Number(gpa);

    if (Number.isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      return res.status(400).json({
        success: false,
        message: "GPA must be a number between 0 and 4",
      });
    }

    results = results.filter((student) => student.gpa === gpaValue);
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
};

const getStudentStats = (req, res) => {
  const totalStudents = students.length;

  // Calculate average GPA
  const totalGPA = students.reduce((sum, student) => sum + student.gpa, 0);

  const averageGPA =
    totalStudents > 0 ? Number((totalGPA / totalStudents).toFixed(2)) : 0;

  // Count students by course
  const studentsByCourse = students.reduce((counts, student) => {
    counts[student.course] = (counts[student.course] || 0) + 1;
    return counts;
  }, {});

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      averageGPA,
      studentsByCourse,
    },
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent,
  searchStudents,
  getStudentStats,
};
