const User = require('../models/userModel');

exports.getUserInfo = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const user = await User.findOne({ email: email });
    res.status(200).send({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
