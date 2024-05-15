const express = require('express');
const cors = require('cors');
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartsRoute = require('./routes/cartRoutes');

//ROUTES
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/carts', cartsRoute);

//default route
app.get('/', (req, res) => {
  res.send('hello from the server');
});

module.exports = app;
