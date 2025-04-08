const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      required: true,
      type: String
    },
    lastname: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
