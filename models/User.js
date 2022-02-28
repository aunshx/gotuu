const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  securityQuestionOne: {
    type: String,
    required: true
  },
  securityQuestionOneAnswer: {
    type: String,
    required: true
  },
  securityQuestionTwo: {
    type: String,
    required: true
  },
  securityQuestionTwoAnswer: {
    type: String,
    required: true
  },
  securityQuestionThree: {
    type: String,
    required: true
  },
  securityQuestionThreeAnswer: {
    type: String,
    required: true
  }
},
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = User = mongoose.model("user", UserSchema);
