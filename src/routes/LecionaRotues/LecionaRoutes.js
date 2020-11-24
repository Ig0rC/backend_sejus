const express = require('express');
const LecionaRoutes = express.Router();

const LecionaController = require('../../controllers/LecionaController/LecionaController')

LecionaRoutes.post('/leciona', LecionaController.ConectarProfessorDisciplina);

module.exports = LecionaRoutes;