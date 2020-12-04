const express = require('express');
const PessoaRotues = express.Router();
const PessoaController = require('../../ultis/ultis')
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares')


PessoaRotues.put('/usuarios/:cpf/:verify', AuthMiddlewares, PessoaController.Ativar);





module.exports = PessoaRotues;
