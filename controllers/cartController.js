const Cart = require('../models/cartModel');

exports.getCarts = async (req, res, next) => {
  try {
    // const email = req.query.email;
    const carts = await Cart.find();
    res.status(200).json({
      status: 'success',
      results: carts.length,
      data: {
        carts,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
