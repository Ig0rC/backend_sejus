const express = require('express');
const AlunosRoutes = express.Router();
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');

const AlunoController = require('../../controllers/AlunoController/AlunoController');


AlunosRoutes.get('/alunos/:page', AlunoController.BuscarAlunos)
AlunosRoutes.get('/alunos/inativados/:page', AlunoController.AlunoInativados)
AlunosRoutes.get('/alunos/selecionar/:cpf', AuthMiddlewares, AlunoController.PerfilAluno)




AlunosRoutes
.get('/alunos/buscar/cursos', AlunoController.buscarCursos)

AlunosRoutes
.get('/alunos/info/cursos/:idCurso/:idInsti', AlunoController.buscarCursosInfo)

AlunosRoutes
.get('/alunos/info/turmas/:idCurso/:idInsti', AlunoController.infoCursoTurma);

AlunosRoutes
.get('/aluno/minha/nota/cursos', AuthMiddlewares, AlunoController.minhaNotasFaculdade)






AlunosRoutes.get('/alunos/info/disciplinas/:idCurso', AlunoController.infoCursoDisciplina)
AlunosRoutes.get('/alunos/minha/faltas/cursos', AuthMiddlewares, AlunoController.minhasFaltas)

// AlunosRoutes.get('/alunos/cadastrar/turma/:idTurma', AuthMiddlewares, AlunoController.InscreverNoCurso);







module.exports = AlunosRoutes;