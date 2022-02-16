const express = require('express');
const app = express();
const port = 5000;
const db = require('./config/Database');

try {
  async function connect() {
    await db.authenticate();
    console.log('Database connected...');
  }
  connect();
} catch (error) {
  console.log(error);
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
