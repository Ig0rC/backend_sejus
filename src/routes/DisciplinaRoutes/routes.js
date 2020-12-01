const express = require('express');
const DisciplinaRoutes = express.Router();
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');

const DisciplinaController = require('../../controllers/DisciplinaController/DisciplinaController');

DisciplinaRoutes.post('/disciplina',AuthMiddlewares, DisciplinaController.CadastrarDisciplina);
DisciplinaRoutes.delete('/disciplina/:id', DisciplinaController.DeletarDisciplina);
DisciplinaRoutes.get('/disciplina/:page', DisciplinaController.BuscarDisciplinas);
DisciplinaRoutes.put('/disciplina/:id', DisciplinaController.AtualizarDisciplina);
DisciplinaRoutes.get('/disciplina', DisciplinaController.BuscarDisciplinaLeciona);
DisciplinaRoutes.get('/disciplinas/cursos', DisciplinaController.BuscarDisciplinaCurso);


module.exports = DisciplinaRoutes;