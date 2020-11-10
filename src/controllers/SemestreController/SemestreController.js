const knex = require('../../database/index');

module.exports  = {
    async CriarSemestre(req, res, next){
        try {
            const {
                semestre,
                ano
            } = req.body;
            
            await knex('semestre').insert({
                semestre, ano
            });
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async BuscarSemestreAll(req, res, next){
        try {
            const result = await knex('semestre');

            res.json(result);
        } catch (error) {
            next(error);
        }
    },
    async SelecionaSemestre(req, res, next){
        try {
            const { semestre , ano } = req.params;

            const result = 
                await knex('semestre')
                        .where
                        ({
                            semestre:semestre,
                            ano: ano
                        })

                res.json(result);
        } catch (error) {
                next(error);

        }
    }, 
    async AtualizarSemestre(req, res, next){
        try {
            const { idsemestre, idano } = req.params;
            const { semestre, ano } = req.body;

            await knex('semestre')
                    .where({
                        semestre: idsemestre,
                        ano: idano, 
                    })
                    .update({
                        semestre: semestre,
                        ano: ano
                    })
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }, 
    async DeletaSemestre(req, res, next){
        try {
            const { semestre, ano } = req.params;

            await  knex('semestre')
                    .where({
                        semestre: semestre,
                        ano: ano
                    })
                    .del();

            res.status(201).send("apagado com sucesso")
        } catch (error) {
            next(error).send("Não é possivel excluir, possui pedências")
        }
    }
}