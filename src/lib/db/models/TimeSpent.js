import mongoose from "mongoose";

// Define the schema for tracking time spent by users
const TimeSpentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dailyTimeSpent: {
    type: [Number], // Array of numbers representing time spent in minutes for each day (0 = Sunday, 1 = Monday, etc.)
    default: [0, 0, 0, 0, 0, 0, 0], // Default value of 0 minutes for each day
    validate: {
      validator: function (v) {
        return v.length === 7; // Ensure the array has exactly 7 elements
      },
      message: "dailyTimeSpent array must have exactly 7 elements.",
    },
  },
  totalTimeSpent: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Calculate the total time spent before saving the document
TimeSpentSchema.pre("save", function (next) {
  this.totalTimeSpent = this.dailyTimeSpent.reduce((acc, cur) => acc + cur, 0);
  next();
});

// Create and export the model
const TimeSpent =
  mongoose.models.TimeSpent || mongoose.model("TimeSpent", TimeSpentSchema);

export default TimeSpent;
