const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
    },
    ratingsCount: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    shipping: Number,
    quantity: Number,
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product, productSchema };
