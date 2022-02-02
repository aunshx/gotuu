const mongoose = require("mongoose");

const LiveCountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    count: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = LiveCount = mongoose.model("liveCount", LiveCountSchema);
