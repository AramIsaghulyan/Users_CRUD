
//Standard requires

const express = require('express');

//Local requires

const usersController = require('./controller/UsersController');


const app = express();

app.use(express.json());
app.use('/user', usersController);

module.exports = app;