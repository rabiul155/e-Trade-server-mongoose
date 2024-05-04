const mongoose = require('mongoose');
const validator = require('validator');
const { productSchema } = require('./productModel');

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    product: productSchema,
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
