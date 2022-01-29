const mongoose = require("mongoose");

const TimelineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = Timeline = mongoose.model("timeline", TimelineSchema);
