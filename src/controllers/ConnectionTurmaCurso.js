const knex = require('../database/index');

module.exports = {
    async TurmaCurso (req, res, next){
        try {
            const { turma, curso } = req.params;
            const { turno } = req.body;
            const id_curso = curso;
            const id_turma = turma;
                await knex('pertence').insert({
                    id_curso: id_curso,
                    id_turma: id_turma,
                    turno
                })
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }
}