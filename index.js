const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
dotenv.config({ path: '.config.env' });
const app = require('./app');

const uri = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(uri, {})
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log('DB connection error', err));

app.listen(port, () => {
  console.log('server running on port', port);
});
