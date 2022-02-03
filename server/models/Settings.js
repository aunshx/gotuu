const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sound: {
      type: Boolean,
      default: true,
    },
    mode: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = Settings = mongoose.model("settings", SettingsSchema);
