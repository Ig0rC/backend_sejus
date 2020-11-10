const express = require('express');
const CadastroRoutes = express.Router();


const CadastroController = require('../../controllers/CadastroController/CadastroController');



CadastroRoutes.post('/cadastro',  CadastroController.cadastrar);



module.exports = CadastroRoutes;