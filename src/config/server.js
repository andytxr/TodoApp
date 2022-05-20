const bodyParser = require('body-parser');
const express = require('express');
const server = express();

const allowCors = require('./cors');

const port = 3000;

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(allowCors);

server.listen(port, function(){

    console.log("Servidor rodando!");

})

module.exports = server