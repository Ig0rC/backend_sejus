const express = require('express');
const LecionaRoutes = express.Router();

const LecionaController = require('../../controllers/LecionaController/LecionaController')

LecionaRoutes.post('/leciona', LecionaController.ConectarProfessorDisciplina);
LecionaRoutes.get('/leciona/:idD', LecionaController.BuscarTurmasAcordoCursoDisciplinas)
LecionaRoutes.get('/leciona', LecionaController.BuscarInstituicoes)
LecionaRoutes.get('/leciona/:idInstituicao/:idCurso', LecionaController.BuscarTurmaPertenceInstituicaoCurso)
LecionaRoutes.get('/leciona/disciplina/curso/:idCurso', LecionaController.BuscarDisciplinaQuePertenceCurso)




module.exports = LecionaRoutes;