const express = require('express');
const instituicaoRoutes = express.Router();

const AuthMiddlewares = require('../../middlewares/AuthMiddlewares')
const InstituicaoController = require('../../controllers/InstituicaoController/InstituicaoController');

instituicaoRoutes.post('/instituicao',AuthMiddlewares,InstituicaoController.createInstituicao);
instituicaoRoutes.delete('/instituicao/:id', AuthMiddlewares, InstituicaoController.deleteInstituicao);
instituicaoRoutes.get('/instituicao', AuthMiddlewares, InstituicaoController.instituicaoAll);
instituicaoRoutes.get('/instituicao/:id' , AuthMiddlewares, InstituicaoController.selecionaInstituicao);
instituicaoRoutes.put('/instituicao/:id',AuthMiddlewares, InstituicaoController.UpdateInstituicao);






module.exports = instituicaoRoutes;