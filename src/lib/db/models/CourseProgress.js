import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  courseName: { type: String, required: true },
  completed: { type: Boolean, default: false },
  totalChapters: { type: Number, required: true },
  chapters: [
    {
      chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
      },
      chapterName: { type: String, required: true },
      completed: { type: Boolean, default: false },
      totalTopics: { type: Number, required: true },
      topics: [
        {
          topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
          },
          topicName: { type: String, required: true },
          completed: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

const CourseProgress =
  mongoose.models.CourseProgress ||
  mongoose.model("CourseProgress", CourseProgressSchema);

export default CourseProgress;
