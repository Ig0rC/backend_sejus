const express = require('express');
const AdministradorRoutes = express.Router();
const AdministradorController = require('../../controllers/AdministradorController/AdministradorController');
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares')




AdministradorRoutes.get('/administrador', AdministradorController.BuscarAdministradorInativos);
AdministradorRoutes.get('/administrador/:cpf', AdministradorController.SelecionaAdministrador);
AdministradorRoutes.get('/administrador/ativos/buscar', AdministradorController.BuscarAdministradorAtivos);
AdministradorRoutes.put('/administrador/:cpf', AdministradorController.UpdateAdministrador);
AdministradorRoutes
    .delete('/administrador/:cpfEnv/:idRg/:idLogin/:idTelefone/:idEndereco', AdministradorController.ExcluirAdministrador);






module.exports = AdministradorRoutes






