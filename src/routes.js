const express = require('express');
const routes = express.Router();

const CadastroController = require('./controllers/CadastroController');
const InstituicaoController = require('./controllers/InstituicaoController');
const TelefoneController = require('./controllers/TelefoneControllers');
const HorarioController = require('./controllers/HorarioController');
const ConnectionTurmaAluno = require('./controllers/ConnectionTurmaAndAlunoController')

//cursos e turmas
const ConnectionTurmaCurso = require('./controllers/ConnectionTurmaCurso');
const CursoController = require('./controllers/CursoController');
const TurmaController = require('./controllers/TurmaController')

//Professor
const ProfessorController = require('./controllers/ProfessorCadastro');


routes.post('/cadastro',   CadastroController.cadastrar);

//instituicao
routes.post('/instituicao', InstituicaoController.createInstituicao);
routes.delete('/instituicao/:id', InstituicaoController.deleteInstituicao);
routes.get('/instituicao', InstituicaoController.instituicaoAll);
routes.get('/instituicao/:id', InstituicaoController.selecionaInstituicao);
routes.put('/instituicao/:id', InstituicaoController.UpdateInstituicao);


//curso
routes.post('/cursos', CursoController.cadastrarCurso);
routes.get('/cursos', CursoController.buscarCursos);
routes.get('/cursos/:id', CursoController.selecionaCurso);
routes.delete('/cursos/:id', CursoController.deletaCurso);    
routes.put('/cursos/:id', CursoController.AtualizarCurso);  

//carga horaria;
routes.post('/cargahoraria', HorarioController.criarHorario);
routes.get('/searchHorario', HorarioController.searchHorario);

//turma
routes.post('/turma', TurmaController.criarTurma);
routes.get('/turma', TurmaController.buscarTurmas);
routes.get('/turma/:id', TurmaController.selecionaTurma);
routes.put('/turma/:id', TurmaController.AtualizarTurmas);
routes.delete('/turma/:id', TurmaController.deleteTurma);
routes.get('/turma/alunos/:id', TurmaController.listaAlunosTurmas);

// conexão entre turmas e alunos
routes.post('/turmaAluno', ConnectionTurmaAluno.ConexaoTA);
routes.delete('/turmaAluno/:id', ConnectionTurmaAluno.ExcluindoAlunoTurmas);
routes.put('/turmaaluno/:id/:turma', ConnectionTurmaAluno.UpdateTurma);


//conexão entre turma e curso
routes.post('/turmacurso/:turma/:curso', ConnectionTurmaCurso.CadastrarTurmaCurso);
routes.delete('/turmacurso/:turma/:curso', ConnectionTurmaCurso.DeletaTurmaCurso);
routes.put('/turmacurso/:turma/:curso', ConnectionTurmaCurso.AtualizarTurmaCurso);
routes.get('/turmacurso', ConnectionTurmaCurso.BuscarTurmasCursos);
routes.get('/turmacurso/:idc/:idt', ConnectionTurmaCurso.selecionaTurmaCursos);
//disciplina


module.exports = routes;