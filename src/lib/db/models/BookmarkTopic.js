import mongoose from "mongoose";

const BookmarkedTopicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
  topicDuration: { type: Number, required: true },
});

const BookmarkedTopic =
  mongoose.models.BookmarkedTopic ||
  mongoose.model("BookmarkedTopic", BookmarkedTopicSchema);

export default BookmarkedTopic;
