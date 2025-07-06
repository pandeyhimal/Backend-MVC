const mongoose = require("mongoose");
const getNextSequence = require("../utils/autoIncrement");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      sparse: true,
    }, // sparse allows empty value during first save
    customId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
