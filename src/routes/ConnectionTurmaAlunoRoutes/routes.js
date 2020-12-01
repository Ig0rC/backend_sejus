const express = require('express');
const ConnectionTurmaAlunoRoutes = express.Router();
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');

const ConnectionTurmaAluno = require('../../controllers/ConnectionTurmaAlunoController/ConnectionTurmaAndAlunoController');

ConnectionTurmaAlunoRoutes.post('/turmaAluno/:idTurma', AuthMiddlewares, ConnectionTurmaAluno.ConexaoTA);
ConnectionTurmaAlunoRoutes.delete('/turmaAluno/:id', ConnectionTurmaAluno.ExcluindoAlunoTurmas);
ConnectionTurmaAlunoRoutes.put('/turmaaluno/:id/:turma', ConnectionTurmaAluno.UpdateTurma);


module.exports = ConnectionTurmaAlunoRoutes;