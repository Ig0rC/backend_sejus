const express = require('express');
const routes = express.Router();

const ProfessorCadastro = require('./controllers/ProfessorCadastro');
const CadastroController = require('./controllers/CadastroController')

routes.post('/professor', ProfessorCadastro.create);

routes.post('/cadastro', CadastroController.cadastrar)

module.exports = routes;