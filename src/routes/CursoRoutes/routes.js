const express = require('express');
const CursoRoutes = express.Router();

const CursoController = require('../../controllers/CursoController/CursoController')


CursoRoutes.post('/cursos', CursoController.cadastrarCurso);
CursoRoutes.get('/cursos', CursoController.buscarCursos);
CursoRoutes.get('/cursos/:id', CursoController.selecionaCurso);
CursoRoutes.delete('/cursos/:id', CursoController.deletaCurso);    
CursoRoutes.put('/cursos/:id', CursoController.AtualizarCurso);  


module.exports = CursoRoutes;