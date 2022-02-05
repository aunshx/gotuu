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
    verificationToken: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = Security = mongoose.model("security", SecuritySchema);
