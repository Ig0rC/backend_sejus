const express = require('express');
const ConnectionTurmaCursoRoutes = express.Router();

const ConnectionTurmaCurso = require('../../controllers/ConnectionTurmaCursoController/ConnectionTurmaCurso');

ConnectionTurmaCursoRoutes.post('/turmacurso/:turma/:curso/:turno', ConnectionTurmaCurso.CadastrarTurmaCurso);
ConnectionTurmaCursoRoutes.delete('/turmacurso/:turma/:curso', ConnectionTurmaCurso.DeletaTurmaCurso);
ConnectionTurmaCursoRoutes.put('/turmacurso/:turma/:curso', ConnectionTurmaCurso.AtualizarTurmaCurso);
ConnectionTurmaCursoRoutes.get('/turmacurso', ConnectionTurmaCurso.BuscarTurmasCursos);
ConnectionTurmaCursoRoutes.get('/turmacurso/:idc/:idt', ConnectionTurmaCurso.selecionaTurmaCursos);
ConnectionTurmaCursoRoutes.get('/turma/curso/:idc', ConnectionTurmaCurso.BuscarTurmasDoCurso);

module.exports = ConnectionTurmaCursoRoutes;