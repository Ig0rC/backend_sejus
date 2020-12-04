const knex = require('../database/index');

module.exports = {
    async Ativar(req, res, next){
        try {
        
            const authorization  = req.auth;
            
            const validation =  
                await knex
                    .select('administrador.cpf_administrador')
                        .from('administrador')
                        .where('administrador.cpf_administrador', authorization)             
                            .join('pessoa', 'pessoa.cpf', '=', 'administrador.cpf_administrador')
                        .where('pessoa.situacao', true)

            console.debug(validation)
            if(validation.length === 0){
                next(error);
            }
            const { cpf , verify } = req.params;
            
            console.log(cpf, verify)
            if(verify == 'true'){
                const situacao = true;
                await 
                knex('pessoa')
                .where('pessoa.cpf', cpf)
                .update({
                    situacao: situacao
                })
               
                console.log('ok')
               return res.status(201).send();
            }
            next(error)
        } catch (error) {
            next(error)
        }
    }
}