const express = require('express');

const AlterarSenhaRoutes = express.Router();
const AlterarSenhaController = require('../../controllers/RecuperarSenhaAluno/RecuperarSenhaController.js');




AlterarSenhaRoutes.post('/alterar/senha/login', AlterarSenhaController.alterarLogin);
AlterarSenhaRoutes.post('/validar/senha/bd', AlterarSenhaController.verificarCPFnoBD);
AlterarSenhaRoutes.get('/search/email/login/:id', AlterarSenhaController.SearchEmail);






module.exports = AlterarSenhaRoutes

