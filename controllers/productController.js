const { Product } = require('../models/productModel');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
