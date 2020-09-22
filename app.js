const express = require('express');
const dotenv = require('dotenv')
const logger = require('morgan');

dotenv.config({
    path: '/config/config.env'
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
