const express = require('express');
const ProfessorRoutes = express.Router();
const ProfessorController = require('../../controllers/ProfessorController/ProfessorController');
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');




ProfessorRoutes.get('/professor', ProfessorController.BuscarProfessores);
ProfessorRoutes.get('/professor/:cpf', ProfessorController.SelecionaProfessor);
ProfessorRoutes.delete('/professor', ProfessorController.ExcluirProfessor);
ProfessorRoutes.get('/professor/leciona/materia', AuthMiddlewares,  ProfessorController.SelectLeciona);



module.exports = ProfessorRoutes;