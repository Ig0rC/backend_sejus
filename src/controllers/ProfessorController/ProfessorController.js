const knex = require('../../database/index');
const { SelecionaProfessor } = require('../PessoaController/PessoaController');


module.exports = {
    async BuscarProfessores(req, res, next){
        try {
            const result = await knex
            .select('pessoa.cpf','pessoa.nome','pessoa.nome_social' )
            .from('pessoa')
            .join('login', 'login.id_login', '=', 'pessoa.login')
            .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
            .where('tipo_login.nome_tipo_login', 'PROFESSOR');     
            
            
               
           return res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async ExcluirProfessor(req, res, next){
        try {
            

            
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async SelecionaProfessor(req,res, netxt){
        
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