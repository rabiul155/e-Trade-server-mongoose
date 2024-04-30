const express = require('express');
const cors = require('cors');
const app = express();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartsRoute = require('./routes/cartRoutes');

//Middlewares
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/carts', cartsRoute);

//default route
app.get('/', (req, res) => {
  res.send('hello from the server');
});

module.exports = app;
