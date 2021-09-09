const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
const connectDB = require('./config/db');

// Connect to DataBase
connectDB();

app.use('/static', express.static('public'));

app.use('/api/auth', require('./api/auth'));
app.use('/api/users', require('./api/users'));
app.use('/api/diamonds', require('./api/diamonds'));
app.use('/api/calcLogics', require('./api/calcLogics'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
