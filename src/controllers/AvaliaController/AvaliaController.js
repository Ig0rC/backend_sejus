const knex = require('../../database/index');


module.exports = {
    async AvaliaAluno (req, res, next){ // METODO ASYNC 
        try {
            const cpfProfessor = req.auth;
            const { 
                idDisciplina, 
                cpf_aluno,
                idTurma,   //PUXANDO MINHAS VARÍAVEIS NUM OBJETO
                nota, 
                bimestre
            } = req.body;


            //FRAMEWORK KNEX SELECIONANDO A TABELA AVALIA COM UPDATE PARA TROCA OS VALORES E O AND WHERE CONDIÇÕES DO SQL
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