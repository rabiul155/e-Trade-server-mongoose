const mongoose = require('mongoose');
const { productSchema } = require('./productModel');

const cartSchema = new mongoose.model(
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

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
