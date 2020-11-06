const express = require('express');
const routes = express.Router();

const ProfessorCadastro = require('./controllers/ProfessorCadastro');
const CadastroController = require('./controllers/CadastroController');
const InstituicaoController = require('./controllers/InstituicaoController');
const TelefoneController = require('./controllers/TelefoneControllers')

routes.post('/professor', ProfessorCadastro.create);

routes.post('/cadastro',   CadastroController.cadastrar);

routes.post('/instituicao-criar', InstituicaoController.createInstituicao);



module.exports = routes;