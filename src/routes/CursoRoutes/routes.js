const express = require('express');
const CursoRoutes = express.Router();
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');
const CursoController = require('../../controllers/CursoController/CursoController')


CursoRoutes.post('/cursos', CursoController.cadastrarCurso);
CursoRoutes.get('/cursos/:page', CursoController.buscarCursos);
CursoRoutes.get('/cursos/seleciona/:id', CursoController.selecionaCurso);
CursoRoutes.delete('/cursos/:id', CursoController.deletaCurso);    
CursoRoutes.put('/cursos/:id', CursoController.AtualizarCurso);  
CursoRoutes.get('/cursos/disciplinas/turmas/:idc', CursoController.buscarCursosDisciplina); 




module.exports = CursoRoutes;