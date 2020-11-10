const knex = require('../../database/index');


module.exports = {
    async criarTurma(req, res, next){
        try {
            const {
                nome_turma, 
                data_ingresso
            } = req.body

            const validation_class_year = await knex
                .select('nome_turma', 'data_ingresso')
                .from('turma')
                .where({
                    nome_turma: nome_turma,
                    data_ingresso: data_ingresso
                });

            if(validation_class_year.length == 0){
                await knex('turma').insert({
                    nome_turma,
                    data_ingresso
                })
                res.status(201).send();

            }else{
                next(error);
            }
           
        } catch (error) {
            next(error)
        }

    },
    async buscarTurmas(req, res, next){
        try {
            const result = await knex  
                .select('id_turma','nome_turma', 'data_ingresso')
                .from('turma')
            
            return res.json(result)
        } catch (error) {
            next(error)            
        }
    },
    async selecionaTurma(req, res, next){
        try {
            const { id } =req.params;
            const id_turma = id
            const result = await knex  
                .select('nome_turma', 'data_ingresso')
                .from('turma')
                .where('id_turma', id_turma);
            
                return res.json(result);
        } catch (error) {
            return next(error);
        }
    },
    async AtualizarTurmas(req,res,next){
        try {
            const { id } = req.params;
            const { nome_turma } = req.body;
            const id_turma = id; 
            await knex('turma')
                .where('id_turma' , '=', id_turma)
                .update({
                    nome_turma: nome_turma,
                });
            
            return res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async deleteTurma(req, res, next){
        try {
            const { id } = req.params;

            await knex('turma')
                .where('id_turma', '=', id)
                .del();

                res.status(201).send();
        } catch (error) {
           res.json("Impossivel Deletar a turma, existem alunos nelas")
        }
    },
    async listaAlunosTurmas(req, res, next){
        try {
            const { id } = req.params;
            const result =  await knex
                                .select('turma.nome_turma', 'pessoa.nome', 'aluno.cpf_aluno')
                                .from('turma')
                                    .leftJoin('participa', 'participa.id_turma', '=', 'turma.id_turma')
                                    .leftJoin('aluno', 'aluno.cpf_aluno','=',  'participa.cpf_aluno', )
                                    .leftJoin('pessoa', 'pessoa.cpf','=', 'aluno.cpf_aluno',  )
                                    .where('turma.id_turma', id);
                
            return res.json(result);


        } catch (error) { 
            next(error)
        }
    },
   
}