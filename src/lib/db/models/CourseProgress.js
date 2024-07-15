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
  completed: { type: Boolean, default: false },
  chapters: [
    {
      chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
      },
      completed: { type: Boolean, default: false },
      topics: [
        {
          topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
          },
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
