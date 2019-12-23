require('dotenv/config');
const express = require('express');
const server = express();
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./indexRouter');

server.get('/', function(req, res) {
    res.send('Hello, I am Osi Yusdesra');
});

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', routes);

server.listen(1234, () => {
    console.log('Server is Running on Port 1234');
});

module.exports = server;