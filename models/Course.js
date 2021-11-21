const mongoose = require("mongoose");

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    trim: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
