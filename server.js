const express = require('express');
const port = 5000;
const db = require('./config/Database');
const dotenv = require('dotenv');

// Routes
const userRoutes = require('./app/routes/userRoutes');
const productRoutes = require('./app/routes/productRoutes');

dotenv.config();
const app = express();

try {
  async function connect() {
    await db.authenticate();
    console.log('Database connected...');
  }
  connect();
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
