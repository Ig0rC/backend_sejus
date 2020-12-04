const knex = require('../../database/index');


module.exports = {
     async CadastrarDisciplina(req, res, next){
        try {
            const {
                nome_disciplina, 
                horas,
             } = req.body
    
             await knex('disciplina').insert({
                 nome_disciplina, horas
             });

             res.status(201).send();
        } catch (error) {
            next(error);
        }
     }, 
     async DeletarDisciplina(req, res, next){
         try {
             const { id } = req.params;

             await knex('disciplina')
                    .where('id_disciplina', id)
                    .del();

            return res.status(201).send();
         } catch (error) {
             next(error);
         }
     },
     async BuscarDisciplinas(req,res,next){
         try {
             const { page } = req.params;
             const result = 
                await knex('disciplina')
                .limit(16)
                .offset((page - 1) * 16)

                const [count] = 
                    await knex('disciplina')
                            .from('disciplina')
                                .count();
                 
                res.header('count', count["count"]);           

             res.json(result);
         } catch (error) {
             next(error)
         }
     },
     async AtualizarDisciplina(req, res, next){
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
                id
             } = req.params;
             const {
                 nome, 
                 horas,
            } = req.body;

                await knex('disciplina')
                        .where('id_disciplina', id)
                            .update({
                                nome_disciplina: nome,
                                horas: horas,
                            });

            return res.status(201).send();
         } catch (error) {
             next(error)
         }
     },
     async BuscarDisciplinaLeciona(req, res, next){
         try {
             const result = await knex('disciplina');

             res.json(result);
         } catch (error) {
             next(error)
         }
     },
     async BuscarDisciplinaCurso(req, res, next){
         try {
             const result = await knex('disciplina')
             
             res.json(result)
         } catch (error) {
             next(error)
         }
     },
     async SelecionarDisciplina (req, res, next){
         try {
             const { idDisciplina } = req.params;
             const result = 
                await knex('disciplina').where({
                    id_disciplina: idDisciplina
             })
             res.json(result)
         } catch (error) {
             next(error)
         }
     }

}