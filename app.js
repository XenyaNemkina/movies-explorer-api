const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const router = require('./routes/index');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const corsAllowed = {
  origin: [
    'http://192.168.1.103:3001',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://movies.ksenyanemkina.nomoredomains.rocks',
    'https://movies.ksenyanemkina.nomoredomains.rocks',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsAllowed));
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.use(errorLogger);
app.use(validationErrors());
app.use(errors);

app.listen(PORT);