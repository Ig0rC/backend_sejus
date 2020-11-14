const knex = require('../../database/index');


module.exports = {
    async BuscarProfessores(req, res, next) {
     
        try {
            console.log('ok')
            const result = await knex.select('pessoa.nome','pessoa.nome_social','tipo_login.nome_tipo_login' )
                .from('pessoa')
                .join('login', 'login.id_login', '=', 'pessoa.login')
                .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login');
            
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }, 
    async SelecionaProfessor(req, res, next){
        try {
            const { cpf } = req.params;
            
            const result = await knex
                    .select('pessoa.*', 'login.*', 'tipo_login.nome_tipo_login')
                    .from('pessoa')
                    .join('login', 'login.id_login', '=', 'pessoa.login')
                    .join('')

            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}