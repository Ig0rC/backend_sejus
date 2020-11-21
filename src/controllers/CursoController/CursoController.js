const knex = require('../../database/index');
const AuthMiddleware = require('../../middlewares/AuthMiddlewares')


module.exports = {
        async cadastrarCurso(req, res, next){
            try {
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
                const { page, id_curso  } = req.params;

                const query = knex('curso')
                    .limit(5)
                    .offset((page - 1) * 5);
                    //count
                    const countObject = knex('curso').count()

                    if (id_curso) {
                        query
                            .where({ id_curso })

                        countObject.where({ id_curso })

                    }
                    const [count] = await countObject;

                    res.header('count', count["count"]);
         

                    const results = await query;

                    return res.json(results);
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