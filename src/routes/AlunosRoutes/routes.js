const express = require('express');
const AlunosRoutes = express.Router();

const AlunoController = require('../../controllers/AlunoController/AlunoController');



AlunosRoutes.get('/alunos', AlunoController.BuscarAlunos)




module.exports = AlunosRoutes;