const knex = require('../database/index');


module.exports = {
    async cadastrarCurso(req, res, next){
      
        try {
            const {
                nome,
                duracao_semestres,
                periodo, 
                nivel, 
                carga_horaria
            } = req.body
            console.log(
                await knex('curso').insert({
                    nome, duracao_semestres, periodo, nivel, carga_horaria
                })
            )
            
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async buscarCursos(req, res, next){
        try {
            const result = await knex('curso')
                .select('id_curso', 'nome', 'duracao_semestres', 'periodo', 'nivel',' carga_horaria')

                return res.json(result);
        } catch (error) {   
                next(error)
        }
    },
    async selecionaCurso(req, res, next){
        try {
            const { id } = req.params;

            const result = await knex('curso')
                .select('id_curso','nome', 'duracao_semestres', 'periodo', 'nivel', 'carga_horaria')
                    .where('id_curso', id);

                    return res.json(result);
        } catch (error) {
            next(error);
        }
    },
    async deletaCurso(req, res, next){
        try {
            const { id } = req.params;

            await knex('curso')
                    .where('id_curso', id)
                        .del();
                    
                    return res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async AtualizarCurso(req, res, next){
        try {
            const { id } = req.params;
            const {
                nome,
                duracao_semestres,
                periodo, 
                nivel, 
                carga_horaria
            } = req.body;
            await knex('curso')
                     .where('id_curso', id)
                        .update({
                            nome: nome,
                            duracao_semestres: duracao_semestres,
                            periodo: periodo,
                            nivel: nivel,
                            carga_horaria: carga_horaria
                        })
                    res.status(201).send();
        } catch (error) {
            next(error);
        }
    }
}