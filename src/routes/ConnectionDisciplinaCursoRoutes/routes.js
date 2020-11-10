const express = require('express');
const DisciplinaCursoRoutes = express.Router();

const DisciplinaCursoController = require('../../controllers/ConnectionDisciplinaCurso/DisciplinaCursoController')


DisciplinaCursoRoutes.post('/disciplinacurso/:idD/:idC', DisciplinaCursoController.VincularDiscCur);
DisciplinaCursoRoutes.get('/disciplinacurso', DisciplinaCursoController.BuscarDisciplinaCursos);
DisciplinaCursoRoutes.get('/disciplinacurso/:idD/:idC', DisciplinaCursoController.SelecionarDisciplinaCurso);
DisciplinaCursoRoutes.delete('/disciplinacurso/:idD/:idC', DisciplinaCursoController.deletaCurso);



module.exports = DisciplinaCursoRoutes;