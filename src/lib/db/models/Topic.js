import mongoose from "mongoose";
import slugify from "slugify"; // Make sure to install slugify

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  status: { type: Boolean, default: true },
  content: { type: String, required: true },
  duration: { type: Number, default: 0 },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
});

topicSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
