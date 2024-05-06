const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (email, time) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: time,
  });

  return token;
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err); // Reject the promise with the error
      } else {
        resolve(decoded); // Resolve the promise with the decoded value
      }
    });
  });
};

exports.getNewToken = async (req, res, next) => {
  try {
    const token = req.body.refreshToken;
    const email = await verifyRefreshToken(token);
    const user = await User.findOne({ email });
    const accessToken = createToken(user.email, '12h');
    const refreshToken = createToken(user.email, '90d');

    res.status(201).json({
      status: 'success',
      accessToken,
      refreshToken,
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

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).send('unauthorized user');
  }
  const token = header.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .send({ message: 'token_not_valid_or_token_expired' });
    }
    req.decoded = decoded;
    next();
  });
};

exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    const accessToken = createToken(user.email, '12h');
    const refreshToken = createToken(user.email, '90d');
    console.log(token);
    res.status(201).json({
      status: 'success',
      accessToken,
      refreshToken,
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

    if (!user || !(await user.verifyPassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'user not found',
      });
    }
    if (user) {
      const accessToken = createToken(user.email, '12h');
      const refreshToken = createToken(user.email, '90d');
      res.status(201).json({
        status: 'success',
        accessToken,
        refreshToken,
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
