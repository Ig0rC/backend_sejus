const knex = require('../database/index');


module.exports = {
    async create(req, res, next){
        try {
            const situacao = 'INATIVO';
            const ddi = '015';
            const {
                ddd, id_tipo_telefone, numero_telefone,
                email, senha, id_tipo_login,
                numero_rg, orgao_emissor, uf,
                cep, estado, cidade, bairro, quadra, numero_endereco,
                complemento,
                nome, nome_social,
                naturalidade, nascimento, sexo,
                especializacao , grau_formacao, cpf
            }  = req.body;
            
             
           
            await knex('telefone').insert({
                id_tipo_telefone, ddd, ddi,  numero_telefone
            });
            await knex('rg').insert({
                numero_rg, orgao_emissor, uf
            });
            await knex('endereco').insert({
                cep, estado, cidade, bairro, quadra, numero_endereco, complemento
            });

            await knex('login').insert({
               email, senha, id_tipo_login
            });
            
            
            const id_rg = knex.select('id_rg')
                            .from('rg')
                            .where('numero_rg', numero_rg);

            const login = knex.select('id_login')
            .from('login')
            .where('email', email);

            await knex('pessoa').insert({
                cpf, login, nome, nome_social, 
                id_rg, naturalidade, nascimento, sexo, 
                cpf, especializacao, grau_formacao, situacao
            });


        } catch (error) {
            next(error)
        }
        try {
            const {
                    cep,numero_telefone
                    } = req.body;
        
            const bscEndereco = await knex.select('id_endereco')
            .from('endereco')
            .where('cep', cep)

            const id_endereco = 1;
            
            console.log(id_endereco) 

            const id_telefone = await knex.select('id_telefone')
            .from('telefone')
            .where('numero_telefone', numero_telefone );

            const cpf ="9095363201"
            

       
                await knex('endereco_pessoa').insert({
                    cpf, id_endereco
                });
                await knex('telefone_pessoa').insert({
                    cpf, id_telefone
                });
     

        } catch (error) {
            next(error)
        }
    },

}