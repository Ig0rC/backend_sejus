const { query } = require('express');
const knex = require('../../database/index');

module.exports = {
    async BuscarAlunos(req, res, next){
        try {
            const { page } = req.params
            const result = await knex
            .select('pessoa.cpf','pessoa.nome','pessoa.nome_social', 'telefone.numero_telefone', 'login.email')
            .from('pessoa')

            .join('login', 'login.id_login', '=', 'pessoa.login')
            .join('aluno', 'aluno.cpf_aluno', '=', 'pessoa.cpf')
            .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
            .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
            .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
            .where('tipo_login.nome_tipo_login', 'ilike', '%' + 'Aluno' + '%')
            .andWhere('pessoa.situacao', true)
            .limit(5)
            .offset((page - 1) * 5)
            

        
            const [count] = 
                await knex('aluno')
                .from('aluno')
                .join('pessoa', 'pessoa.cpf', '=', 'aluno.cpf_aluno')
                .where('pessoa.situacao', true)
                .count();

            res.header('count', count["count"]);


               console.log(count)
            res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async DesativarAluno(req, res, next){
        try {
            const { cpf } = req.params;

            await knex('pessoa').update({
                situacao: false
            }).where({
                cpf
            })

            
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async SelecionaAlunos(req,res, next){
        
        try {
            const { cpf } = req.params;

            const result = await knex
            .select('pessoa.*', 'login.email', 'endereco.*', 'telefone.*')
            .from('pessoa')
            .join('login', 'login.id_login', '=', 'pessoa.login')
            .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
            .join('endereco_pessoa', 'endereco_pessoa.cpf', '=', 'pessoa.cpf')
            .join('endereco', 'endereco.id_endereco', '=', 'endereco_pessoa.id_endereco')
            .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
            .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
            .join('tipo_telefone', 'tipo_telefone.id_tipo_telefone', '=', 'telefone.id_tipo_telefone')
            .where('pessoa.cpf', cpf)
            
            return res.json(result);
        } catch (error) {
            next(error);   
        }

    },
    async AlunoInativados(req, res, next){
        try {
            const { page } = req.params
            const result = await knex
            .select(
                'pessoa.cpf','pessoa.nome',
                'pessoa.nome_social', 'telefone.numero_telefone', 
                'login.email', 'pessoa.situacao')
            .from('pessoa')
            .where('pessoa.situacao', false)
            .join('login', 'login.id_login', '=', 'pessoa.login')
            .join('aluno', 'aluno.cpf_aluno', '=', 'pessoa.cpf')
            .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
            .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
            .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
            .where('tipo_login.nome_tipo_login', 'ilike', '%' + 'Aluno' + '%')
            .limit(5)
            .offset((page - 1) * 5)
            

        
            const [count] = 
                await knex('aluno')
                .from('aluno')
                .join('pessoa', 'pessoa.cpf', '=', 'aluno.cpf_aluno')
                .where('pessoa.situacao', false)
                .count();

            res.header('count', count["count"]);


               console.log(count)
            res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async PerfilAluno (req, res, next){
        try {
            const { cpf } = req.params;
            const response = await 
                knex
                    .select
                    (
                        'pessoa.*', 'login.*', 'telefone.*', 'nome_tipo_telefone',
                        'rg.*','aluno.*', 'acessibilidade.*',
                        'patologia.*', 'autonomia.*', 'endereco.*'
                    )
                    .from('pessoa')
                    .join
                    (
                       'login', 'login.id_login'
                       ,'=',
                       'pessoa.login'
                    )
                    .join
                    (
                        'telefone_pessoa', 'telefone_pessoa.cpf',
                        '=',
                        'pessoa.cpf'
                    )
                    .join
                    (
                        'telefone', 'telefone.id_telefone'
                        ,'=',
                        'telefone_pessoa.id_telefone'
                    )
                    .join
                    (
                        'tipo_telefone', 'tipo_telefone.id_tipo_telefone'
                        ,'=',
                        'telefone.id_tipo_telefone'
                    )
                    .join
                    (
                        'rg', 'rg.id_rg'
                        ,'=',
                        'pessoa.id_rg'
                    )
                    .join
                    (
                        'aluno', 'aluno.cpf_aluno'
                        ,'=',
                        'pessoa.cpf'
                    )
                    .join
                    (
                        'saude_aluno', 'saude_aluno.cpf_aluno',
                        '=',
                        'aluno.cpf_aluno'
                    )
                    .join
                    (
                        'acessibilidade', 'acessibilidade.id_acessibilidade'
                        ,'=',
                        'saude_aluno.id_acessibilidade'
                    )
                    .join
                    (
                        'patologia', 'patologia.id_patologia'
                        ,'=',
                        'saude_aluno.id_patologia'
                    )
                    .join
                    (
                        'autonomia', 'autonomia.id_autonomia',
                        '=',
                        'saude_aluno.id_autonomia'
                    )
                    .join
                    (
                        'endereco_pessoa', 'endereco_pessoa.cpf',
                         '=',
                        'pessoa.cpf'
                    )
                    .join
                    (
                        'endereco', 'endereco.id_endereco'
                            ,'=',
                        'endereco_pessoa.id_endereco'
                    )
                    .where('pessoa.cpf', cpf);


            return res.json(response)
        } catch (error) {
            next(error)
        }
    }, 
    async buscarContatoEmergencial (req, res, next){
        try {
            const { cpf } = req.params;

            const result = await knex
                .select('contato_emergencial.*', 'telefone.*')
                .from('contato_emergencial')
                .join
                (
                    'aluno', 'aluno.id_contato_emergencial',
                    '=',
                    'contato_emergencial.id_contato_emergencial'
                )
                .join
                (
                    'telefone', 'telefone.id_telefone'
                    ,'=',
                    'contato_emergencial.id_telefone'
                )
                .where('aluno.cpf_aluno', cpf)

                res.json(result)

        } catch (error) {
            next(error)
        }   
    },
    async buscarCursos(req, res, next){
        try {
            const response = 
                await knex
                    .select
                    (
                        'curso.id_curso', 'instituicao.id_instituicao',
                        'curso.nome_curso', 'curso.carga_horaria', 'curso.nivel',
                        'instituicao.nome_instituicao', 'endereco.cidade', 'endereco.estado' 
                    )
                    .from('curso')
                    .join
                    (
                        'instituicao_curso', 'instituicao_curso.id_curso'
                            ,'=',
                        'curso.id_curso'
                    )
                    .join
                    (
                        'instituicao', 'instituicao.id_instituicao'
                            ,'=',
                        'instituicao_curso.id_instituicao'
                    )
                    .join
                    (
                        'endereco_instituicao', 'endereco_instituicao.id_instituicao'
                            ,'=',
                        'instituicao.id_instituicao'
                    )
                    .join
                    (
                        'endereco', 'endereco.id_endereco'
                            ,'=',
                        'endereco_instituicao.id_endereco'
                    );
                        [{}]
            return res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async buscarCursosInfo(req, res, next){
        try {
            const { idCurso, idInsti } = req.params;

           
                
            const info = 
                await knex
                    .select
                    (
                        'curso.*', 'instituicao.*',
                        'endereco.*',
                    )
                    .from('instituicao')
                    .join
                    (
                        'instituicao_curso', 'instituicao_curso.id_instituicao'
                            ,'=',
                        'instituicao.id_instituicao'
                    )
                    .join
                    (
                        'curso', 'curso.id_curso'
                            ,'=',
                        'instituicao_curso.id_curso'
                    )
                    .join
                    (
                        'endereco_instituicao', 'endereco_instituicao.id_instituicao'
                            ,'=',
                        'instituicao.id_instituicao'
                    )
                    .join
                    (
                        'endereco', 'endereco.id_endereco'
                            ,'=',
                        'endereco_instituicao.id_endereco'
                    )
                    .andWhere('instituicao.id_instituicao', idInsti)
                    .andWhere(
                        'curso.id_curso', idCurso
                    )
                      
           return  res.json(info)
            
   
        } catch (error) {
            next(error)
        }
    },
    async infoCursoDisciplina(req, res, next){
        try {
            const { idCurso } = req.params;

            const response = await knex.
                select('disciplina.*')
                .from('disciplina')
                .join
                (
                    'disciplina_curso', 'disciplina_curso.id_disciplina'
                        ,'=',
                    'disciplina.id_disciplina'
                )
                .join
                (
                    'curso', 'curso.id_curso'
                        ,'=',
                    'disciplina_curso.id_curso'
                )
                .where('curso.id_curso', idCurso)

            res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async infoCursoTurma(req, res, next){
        try {
            const {idCurso, idInsti} = req.params;
            const response = 
                await knex
                    .select
                    (
                        'turma.*' , ' pertence.turno'
                    )
                    .from('turma')
                    .join
                    (
                        'pertence', 'pertence.id_turma'
                            ,'=',
                        'turma.id_turma'
                    )
                    .join
                    (
                        'curso', 'curso.id_curso'
                            ,'=',
                        'pertence.id_curso'
                    )
                    .join
                    (
                        'instituicao', 'instituicao.id_instituicao'
                            ,'=',
                        'pertence.id_instituicao'
                    )    
                    .andWhere('instituicao.id_instituicao', idInsti)
                    .andWhere('pertence.id_curso', idCurso )
                    .andWhere('turma.situacao_turma', 'aberto')

            res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async minhaNotasFaculdade (req, res, next){
        try {
            console.log('entrou')

            const cpfAluno = req.auth;

            const response = 
                await knex
                .select('avalia.*', 'disciplina.nome_disciplina', 'leciona.*', )
                .from('avalia')
                .join
                (
                    'disciplina', 'disciplina.id_disciplina'
                        ,'=',
                    'avalia.id_disciplina'
                )
                .join
                (
                    'leciona', 'leciona.id_disciplina'
                        ,'=',
                    'avalia.id_disciplina'
                )           
                .where({
                    'avalia.cpf_aluno': cpfAluno
                })
           return  res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async minhasFaltas (req, res, next){
        try {
            const cpfAluno = req.auth;

            const response = 
                await knex
                .select('faltas_aluno.*', 'disciplina.nome_disciplina', 'leciona.*' )
                .from('faltas_aluno')
                .join
                (
                    'disciplina', 'disciplina.id_disciplina'
                        ,'=',
                    'faltas_aluno.id_disciplina'
                )
                .join
                (
                    'leciona', 'leciona.id_disciplina'
                        ,'=',
                    'disciplina.id_disciplina'
                )             
                .where({
                    'faltas_aluno.cpf_aluno': cpfAluno
                })
           return  res.json(response)
        } catch (error) {
            next(error)
        }
    }, 
    async UpdateAluno(req, res, next){
        try {
            
            console.log('Ok')
            const { cpf, id_rg, idEndereco, idTelefone, idLogin } = req.params;
            const { 
                nome, nome_social , naturalidade, nascimento, sexo, //PESSOA
                numero_rg, orgao_emissor, uf, //RG
                cep, estado, cidade, bairro, quadra, numero_endereco, complemento, // ENDERECO
                tipo_telefone, ddd, numero_telefone, //telefone
                email
            } = req.body;
            

            let id_tipo_telefone;
            if(tipo_telefone === 'Móvel'){
                id_tipo_telefone = 2
            }else if(tipo_telefone === 'Fixo'){
                id_tipo_telefone = 1
            } 
            await knex('pessoa').update({
                nome,
                nome_social,
                naturalidade,
                nascimento, 
                sexo,
            }).where({
                cpf: cpf,
            })

            await knex('rg').update({
                numero_rg,
                orgao_emissor,
                uf
            }).
            where({
                id_rg: id_rg
            })


            await knex('endereco').update({
                cep,
                estado, 
                cidade,
                bairro,
                quadra,
                numero_endereco,
                complemento 
            }).where({
                id_endereco: idEndereco
            })

            await knex('telefone').update({
                id_tipo_telefone,
                ddd,
                numero_telefone
            }).where({
                id_telefone: idTelefone
            })
            console.log(idLogin)
            await knex('login').update({
                email, 
            }).where({
                id_login: idLogin
            })


            res.status(201).send('Atualizado')
        } catch (error) {
            next(error)
        }
    }
}