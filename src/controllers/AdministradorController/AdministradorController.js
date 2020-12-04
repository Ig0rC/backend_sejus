const { response } = require('express');
const knex = require('../../database/index');
const { SelecionaProfessor } = require('../PessoaController/PessoaController');


module.exports = {
    async BuscarAdministradorInativos(req, res, next){
        try {
            const result = await knex
            .select
                (
                'pessoa.cpf','pessoa.nome','pessoa.nome_social', 'login.email', 'telefone.*',
                'pessoa.situacao'
                )
                .from('pessoa')
                    .join('login', 'login.id_login', '=', 'pessoa.login')
                    .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
                    .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                    .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                .where('tipo_login.nome_tipo_login', 'ADM')
                .andWhere('pessoa.situacao', false)    
            res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async BuscarAdministradorAtivos(req, res, next){
        try {
            console.log('entrei')
            const result = await knex
            .select
                (
                'pessoa.cpf','pessoa.nome','pessoa.nome_social', 'login.email', 'telefone.*',
                'pessoa.situacao'
                )
                .from('pessoa')
                    .join('login', 'login.id_login', '=', 'pessoa.login')
                    .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
                    .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                    .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                .where('tipo_login.nome_tipo_login', 'ADM')
                .andWhere('pessoa.situacao', true)    
            res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async ExcluirAdministrador(req, res, next){
        try {
            const { 
                    cpfEnv, 
                    idRg, 
                    idLogin,
                    idTelefone,
                    idEndereco
                 } = req.params;
            console.log(cpfEnv)
            await knex('administrador').where({
                cpf_administrador: cpfEnv
            }).del();

            await knex('telefone_pessoa').where({
                cpf: cpfEnv
            }).del();

            await knex('endereco_pessoa').where({
                cpf: cpfEnv
            }).del();

            await knex('telefone').where({
                id_telefone: idTelefone
            }).del();
            
            await knex('endereco').where({
                id_endereco: idEndereco
            }).del();

            await knex('pessoa').where({
                cpf: cpfEnv,
            }).del();
            
            await knex('login').where({
                id_login: idLogin
            }).del();

            await knex('rg').where({
                id_rg: idRg
            })
            
            
            res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async SelecionaAdministrador(req,res, next){
        
        try {
            const { cpf } = req.params;

            const result = await knex
            .select(
                'pessoa.*', 'login.*', 'endereco.*', 
                'telefone.*', 'rg.*', 'tipo_telefone.nome_tipo_telefone',
                'endereco_pessoa.*', 'telefone_pessoa.*'
                )
                .from('pessoa')
                    .join('login', 'login.id_login', '=', 'pessoa.login')
                        .join('tipo_login', 'tipo_login.id_tipo_login', '=' , 'login.id_tipo_login')
                            .join('endereco_pessoa', 'endereco_pessoa.cpf', '=', 'pessoa.cpf')
                                .join('endereco', 'endereco.id_endereco', '=', 'endereco_pessoa.id_endereco')
                                .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                            .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                        .join('tipo_telefone', 'tipo_telefone.id_tipo_telefone', '=', 'telefone.id_tipo_telefone')
                    .join('rg', 'rg.id_rg','=', 'pessoa.id_rg')
                .where('pessoa.cpf', cpf)
            return res.json(result);
        } catch (error) {
            next(error);   
        }

    },
    async UpdateAdministrador (req, res, next){
        try {
            const { cpf } = req.params;
            const {
                naturalidade,
                nome, 
                nome_social,
                nascimento, 
                cep,
                cidade,
                numero_endereco,
                bairro, 
                complemento,
                estado,
                sexo,
                email, 
                ddd, 
                numero_telefone,
                numero_rg, 
                orgao_emissor,
                quadra,
                uf                
            } = req.body;

      
            const responseRg = await 
                knex.select('pessoa.id_rg')
                .from('pessoa')
                    .where({
                        cpf: cpf
                    })
            const responseTelefone = 
                    await knex 
                        .select('telefone.id_telefone')
                            .from('telefone')
                                .join
                                (
                                    'telefone_pessoa', 'telefone_pessoa.id_telefone'
                                        ,'=',
                                    'telefone.id_telefone'
                                )
                                .join
                                (
                                    'pessoa', 'pessoa.cpf',
                                        '=',
                                    'telefone_pessoa.cpf'
                                )  
                    .where('pessoa.cpf', cpf)

            const responseEmail = 
                await knex
                    .select('login.id_login')
                        .from('login')
                            .join('pessoa', 'pessoa.login', '=', 'login.id_login')
                        .where('pessoa.cpf', cpf) 
            

            const responseEndereco =
                await knex
                    .select('endereco.id_endereco')
                        .from('endereco')
                            .join('endereco_pessoa', 'endereco_pessoa.id_endereco', '=', 'endereco.id_endereco')   
                        .join('pessoa', 'pessoa.cpf', '=', 'endereco_pessoa.cpf')
                    .where('pessoa.cpf', cpf)                                              
            
            console.log(responseRg)
            if(!responseRg || !responseTelefone || !responseEmail || !responseEndereco){
                return res.status(201).send('cpf inválido')
            }

            for(let i = 0; i < responseTelefone.length; i++){
                //telefone
                await knex('telefone').update({
                    ddd: ddd,
                    numero_telefone: numero_telefone  
                })
                .where({
                    id_telefone: responseTelefone[i].id_telefone
                })
                //rg
                await knex('rg').update({
                    numero_rg,
                    orgao_emissor,
                    uf
                })
                .where({
                    id_rg : responseRg[i].id_rg
                })
                //login
                await knex('login').update({
                    email: email
                })
                .where({    
                    id_login: responseEmail[i].id_login
                })
                //endereco
                await knex('endereco').update({
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    quadra: quadra,
                    numero_endereco: numero_endereco,
                    complemento: complemento,
                })
                .where({
                    id_endereco: responseEndereco[i].id_endereco
                })
                
            }
            
            // for(let i = 0; i < responseRg.length, i++){
                
            // }
            await knex('pessoa')
            .update({
                nome: nome,
                nome_social: nome_social,
                nascimento: nascimento,
                sexo: sexo,
                naturalidade: naturalidade
            })
            .where(
                'pessoa.cpf', cpf
            )

            res.status(201).send('feito')
        } catch (error) {
            next(error)   
        }
    }
}