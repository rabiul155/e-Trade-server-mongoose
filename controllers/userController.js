const User = require('../models/userModel');

exports.getUserInfo = async (req, res, next) => {
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
