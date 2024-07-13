import mongoose from "mongoose";

// Schema to store bookmarked topics
const BookmarkTopicSchema = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

// Schema to store last opened topics
const LastOpenedTopicSchema = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

// Schema to track the completion status of courses, chapters, and topics
const CourseProgressSchema = new mongoose.Schema({
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

// Schema to encapsulate bookmarked and last opened topics, along with course progress
const CourseStateSchema = new mongoose.Schema({
  bookmarkedTopics: [BookmarkTopicSchema],
  lastOpenedTopics: [LastOpenedTopicSchema],
  courseProgress: [CourseProgressSchema],
});

// Schema to define user details including course state
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    otpRequestCount: { type: Number, default: 0 },
    lastOtpRequestAt: { type: Date },
    courseState: {
      type: CourseStateSchema,
      default: {},
    },
  },
  { timestamps: true }
);

// Middleware to update OTP request count and timestamp before saving user
UserSchema.pre("save", function (next) {
  const demoEmail = process.env.NEXT_PUBLIC_DEMO_LOGIN_ID;

  // Check if the user is not the demo account
  if (this.email !== demoEmail && this.isModified("otp")) {
    // Increment OTP request count and update last OTP request timestamp
    this.otpRequestCount++;
    this.lastOtpRequestAt = new Date();
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
