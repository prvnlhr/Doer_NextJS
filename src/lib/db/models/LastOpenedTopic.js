import mongoose from "mongoose";

const LastOpenedTopicSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  topicName: { type: String, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  courseName: { type: String, required: true },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  chapterName: { type: String, required: true },
});

const LastOpenedTopic = mongoose.models.LastOpenedTopic || mongoose.model("LastOpenedTopic", LastOpenedTopicSchema);

export default LastOpenedTopic;
