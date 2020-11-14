const express = require('express');
const ProfessorRoutes = express.Router();

const ProfessorController = require('../../controllers/ProfessorController/ProfessorController');

ProfessorRoutes.get('/professor', ProfessorController.BuscarProfessores);
ProfessorRoutes.get('/professor/:cpf', ProfessorController.SelecionaProfessor);
ProfessorRoutes.delete('/professor', ProfessorController.ExcluirProfessor)



module.exports = ProfessorRoutes;