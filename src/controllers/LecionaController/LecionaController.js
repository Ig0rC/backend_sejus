const knex = require('../../database/index');


module.exports = {
    async ConectarProfessorDisciplina(req, res, next){
        try {
            const { disciplina , cpf_professor , id_turma, semestre, ano } = req.body;
      
           console.log(disciplina, cpf_professor, id_turma, semestre, ano);
            await knex('leciona').insert({
                id_disciplina: disciplina,
                cpf_professor: cpf_professor,
                id_turma: id_turma, 
                semestre: semestre, 
                ano: ano, 
            });

            res.status(201).send();
        } catch (error) {
            next(error)
        }
    }, 
}