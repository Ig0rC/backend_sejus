const express = require('express');
const AdministradorRoutes = express.Router();
const AdministradorController = require('../../controllers/AdministradorController/AdministradorController');
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares')




AdministradorRoutes
    .get('/administrador', AdministradorController.BuscarAdministradorInativos);

AdministradorRoutes
    .get('/administrador/:cpf', AdministradorController.SelecionaAdministrador);

AdministradorRoutes
    .get('/administrador/ativos/buscar', AdministradorController.BuscarAdministradorAtivos);

AdministradorRoutes
    .put('/administrador/:cpf', AdministradorController.UpdateAdministrador);

AdministradorRoutes
    .delete('/administrador/:cpfEnv/:idRg/:idLogin/:idTelefone/:idEndereco', AdministradorController.ExcluirAdministrador);

AdministradorRoutes
    .get('/administrador/buscar/leciona/alunos', AdministradorController.buscarTurmasLeciona)

AdministradorRoutes
    .get('/administrador/lanca/faltas/alunos/:idDisciplina/:idTurma', AdministradorController.LancarFaltasAdministrador)


AdministradorRoutes
    .get('/buscar/professores/lecionados/administradores', AdministradorController.BuscarProfessoresLecionados)


AdministradorRoutes
    .put('/administrador/atualizar/lecionados/:cpfProfessor/:idDisciplina/:idTurma', AdministradorController.UpdateLeciona)


AdministradorRoutes
    .get('/administrador/selecionar/lecionados/:cpfProfessor/:idDisciplina/:idTurma', AdministradorController.SelecionaProfessorLecionados)




module.exports = AdministradorRoutes






