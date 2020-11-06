const express = require('express');
const routes = express.Router();

const ProfessorCadastro = require('./controllers/ProfessorCadastro');
const CadastroController = require('./controllers/CadastroController');
const InstituicaoController = require('./controllers/InstituicaoController');
const TelefoneController = require('./controllers/TelefoneControllers')

routes.post('/professor', ProfessorCadastro.create);

routes.post('/cadastro',   CadastroController.cadastrar);


//instituicao
routes.post('/instituicao', InstituicaoController.createInstituicao);
routes.delete('/instituicao/:id', InstituicaoController.deleteInstituicao);
routes.get('/instituicao', InstituicaoController.instituicaoAll);
routes.get('/instituicao/:id', InstituicaoController.selecionaInstituicao);



module.exports = routes;