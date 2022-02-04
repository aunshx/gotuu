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
    },
    reminder: {
      type: Boolean,
      default: true
    },
    reminderFifteenMin: {
      type: Boolean,
      default: true
    },
    reminderThirtyMin: {
      type: Boolean,
      default: true
    },
    reminderOneHour: {
      type: Boolean,
      default: true
    },
    reminderTwoHours: {
      type: Boolean,
      default: true
    },
    reminderThreeHours: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = Settings = mongoose.model("settings", SettingsSchema);
