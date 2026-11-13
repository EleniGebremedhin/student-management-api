const validateStudent = (req, res, next) => {
  const { name, email, age, course, gpa, status } = req.body;

  // Fields required when creating or fully updating a student
  const requiredFields = ["name", "email", "age", "course", "gpa", "status"];

  if (req.method === "POST" || req.method === "PUT") {
    const missingFields = requiredFields.filter(
      (field) => req.body[field] === undefined,
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }
  }

  // PATCH must contain at least one field
  if (req.method === "PATCH" && Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Please provide at least one field to update",
    });
  }

  // Validate fields that were provided
  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({
      message: "Name must be a non-empty string",
    });
  }

  if (
    email !== undefined &&
    (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return res.status(400).json({
      message: "Please provide a valid email",
    });
  }

  if (age !== undefined && (!Number.isInteger(age) || age <= 0)) {
    return res.status(400).json({
      message: "Age must be a positive integer",
    });
  }

  if (course !== undefined && (typeof course !== "string" || !course.trim())) {
    return res.status(400).json({
      message: "Course must be a non-empty string",
    });
  }

  if (gpa !== undefined && (typeof gpa !== "number" || gpa < 0 || gpa > 4)) {
    return res.status(400).json({
      message: "GPA must be a number between 0 and 4",
    });
  }

  if (status !== undefined && !["Active", "Inactive"].includes(status)) {
    return res.status(400).json({
      message: "Status must be Active or Inactive",
    });
  }

  next();
};

module.exports = validateStudent;
