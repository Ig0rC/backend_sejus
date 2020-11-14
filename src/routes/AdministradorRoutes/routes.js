const express = require('express');
const AdministradorRoutes = express.Router();
const AdministradorController = require('../../controllers/AdministradorController/AdministradorController');



AdministradorRoutes.get('/administrador', AdministradorController.BuscarAdministrador);
AdministradorRoutes.get('/administrador/:cpf', AdministradorController.SelecionaAdministrador);
AdministradorRoutes.put('/administrador/:cpf/:verify', AdministradorController.AtivarAdministrador);







module.exports = AdministradorRoutes






