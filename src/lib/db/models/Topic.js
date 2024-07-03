import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, default: true },
  content: { type: String, required: true },
  duration: { type: Number, default: 0 },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
});

const Topic = mongoose.models.topics || mongoose.model("topics", topicSchema);

export default Topic;
