const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    email = req.email;
    const users = await User.find({ email: email });
    res.status(200).send({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
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
