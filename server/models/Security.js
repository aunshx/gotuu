const mongoose = require("mongoose");

const SecuritySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    securityCode: { 
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = Security = mongoose.model("security", SecuritySchema);
