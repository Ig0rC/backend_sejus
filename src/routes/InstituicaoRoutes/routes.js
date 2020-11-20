const express = require('express');
const instituicaoRoutes = express.Router();

 const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');


const InstituicaoController = require('../../controllers/InstituicaoController/InstituicaoController');


instituicaoRoutes.post('/instituicao',  InstituicaoController.CriarInstituicao);
instituicaoRoutes.delete('/instituicao/:id', InstituicaoController.deleteInstituicao);
instituicaoRoutes.get('/instituicao/:page', AuthMiddlewares, InstituicaoController.BuscarInstituicoes);
instituicaoRoutes.get('/instituicao/:id' , InstituicaoController.selecionaInstituicao);
instituicaoRoutes.put('/instituicao/:id', InstituicaoController.UpdateInstituicao);






module.exports = instituicaoRoutes;