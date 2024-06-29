const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String },
  status: { type: Boolean, default: true },
});

const Course =
  mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Course;
