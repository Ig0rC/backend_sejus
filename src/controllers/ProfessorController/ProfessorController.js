const { from } = require('../../database/index');
const knex = require('../../database/index');
const { SelecionaProfessor } = require('../PessoaController/PessoaController');


module.exports = {
    async BuscarProfessores(req, res, next) {
        try {
            console.log('ok')
            const { page } = req.params;
            console.log('buscar')
            const result = await knex
                .select('pessoa.cpf', 'pessoa.nome', 'pessoa.nome_social', 'telefone.*')
                .from('pessoa')
                .where('pessoa.situacao', true)
                .join('login', 'login.id_login', '=', 'pessoa.login')
                .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                .join('tipo_login', 'tipo_login.id_tipo_login', '=', 'login.id_tipo_login')
                .where('tipo_login.nome_tipo_login', 'PROFESSOR')
                .limit(5)
                .offset((page - 1) * 5)


            const [count] =
                await knex('professor')
                    .from('professor')
                    .join('pessoa', 'pessoa.cpf', '=', 'professor.cpf_professor')
                    .where('pessoa.situacao', true)
                    .count();

            res.header('count', count["count"]);

            return res.json(result)
        } catch (error) {
            next(error);
        }
    },
    async ExcluirProfessor(req, res, next) {
        try {



            res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async SelecionaProfessor(req, res, netxt) {

        try {
            let cpfSearch = '';
            // const authCPF =
            const { cpf } = req.params;
            console.log(typeof cpf)
            if(cpf === '0' ){
                cpfSearch = req.auth;
            }else{
                cpfSearch = cpf
            }
            console.log(cpfSearch)

            const result = await knex
                .select('pessoa.*', 'login.email', 'endereco.*', 'telefone.*', 'rg.*', 'professor.*')
                .from('pessoa')
                .join('login', 'login.id_login', '=', 'pessoa.login')
                .join('professor', 'professor.cpf_professor', '=', 'pessoa.cpf')
                .join('rg', 'rg.id_rg', '=', 'pessoa.id_rg')
                .join('tipo_login', 'tipo_login.id_tipo_login', '=', 'login.id_tipo_login')
                .join('endereco_pessoa', 'endereco_pessoa.cpf', '=', 'pessoa.cpf')
                .join('endereco', 'endereco.id_endereco', '=', 'endereco_pessoa.id_endereco')
                .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                .join('tipo_telefone', 'tipo_telefone.id_tipo_telefone', '=', 'telefone.id_tipo_telefone')
                .where('pessoa.cpf', cpfSearch)

            return res.json(result);
        } catch (error) {
            next(error);
        }

    },
    //METODO DE BUSCAR TURMAS PARA LANÇAR NOTAS OU FALTAS
    async BuscarLeciona(req, res, next) {
        try {
            const authorization = req.auth;
            const response =
                await knex('leciona')
                    .select('turma.*', 'disciplina.nome_disciplina', 'disciplina.id_disciplina',
                        'leciona.*')
                    .join('disciplina', 'disciplina.id_disciplina', '=', 'leciona.id_disciplina')
                    .join('turma', 'turma.id_turma', '=', 'leciona.id_turma')
                    .where('cpf_professor', authorization)

            return res.json(response)
        } catch (error) {
            next(error)
        }
    },

    //BUSCAR ALUNOS PARA LANÇAR NOTAS
    async SelecionaLecionaNotas(req, res, next) {
        try {
            const { idTurma, idDisciplina } = req.params; //SETANDO AS VARÁVEIS CONSTANTES E PUXANDO PELO PARAMS

             //PEGANDO UMA CONSULTA NO BANCO DE DADOS E SETANDO NA VARIAVEL CONSTANTE
            const response = await
                knex
                    .select('aluno.cpf_aluno', 'pessoa.nome', 'avalia.nota')
                    .from('leciona')
                    .join
                    (
                        'turma', 'turma.id_turma'
                        , '=',
                        'leciona.id_turma'
                    )
                    .join
                    (           // REALIZANDO JOINS
                        'participa', 'participa.id_turma',
                        '=',
                        'turma.id_turma'
                    )
                    .join
                    (
                        'aluno', 'aluno.cpf_aluno'
                        , '=',
                        'participa.cpf_aluno'
                    )
                    .join
                    (
                        'pessoa', 'pessoa.cpf'
                        , '=',
                        'aluno.cpf_aluno'
                    )
                    .join
                    (
                        'avalia', 'avalia.cpf_aluno'
                        , '=',
                        'aluno.cpf_aluno' //COMO DECLAREI A TABELA ANTES NÃO É NECESSIARIO FAZER NOVAMENTE
                    )
                    //ID TURMA É ÚNICO
                    .andWhere({
                        'leciona.id_turma': idTurma
                    })
                    //ID DISCIPLINA NÃO É, PORÉM OS DOIS SÃO ÚNICOS
                    .andWhere({
                        'leciona.id_disciplina': idDisciplina
                    })
                    .andWhere({
                        'avalia.id_disciplina': idDisciplina
                    })


            res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async BuscarProfessoresInativados(req, res, next) {
        try {
            const { page } = req.params;
            const result = await knex
                .select(
                    'pessoa.cpf', 'pessoa.nome', 'pessoa.nome_social', 'pessoa.situacao',
                    'telefone.*', 'login.email'
                )
                .from('pessoa')
                .where('pessoa.situacao', false)
                .join('login', 'login.id_login', '=', 'pessoa.login')
                .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                .join('tipo_login', 'tipo_login.id_tipo_login', '=', 'login.id_tipo_login')
                .where('tipo_login.nome_tipo_login', 'PROFESSOR')
                .limit(5)
                .offset((page - 1) * 5)


            const [count] =
                await knex('professor')
                    .from('professor')
                    .join('pessoa', 'pessoa.cpf', '=', 'professor.cpf_professor')
                    .where('pessoa.situacao', false)
                    .count();

            res.header('count', count["count"]);
            console.log(count)
            return res.json(result)
        } catch (error) {
            next(error);
        }
    },

    async SemPaginacaoBuscaProfessor(req, res, next) {
        try {

            const result = await knex
                .select('pessoa.cpf', 'pessoa.nome')
                .from('pessoa')
                .where('pessoa.situacao', true)
                .join(
                    'professor', 'professor.cpf_professor'
                    , '=',
                    'pessoa.cpf'
                )


            return res.json(result)
        } catch (error) {
            next(error);
        }
    },
    //BUSCAR ALUNOS DE ACORDO COM A DISCIPLINA E A TURMA 
    async Faltas(req, res, next) {
        try {
            const cpfProfessor = req.auth
            const { idDisciplina, idTurma } = req.params;

            const response =
                await knex
                    .select('faltas_aluno.*', 'pessoa.nome')
                    .from('faltas_aluno')
                    .join
                    (
                        'aluno', 'aluno.cpf_aluno'
                        , '=',
                        'faltas_aluno.cpf_aluno'
                    )
                    .join
                    (
                        'pessoa', 'pessoa.cpf',
                        '=',
                        'aluno.cpf_aluno'
                    )
                    .andWhere('faltas_aluno.id_disciplina', idDisciplina)
                    .andWhere('faltas_aluno.cpf_professor', cpfProfessor)
                    //ID TURMA É UNICO
                    .andWhere('faltas_aluno.id_turma', idTurma)

            res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async lancaFaltas(req, res, next) {
        try {
            // FAZENDO UMA VARIAVEL CONST OBJECT QUE ESTOU SELECIONANDO O CPFALUNO, ID TURMA, ID DISCIPLINA E QUANTIDADE FALTA
            const { cpfAluno, quantidade, idTurma, idDisciplina } = req.body; 

            //USANDO A FRAMEWORK COM METODO UPDATE JOGANDO A QUANTIDADE 
            //USANDO ANDWHERE PARA SELECIONAR COM MAIS PRECISÃO
            await knex('faltas_aluno').update({
                quantidade
            })
                .andWhere('cpf_aluno', cpfAluno)
                .andWhere('id_turma', idTurma)
                .andWhere('id_disciplina', idDisciplina)

            res.status(201).send('ok')
        } catch (error) {
            next(error)
        }
    },
    async AtualizarCadastroProfessor(req, res, next) {
        try {
            const { cpf, idRg, idLogin, idEndereco, idTelefone } = req.params;
            const {
                naturalidade,
                name,
                nome_social,
                nascimento,
                cep,
                cidade,
                numero_endereco,
                bairro,
                complemento,
                estado,
                sexo,
                email,
                ddd,
                numero_telefone,
                numero_rg,
                orgao_emissor,
                quadra,
                uf,
                especializacao,
                graduacao
            } = req.body;

            console.log('vai', cpf)
            let cpfSearch;

            if(cpf === '0'){
                cpfSearch = req.auth;
            }else{
                cpfSearch = cpf;
            }

            console.log('gay',cpfSearch)

            await knex('pessoa')
            .where({cpf: cpfSearch})
            .update({
                nome: name,
                nome_social: nome_social,
                nascimento: nascimento,
                sexo: sexo,
                naturalidade: naturalidade
            })



            await knex('telefone').update({
                ddd: ddd,
                numero_telefone: numero_telefone
            })
                .where({
                    id_telefone: idTelefone
                })
            //rg
            await knex('rg').update({
                numero_rg,
                orgao_emissor,
                uf
            })
                .where({
                    id_rg: idRg
                })
            //login
            await knex('login').update({
                email: email
            })
                .where(
                    'id_login', idLogin
                )
            //endereco
            await knex('endereco').update({
                cep: cep,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                quadra: quadra,
                numero_endereco: numero_endereco,
                complemento: complemento,
            })
                .where({
                    id_endereco: idEndereco
                })

            await knex('professor').where({
                cpf_professor: cpfSearch
            }).update({
                especializacao: especializacao,
                grau_formacao: graduacao
            })

     

            res.status(201).send('Atualizado com Sucesso!')
        } catch (error) {
            next(error)
        }

    }
}