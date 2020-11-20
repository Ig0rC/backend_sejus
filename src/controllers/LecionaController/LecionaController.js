const knex = require('../../database/index');


module.exports = {
    async ConectarProfessorDisciplina(req, res, next){
        try {
            const { disciplina , cpfp , idturma, semestre, ano } = req.params;
      
           console.log(disciplina, cpfp, idturma, semestre, ano);
            await knex('leciona').insert({
                id_disciplina: disciplina,
                cpf_professor: cpfp,
                id_turma: idturma, 
                semestre: semestre, 
                ano: ano, 
            });

            res.status(201).send();
        } catch (error) {
            next(error)
        }
    }
}