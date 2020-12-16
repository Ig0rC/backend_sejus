const express = require('express');

const AlterarSenhaRoutes = express.Router();
const AlterarSenhaController = require('../../controllers/RecuperarSenhaAluno/RecuperarSenhaController.js');




AlterarSenhaRoutes.get('/alterar/senha/login', AlterarSenhaController.alterarLogin);
AlterarSenhaRoutes.post('/validar/senha/bd', AlterarSenhaController.verificarCPFnoBD);






module.exports = AlterarSenhaRoutes
