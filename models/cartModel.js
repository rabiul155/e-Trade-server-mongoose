const mongoose = require('mongoose');
const { productSchema } = require('./productModel');

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    quantity: Number,
    product: productSchema,
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
