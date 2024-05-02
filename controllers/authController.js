const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (email) => {
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '60d' });
};

exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    const token = createToken(user.email);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email }).select('+password');
    if (user) {
      const token = createToken(user.email);
      res.status(201).json({
        status: 'success',
        token,
        data: {
          user,
        },
      });
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'user not found',
      });
    }
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error,
    });
  }
};
