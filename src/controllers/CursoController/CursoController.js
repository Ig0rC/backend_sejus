const knex = require('../../database/index');
const AuthMiddleware = require('../../middlewares/AuthMiddlewares')


module.exports = {
        async cadastrarCurso(req, res, next){
            try {
                const authorization  = req.auth;
                const validation =  
                        await 
                        knex
                        .select('administrador.cpf_administrador')
                        .from('administrador')
                        .where('administrador.cpf_administrador', authorization)             
                        .join('pessoa', 'pessoa.cpf', '=', 'administrador.cpf_administrador')
                        .where('pessoa.situacao', true)
    
                if(validation.length === 0){
                    next(error);
                }
     
                const {
                    nome_curso,
                    duracao_semestres,
                    periodo, 
                    nivel, 
                    carga_horaria
                } = req.body
                
                    await knex('curso').insert({
                        nome_curso, duracao_semestres, periodo, nivel, carga_horaria
                    })
        
                   
                res.status(201).send();
            } catch (error) {
                next(error);
            }
        },
        async buscarCursos(req, res, next){
            try {
                const result = await knex('curso')
                console.log(AuthMiddleware.req.auth)
                    return res.send(result);
            } catch (error) {   
                    next(error)
            }
        },
        async selecionaCurso(req, res, next){
            try {
                const { id } = req.params;

                const result = await knex('curso')
                    .select('curso.*')
                        .where('id_curso', id);

                        return res.json(result);
            } catch (error) {
                next(error);
            }
        },
        async deletaCurso(req, res, next){
            const authorization  = req.auth;
            const validation =  
                    await 
                    knex
                    .select('administrador.cpf_administrador')
                    .from('administrador')
                    .where('administrador.cpf_administrador', authorization)             
                    .join('pessoa', 'pessoa.cpf', '=', 'administrador.cpf_administrador')
                    .where('pessoa.situacao', true)

            if(validation.length === 0){
                next(error);
            }
 
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
            const authorization  = req.auth;
            const validation =  
                    await 
                    knex
                    .select('administrador.cpf_administrador')
                    .from('administrador')
                    .where('administrador.cpf_administrador', authorization)             
                    .join('pessoa', 'pessoa.cpf', '=', 'administrador.cpf_administrador')
                    .where('pessoa.situacao', true)

            if(validation.length === 0){
                next(error);
            }
 
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
                                nome_curso: nome,
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