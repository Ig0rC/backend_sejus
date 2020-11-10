const express = require('express');
const DisciplinaRoutes = express.Router();

const DisciplinaController = require('../../controllers/DisciplinaController/DisciplinaController');

DisciplinaRoutes.post('/disciplina', DisciplinaController.CadastrarDisciplina);
DisciplinaRoutes.delete('/disciplina/:id', DisciplinaController.DeletarDisciplina);
DisciplinaRoutes.get('/disciplina', DisciplinaController.BuscarDisciplinas);
DisciplinaRoutes.put('/disciplina/:id', DisciplinaController.AtualizarDisciplina);


module.exports = DisciplinaRoutes;