const { Product } = require('../models/productModel');

exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    // res.send('hello form server');
    res.status(200).json({
      status: 'success',
      results: product.length,
      data: {
        product,
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
