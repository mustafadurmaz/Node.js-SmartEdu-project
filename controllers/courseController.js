const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await course.create(req.body);

  try {
    res.status(201).json({
      status: "success",
      course,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
