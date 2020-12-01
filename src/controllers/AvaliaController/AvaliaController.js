const knex = require('../../database/index');


module.exports = {
    async criarAvaliaAluno(req, res, next){
    },
    async buscarNotaDeAcordoTurma (req, res, next){
        try {
            
        } catch (error) {
            
        }
    },
    async AvaliaAluno (req, res, next){
        try {
            const cpfProfessor = req.auth;
            const { 
                idDisciplina, 
                cpf_aluno,
                idTurma,
                nota, 
                bimestre
            } = req.body;

            await knex('avalia').update({
                nota: nota,
                bimestre: bimestre
             })
             .andWhere({
                cpf_aluno: cpf_aluno
             })
             .andWhere({
                id_disciplina: idDisciplina
             })
             .andWhere({
                cpf_professor: cpfProfessor
             })
             .andWhere({
                id_turma: idTurma
             })

             res.status(201).send();
        } catch (error) {
             next(error)
        }
    } ,
}