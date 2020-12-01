const CursoInstituicaoController = 
    require('../../controllers/ConnectionInstituicaoCurso/ConnectionInstituicaoCursoController');
const express = require('express');
const CursoInstituicaoRoutes = express.Router();



CursoInstituicaoRoutes
.get('/instituicao/curso/:id_instituicao'
    ,   CursoInstituicaoController.BuscarCursosVinculadoInstituicao)
.get('/instituicao/turmas/conecttion'
    ,   CursoInstituicaoController.buscarTurmas)
.post('/instituicao/turmas/curso/connection/:idTurma/:idInstituicao/:idCurso/:turno'
    ,   CursoInstituicaoController.CadastrarTurmaInstituicaoCurso)
.get('/instituicao/curso/turmas/vinculados/:idInstituicao'
    ,   CursoInstituicaoController.BuscarTurmaDaInstituicaoCurso)
.delete('/instituicao/turmas/curso/connection/:idTurma/:idInstituicao/:idCurso'
    ,   CursoInstituicaoController.ExcluirTurmaDaInstituicaoCurso)
.get('/instituicao/cursos-ativos/turmas/:idInstituicao'
    ,   CursoInstituicaoController.BuscarCursosApenasAtivosInstituicao);





module.exports = CursoInstituicaoRoutes;