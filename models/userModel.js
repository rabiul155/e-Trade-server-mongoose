const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: [true, 'Email already in use'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    division: String,
    district: String,
    password: {
      type: String,
      select: false,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.verifyPassword = async function (userPassword, dbPassword) {
  return await bcrypt.compare(userPassword, dbPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
