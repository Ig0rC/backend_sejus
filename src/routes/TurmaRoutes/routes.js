const express = require('express');
const TurmaRoutes = express.Router();

const TurmaController = require('../../controllers/TurmaController/TurmaController');

TurmaRoutes.post('/turma', TurmaController.criarTurma);
TurmaRoutes.get('/turma', TurmaController.buscarTurmas);
TurmaRoutes.get('/turma/:id', TurmaController.selecionaTurma);
TurmaRoutes.put('/turma/:id', TurmaController.AtualizarTurmas);
TurmaRoutes.delete('/turma/:id', TurmaController.deleteTurma);
TurmaRoutes.get('/turma/alunos/:id', TurmaController.listaAlunosTurmas);



module.exports = TurmaRoutes;
