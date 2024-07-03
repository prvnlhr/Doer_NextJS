import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
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

const Chapter =
  mongoose.models.chapters || mongoose.model("chapters", chapterSchema);

export default Chapter;
