const express = require('express');
const TurmaRoutes = express.Router();
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');

const TurmaController = require('../../controllers/TurmaController/TurmaController');

TurmaRoutes.post('/turma', AuthMiddlewares, TurmaController.criarTurma);
TurmaRoutes.get('/turma',  TurmaController.buscarTurmasNoPaginacao)
TurmaRoutes.get('/turma/:page',  AuthMiddlewares, TurmaController.buscarTurmas);
TurmaRoutes.get('/turma/seleciona/:id', TurmaController.selecionaTurma);
TurmaRoutes.put('/turma/:id', TurmaController.AtualizarTurmas);
TurmaRoutes.delete('/turma/:id', TurmaController.deleteTurma);
TurmaRoutes.get('/turma/alunos/:id', TurmaController.listaAlunosTurmas);



module.exports = TurmaRoutes;
