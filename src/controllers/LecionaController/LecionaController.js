const knex = require('../../database/index');


module.exports = {
    async ConectarProfessorDisciplina(req, res, next){
        try {
            const { disciplina , cpf_professor , id_turma, semestre, ano, horario_aula, diasemana } = req.body;
            


            //VERIFICANDO SE EXISTE LECIONA DESSE PROFESSOR
            const responseL =
            await knex('leciona')
                .andWhere('id_turma', id_turma)
                .andWhere('id_disciplina', disciplina);
            if(responseL.length > 0){
                return res.status(401).send('Já Existe Professor Selecionado há Disciplina')
            }
            const response =
            await knex('participa')
                .where({
                    id_turma: id_turma,
                });
            
                
            if(response.length > 0){
                    for(let i = 0; i < response.length; i++){
                        await knex('faltas_aluno').insert({
                            cpf_professor: cpf_professor,
                            cpf_aluno: response[i].cpf_aluno,
                            id_disciplina: disciplina,
                            id_turma: id_turma,
                            semestre: semestre,
                            ano: ano,
                            quantidade: 0
                        });
                        await knex('avalia').insert({
                            cpf_professor: cpf_professor,
                            cpf_aluno: response[i].cpf_aluno,
                            id_disciplina: disciplina,
                            id_turma: id_turma,
                            semestre: semestre,
                            ano: ano,
                            nota: 0,
                            bimestre: 'Pendente',
                        });
                    }   
            }
           
           
                await knex('leciona').insert({
                    id_disciplina: disciplina,
                    cpf_professor: cpf_professor,
                    id_turma: id_turma, 
                    semestre: semestre, 
                    ano: ano, 
                    horario_aula: horario_aula,
                    dia_semana: diasemana
                });
    
                await knex('turma').update({
                    situacao_turma: 'aberto'
                }).where({ id_turma: id_turma})

                
                res.status(201).send('Cadastrado com sucesso')
        } catch (error) {
            next(error)
        }
    }, 
    async BuscarTurmasAcordoCursoDisciplinas(req, res, next){
        try {
            const { idD } = req.params;
        const result = await knex
                    .select('turma.*')
                        .from('disciplina')
                            .join
                            (
                                'disciplina_curso', 'disciplina_curso.id_disciplina',
                                '=',
                                'disciplina.id_disciplina'
                            )
                            .join
                            (
                                'curso', 'curso.id_curso'
                                ,'=',
                                'disciplina_curso.id_curso'
                            )
                            .join
                            (
                                'pertence', 'pertence.id_curso'
                                ,'=',
                                'curso.id_curso'
                            )
                            .join
                            (
                                'turma', 'turma.id_turma'
                                ,'=',
                                'pertence.id_turma'
                            )
                        .where('disciplina.id_disciplina', idD)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }, 
    async BuscarInstituicoes (req, res, next){
        try {
            const response = await knex('instituicao')

            res.json(response)
        } catch (error) {
            next(error)            
        }
    },
    async BuscarTurmaPertenceInstituicaoCurso (req, res, next){
        try {
            const { idInstituicao, idCurso } = req.params
            const response =
                await knex
                    .select
                        (
                        'turma.id_turma', 'turma.nome_turma', 
                        'pertence.turno', 
                        'curso.nome_curso', 'curso.id_curso'
                        )
                        .from('instituicao')
                        .where('instituicao.id_instituicao', idInstituicao)
                            .join
                            (
                                'pertence', 'pertence.id_instituicao'
                                    ,'=',
                                'instituicao.id_instituicao'
                            )
                            .join
                            (
                                'curso', 'curso.id_curso'
                                    ,'=',
                                'pertence.id_curso'
                            )
                            .join
                            (
                                'turma', 'turma.id_turma',
                                    '=',
                                'pertence.id_turma'
                            )
                        .where('curso.id_curso', idCurso)
                            
            return res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async BuscarDisciplinaQuePertenceCurso (req, res, next){
        console
        try {
            const { idCurso } = req.params
            const response =
                await knex
                    .select('disciplina.*')
                        .from('curso')
                            .join
                            (
                                'disciplina_curso', 'disciplina_curso.id_curso'
                                    ,'=',
                                'curso.id_curso'
                            )
                            .join
                            (
                                'disciplina', 'disciplina.id_disciplina'
                                    ,'=',
                                'disciplina_curso.id_disciplina'
                            )
                        .where('curso.id_curso', idCurso)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }
}