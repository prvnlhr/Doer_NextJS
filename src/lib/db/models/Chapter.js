import mongoose from "mongoose";
import slugify from "slugify"; // Make sure to install slugify

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  status: { type: Boolean, default: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  duration: { type: Number, default: 0 },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
  topicsCount: { type: Number, default: 0 },
});

chapterSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Chapter =
  mongoose.models.Chapters || mongoose.model("Chapters", chapterSchema);

export default Chapter;
