const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timeline",
    },
    title: {
      type: String,
    },
    body: {
      type: String,
      maxLength: 210
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

module.exports = Notes = mongoose.model("notes", NotesSchema);
