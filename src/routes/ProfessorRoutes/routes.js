const express = require('express');
const ProfessorRoutes = express.Router();
const ProfessorController = require('../../controllers/ProfessorController/ProfessorController');
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');




ProfessorRoutes.get('/professor/:page', ProfessorController.BuscarProfessores);
ProfessorRoutes.get('/professor/selecionar/:cpf', AuthMiddlewares, ProfessorController.SelecionaProfessor);
ProfessorRoutes.delete('/professor', ProfessorController.ExcluirProfessor);

ProfessorRoutes.get('/professor/leciona/materia',
     AuthMiddlewares,  ProfessorController.BuscarLeciona); 
ProfessorRoutes
    .get('/professor/inativados/:page', 
        ProfessorController.BuscarProfessoresInativados);

////BUSCAR ALUNO PARA LANÇAR NOTAS PAST -> CONTROLLER -> PROFESSOR CONTROLLER
ProfessorRoutes
    .get('/professor/turma/selecionada/notas/:idTurma/:idDisciplina', 
    ProfessorController.SelecionaLecionaNotas);

ProfessorRoutes
    .get(`/professor/alunos/faltas/:idDisciplina/:idTurma`, AuthMiddlewares ,ProfessorController.Faltas);
ProfessorRoutes
    .get('/professor/buscar/leciona/all',AuthMiddlewares,  ProfessorController.SemPaginacaoBuscaProfessor);

ProfessorRoutes
    .put('/professor/lanca-notas', AuthMiddlewares, ProfessorController.lancaFaltas);

    

ProfessorRoutes
    .put('/professor/atualizar/cadastro/:cpf/:idTelefone/:idRg/:idLogin/:idEndereco', 
        AuthMiddlewares, ProfessorController.AtualizarCadastroProfessor);

ProfessorRoutes
    .put('/professor/lanca-notas', AuthMiddlewares, ProfessorController.lancaFaltas);

module.exports = ProfessorRoutes;