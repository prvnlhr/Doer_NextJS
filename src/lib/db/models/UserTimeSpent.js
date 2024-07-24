import mongoose from "mongoose";

// Define the schema for tracking time spent by users
const UserTimeSpentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weeklyTimeSpent: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0, 0],
    validate: {
      validator: function (v) {
        return v.length === 7;
      },
      message: "weeklyTimeSpent array must have exactly 7 elements.",
    },
  },
  totalTimeSpent: {
    type: Number,
    required: true,
    default: 0,
  },
  weekStartDate: {
    type: Date,
    required: true,
    default: () => {
      const today = new Date();
      const day = today.getDay();
      const difference = (day + 6) % 7;
      today.setDate(today.getDate() - difference);
      today.setHours(0, 0, 0, 0);
      return today;
    },
  },
});

const UserTimeSpent =
  mongoose.models.UserTimeSpent ||
  mongoose.model("UserTimeSpent", UserTimeSpentSchema);

export default UserTimeSpent;
