const knex = require('../database/index');

module.exports = {
    async criarHorario(req, res, next){
        try {
            const { horas } = req.body;
            console.log(horas)
            await knex('carga_horaria').insert({
                horas
            })
    
            return res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async searchHorario(req, res, next){
        try {
            const result_horario = await knex.select('horas').from('carga_horaria');

            return res.json(result_horario)
        } catch (error) {
            next(error)
        }
    }

}