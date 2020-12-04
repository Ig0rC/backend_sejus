const express = require('express');
const instituicaoRoutes = express.Router();

 const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');


const InstituicaoController = require('../../controllers/InstituicaoController/InstituicaoController');


instituicaoRoutes.post('/instituicao', AuthMiddlewares,  InstituicaoController.CriarInstituicao);
instituicaoRoutes.get('/instituicao/:page', AuthMiddlewares, InstituicaoController.BuscarInstituicoes);
instituicaoRoutes.get('/instituicao/perfil/:id' , InstituicaoController.selecionaInstituicao);


instituicaoRoutes
    .put('/instituicao/:idInstituicao/:idTelefone/:idEndereco', AuthMiddlewares, InstituicaoController.UpdateInstituicao);

instituicaoRoutes
    .delete('/instituicao/excluir/cascade/delete/:idInstituicao/:idTelefone/:idEndereco', 
        AuthMiddlewares, InstituicaoController.DeleteInstituicao    );

instituicaoRoutes.post('/instituicao/cursos', InstituicaoController.IncluirCursoNaInstituicao);
instituicaoRoutes.get('/instituicao/cursos/buscar/:id_instituicao', InstituicaoController.PerfilInstituicaoCursos);


instituicaoRoutes.delete('/instituicao/cursos/excluir/curso/:id_instituicao/:id_curso', InstituicaoController.ExcluirInstituicaoCursos);
instituicaoRoutes.put('/instituicao/cursos/:id_instituicao/:id_curso/:situacao', InstituicaoController.DesativarCursoInstituicao);
instituicaoRoutes.get('/instituicao/cursos/perfil', InstituicaoController.BuscarCursospInstituicao);












module.exports = instituicaoRoutes;