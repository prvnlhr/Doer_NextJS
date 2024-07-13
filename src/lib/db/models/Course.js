import mongoose from "mongoose";
import slugify from "slugify"; // Make sure to install slugify

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  logoUrl: { type: String },
  cloudinary_id: { type: String },
  status: { type: Boolean, default: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  chaptersCount: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
});

courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
