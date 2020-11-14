const express = require('express');
const AuthRoutes = express.Router();

const AuthMiddlewares = require('../../middlewares/AuthMiddlewares')
const Authcontroller = require('../../controllers/AuthController/AuthController');


AuthRoutes.post('/login', Authcontroller.authenticate);


module.exports = AuthRoutes;