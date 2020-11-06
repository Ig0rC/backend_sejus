const knex = require('../database/index');


module.exports = {
    
    async criarTelefone(req, res, next){
        try {
            const {
                id_tipo_telefone,
                ddd, 
                numero_telefone,
                nome_SOS,
                numero_SOS,
                ddd_SOS,
            } = req.body;
            const ddi ='015'
            await knex('telefone').insert({
                id_tipo_telefone, ddd, ddi, numero_telefone
            })
            return res.status(201).send();
            
        } catch (error) {
            next(error);
        }
 
    }
}