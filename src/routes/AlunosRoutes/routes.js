const express = require('express');
const AlunosRoutes = express.Router();
const AuthMiddlewares = require('../../middlewares/AuthMiddlewares');

const AlunoController = require('../../controllers/AlunoController/AlunoController.js');


AlunosRoutes
    .get('/alunos/:page', AlunoController.BuscarAlunos)
AlunosRoutes
    .get('/alunos/inativados/:page', AlunoController.AlunoInativados)
AlunosRoutes
    .get('/alunos/selecionar/:cpf', AlunoController.PerfilAluno);

AlunosRoutes
    .get('/buscar/meu/perfi/aluno', AuthMiddlewares ,AlunoController.MeuPerfilAluno);



AlunosRoutes.get('/alunos/minhas/faltas/cursos/do/curso/mhq', AuthMiddlewares, AlunoController.minhasFaltas)

AlunosRoutes
    .get('/alunos/buscar/cursos', AlunoController.buscarCursos)

AlunosRoutes
    .get('/alunos/info/cursos/:idCurso/:idInsti', AlunoController.buscarCursosInfo)

AlunosRoutes
    .get('/alunos/info/turmas/:idCurso/:idInsti', AlunoController.infoCursoTurma);

AlunosRoutes
    .get('/aluno/minha/nota/cursos', AuthMiddlewares, AlunoController.minhaNotasFaculdade)


AlunosRoutes.
    get('/aluno/contato/emergencial/buscar/:cpf', AuthMiddlewares, AlunoController.buscarContatoEmergencial);

AlunosRoutes.
    put('/aluno/perfil/atualizar/dados/:cpf/:id_rg/:idEndereco/:idTelefone/:idLogin', AuthMiddlewares, AlunoController.UpdateAluno);

AlunosRoutes.
    put('/aluno/perfil/desativar/:cpf', AuthMiddlewares, AlunoController.DesativarAluno);

AlunosRoutes.get('/alunos/info/disciplinas/:idCurso', AlunoController.infoCursoDisciplina)

AlunosRoutes
    .put('/alunos/update/contato/emergencial', AuthMiddlewares, AlunoController.updateContatoEmergencial);







module.exports = AlunosRoutes;