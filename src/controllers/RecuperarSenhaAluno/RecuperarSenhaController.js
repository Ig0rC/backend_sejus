const knex = require('../../database/index');
const bcrypt = require('bcryptjs')



module.exports = {
    async verificarCPFnoBD(req, res, next) {
        try {
            const { cpf } = req.body;
            console.log(cpf)

            const result = await knex('alterar_email_senha').where({
                cpf_aluno : cpf
            });
    
            if(result.length === 0 ){
                return res.send('CPF não encotrado, por favor, cadastre-se')
            }
    
          

            return res.json(true)

        } catch (error) {
            next(error)
        }
     
    },
    async SearchEmail (req, res, next) {
        try {

            const { id } = req.params;

            
            const result = await knex('alterar_email_senha').where({
                cpf_aluno : id
            });



            const searchEmail = await knex('login').where({
                 id_login: result[0].id_login
            });

            const email = searchEmail[0].email
            const login = searchEmail[0].id_login;
            console.log(login)

            res.json({
                email,
                login
            });

        } catch (error) {
            next(error)
        }
    },

    async alterarLogin( req, res, next) {
        try {
            const { email, senhaNova, login } = req.body;


            //caso tenha
            const senha = bcrypt.hashSync(senhaNova, 2)

            if(email && senha){
                await knex("login").update({
                    email: email,
                    senha: senha
                })
                .where({
                    id_login: login
                })
            }
            
        
            res.status(201).send('Atualizado');
        } catch (error) {
            next(error)
        }
    }
}