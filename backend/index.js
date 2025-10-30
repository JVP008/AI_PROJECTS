const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database'); // Initialize the database

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./auth'));
app.use('/api/subscriptions', require('./subscriptions'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
