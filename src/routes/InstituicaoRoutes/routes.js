const express = require('express');
const instituicaoRoutes = express.Router();

 const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');


const InstituicaoController = require('../../controllers/InstituicaoController/InstituicaoController');


instituicaoRoutes.post('/instituicao',  InstituicaoController.CriarInstituicao);
instituicaoRoutes.delete('/instituicao/:id', InstituicaoController.deleteInstituicao);
instituicaoRoutes.get('/instituicao/:page', AuthMiddlewares, InstituicaoController.BuscarInstituicoes);
instituicaoRoutes.get('/instituicao/perfil/:id' , InstituicaoController.selecionaInstituicao);
instituicaoRoutes.put('/instituicao/:id', InstituicaoController.UpdateInstituicao);
instituicaoRoutes.post('/instituicao/cursos', InstituicaoController.IncluirCursoNaInstituicao);
instituicaoRoutes.get('/instituicao/cursos/buscar/:id_instituicao', InstituicaoController.PerfilInstituicaoCursos);
instituicaoRoutes.delete('/instituicao/cursos/:id_instituicao/:id_curso', InstituicaoController.ExcluirInstituicaoCursos);
instituicaoRoutes.put('/instituicao/cursos/:id_instituicao/:id_curso/:situacao', InstituicaoController.DesativarCursoInstituicao);
instituicaoRoutes.get('/instituicao/cursos/perfil', InstituicaoController.BuscarCursospInstituicao);










module.exports = instituicaoRoutes;