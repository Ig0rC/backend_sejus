const express = require('express');
const instituicaoRoutes = express.Router();

const InstituicaoController = require('../../controllers/InstituicaoController/InstituicaoController');

instituicaoRoutes.post('/instituicao', InstituicaoController.createInstituicao);
instituicaoRoutes.delete('/instituicao/:id', InstituicaoController.deleteInstituicao);
instituicaoRoutes.get('/instituicao', InstituicaoController.instituicaoAll);
instituicaoRoutes.get('/instituicao/:id', InstituicaoController.selecionaInstituicao);
instituicaoRoutes.put('/instituicao/:id', InstituicaoController.UpdateInstituicao);





module.exports = instituicaoRoutes;