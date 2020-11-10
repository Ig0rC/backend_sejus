const knex = require('../../database/index');


module.exports = {
     async CadastrarDisciplina(req, res, next){
        try {
            const {
                nome, 
                horario_aula,
                data,
                horas,
             } = req.body
    
             await knex('disciplina').insert({
                 nome, horario_aula, data, horas
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
             const result = await knex('disciplina')

             res.json(result);
         } catch (error) {
             next(error)
         }
     },
     async AtualizarDisciplina(req, res, next){
         try {
             const {
                id
             } = req.params;
             const {
                 nome, 
                 horario_aula,
                 data,
                 horas,
            } = req.body;
                await knex('disciplina')
                        .where('id_disciplina', id)
                            .update({
                                nome: nome,
                                horario_aula: horario_aula,
                                data: data,
                                horas: horas,
                            });

            return res.status(201).send();
         } catch (error) {
             next(error)
         }
     }
}