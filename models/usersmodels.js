const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age:{
    type: Number,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  phone:{
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
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);
