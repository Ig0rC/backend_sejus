const { query } = require('express');
const knex = require('../../database/index');

module.exports = {
    async BuscarAlunos(req, res, next){
        try {
            const { page } = req.params
            const result = await knex
            .select('pessoa.cpf','pessoa.nome','pessoa.nome_social', 'telefone.numero_telefone', 'login.email')
            .from('pessoa')
            .join('login', 'login.id_login', '=', 'pessoa.login')
            .join('aluno', 'aluno.cpf_aluno', '=', 'pessoa.cpf')
            .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
            .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
            .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
            .where('tipo_login.nome_tipo_login', 'ilike', '%' + 'Aluno' + '%')
            .limit(5)
            .offset((page - 1) * 5)
            

        
            const [count] = 
                await knex('aluno')
                .from('aluno')
                .join('pessoa', 'pessoa.cpf', '=', 'aluno.cpf_aluno')
                .where('pessoa.situacao', true)
                .count();

            res.header('count', count["count"]);


               console.log(count)
            res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async DesativarAluno(req, res, next){
        try {
            

            
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async SelecionaAlunos(req,res, next){
        
        try {
            const { cpf } = req.params;

            const result = await knex
            .select('pessoa.*', 'login.email', 'endereco.*', 'telefone.*')
            .from('pessoa')
            .join('login', 'login.id_login', '=', 'pessoa.login')
            .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
            .join('endereco_pessoa', 'endereco_pessoa.cpf', '=', 'pessoa.cpf')
            .join('endereco', 'endereco.id_endereco', '=', 'endereco_pessoa.id_endereco')
            .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
            .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
            .join('tipo_telefone', 'tipo_telefone.id_tipo_telefone', '=', 'telefone.id_tipo_telefone')
            .where('pessoa.cpf', cpf)
            
            return res.json(result);
        } catch (error) {
            next(error);   
        }

    },
}