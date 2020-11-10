const knex = require('../../database/index');

module.exports = {
    async VincularDiscCur(req, res, next){
        try {
            const { idD, idC} = req.params
            const id_disciplina = idD;
            const id_curso = idC;
            
            await knex('disciplina_curso').insert({
                id_disciplina: id_disciplina,
                id_curso: id_curso
            })
            res.status(201).send();
        } catch (error) {
            next(error)
            
        }
    },
    async BuscarDisciplinaCursos(req, res, next){
        try {
            const result = await knex('disciplina_curso')

            res.json(result);
        } catch (error) {
            next(error)
        }
    },
    async SelecionarDisciplinaCurso(req, res, next){
        try {
            const { idD, idC} = req.params;
            
  
            const result = 
                await knex
                        .select('disciplina.*', 'curso.*')
                            .where('disciplina_curso.id_disciplina', idD)
                            .from('disciplina_curso')
                                .join('disciplina', 'disciplina.id_disciplina', '=','disciplina_curso.id_disciplina')
                                    .join('curso', 'curso.id_curso', '=', 'disciplina_curso.id_curso')
                                        .where('disciplina_curso.id_curso',idC)
        
            res.json(result);
        } catch (error) {
            next(error)
        }
    },
    async deletaCurso(req, res, next){
        try {
            const { idD, idC } = req.params;
            const id_disciplina = idD;
            const id_curso = idC
            await knex('disciplina_curso')
                    .where({
                        id_disciplina,
                        id_curso,   
                    })
                    .del();
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    }
}