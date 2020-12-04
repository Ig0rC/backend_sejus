const knex = require('../../database/index');

module.exports = {
    async ConexaoTA(req, res, next){
        try {
            const cpf_aluno = req.auth;
            const {
                idTurma
            } = req.params;
            
            await knex('participa').insert({
                cpf_aluno, 
                id_turma: idTurma
            });

            const response =
                await knex('leciona')
                    .where('id_turma', idTurma);
            
            for(let i = 0; i < response.length; i++){
                await knex('faltas_aluno').insert({
                    cpf_professor: response[i].cpf_professor,
                    cpf_aluno: cpf_aluno,
                    id_disciplina: response[i].id_disciplina,
                    id_turma: idTurma,
                    semestre: response[i].semestre,
                    ano: response[i].ano,
                    quantidade: 0
                });
                await knex('avalia').insert({
                    cpf_aluno: cpf_aluno,
                    id_disciplina: response[i].id_disciplina,
                    cpf_professor: response[i].cpf_professor,
                    nota: 0,
                    ano: response[i].ano,
                    semestre: response[i].semestre,
                    bimestre: 'escolher',
                    id_turma: idTurma
                })
            }  
        return res.status(201).send();
        } catch (error) {
            next(error)   
        }
    },
    async ExcluindoAlunoTurmas(req, res, next){
        try {
            const { id } = req.params;
            
            console.log(typeof cpf_aluno);
            await knex('participa')
                .where('cpf_aluno', id)
                .del();

                return res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async UpdateTurma(req, res, next){
        try {
            const { id, turma } = req.params;
            
            await knex('participa')
                .where('cpf_aluno', id)
                .update('id_turma', turma); 
            
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async MostrarAlunosPorTurma (req, res, next){
        try {
            const {idTurma } = req.params;

            const response =
                await knex  
                    .select('pessoa.nome', 'pessoa.cpf', 'pessoa.nome_social', 'login.email' )
                        .from('participa')
                        .join
                        (
                            'aluno', 'aluno.cpf_aluno'
                                ,'=',
                            'participa.cpf_aluno'
                        )
                        .join
                        (
                            'pessoa', 'pessoa.cpf',
                                '=',
                            'aluno.cpf_aluno'
                        )
                        .join
                        (
                            'login', 'login.id_login'
                                ,'=',
                            'pessoa.login' 
                        )
                        .where('participa.id_turma', idTurma);
            return res.json(response)
        } catch (error) {
            next(error)
        }
    }
}