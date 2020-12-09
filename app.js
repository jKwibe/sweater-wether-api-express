const express = require('express');
const dotenv = require('dotenv')
const logger = require('morgan');

dotenv.config({
    path: '/config/config.env'
})

const backgroundRouter = require('./routes/app/v1/background');

const app = express();

if (process.env.NODE_ENV == 'development'){
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', backgroundRouter);

module.exports = app;
