import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String },
  cloudinary_id: { type: String },
  status: { type: Boolean, default: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  chaptersCount: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
});

const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
