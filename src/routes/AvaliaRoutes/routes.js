const express = require('express');
const AvaliaRoutes = express.Router();
const AvaliaController = require('../../controllers/AvaliaController/AvaliaController.js')
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');


AvaliaRoutes.post('/professor/avalia/aluno', AuthMiddlewares, AvaliaController.AvaliaAluno)


module.exports = AvaliaRoutes;

