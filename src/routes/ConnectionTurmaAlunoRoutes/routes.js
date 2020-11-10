const express = require('express');
const ConnectionTurmaAlunoRoutes = express.Router();

const ConnectionTurmaAluno = require('../../controllers/ConnectionTurmaAlunoController/ConnectionTurmaAndAlunoController');

ConnectionTurmaAlunoRoutes.post('/turmaAluno', ConnectionTurmaAluno.ConexaoTA);
ConnectionTurmaAlunoRoutes.delete('/turmaAluno/:id', ConnectionTurmaAluno.ExcluindoAlunoTurmas);
ConnectionTurmaAlunoRoutes.put('/turmaaluno/:id/:turma', ConnectionTurmaAluno.UpdateTurma);


module.exports = ConnectionTurmaAlunoRoutes;