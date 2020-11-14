const express = require('express');
const PessoaRotues = express.Router();
const PessoaController = require('../../ultis/ultis')


PessoaRotues.put('/usuarios/:cpf/:verify', PessoaController.Ativar);





module.exports = PessoaRotues;
