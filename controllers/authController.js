const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });

  return token;
};

exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    const token = createToken(user.email);
    console.log(token);
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
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.verifyPassword(password, user.password);
    if (!user || !(await user.verifyPassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'user not found',
      });
    }
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
