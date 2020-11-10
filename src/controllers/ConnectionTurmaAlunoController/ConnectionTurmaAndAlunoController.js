const knex = require('../../database/index');

module.exports = {
    async ConexaoTA(req, res, next){
        try {
            const {
                CPFArrayAluno,
                id_turma

            } = req.body;
            
    
            for(let i = 0; i < CPFArrayAluno.length; i++){
      
                let cpf_aluno = CPFArrayAluno[i]
                await knex('participa').insert({
                    cpf_aluno, id_turma
                });
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
            console.log('foi')
            await knex('participa')
                .where('cpf_aluno', id)
                .update('id_turma', turma); 
            
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    }
}