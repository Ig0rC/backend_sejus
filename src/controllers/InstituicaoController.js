const knex = require('../database/index')


module.exports = {
    async createInstituicao(req, res, next) {
        try {

            const {
                id_tipo_telefone,
                ddd,
                numero_telefone,
                nome,
                responsavel,
                unidade,
                email,
                cep,
                estado,
                cidade,
                bairro,
                quadra,
                numero_endereco,
                complemento
            } = req.body;
            
            //validacao de instituicao;
            const busca_validation_duplicate = await knex
                .select('id_instituicao')
                .from('instituicao')
                .where('nome', 'ilike', '%' + nome+ '%')
                .andWhere('responsavel', 'ilike', '%' + responsavel + '%')
                .andWhere('unidade', 'ilike', '%' + unidade + '%')
                .andWhere('email', 'ilike',  '%' + email + '%' );
                
            let cachevalidation;
          
            for(let i = 0; busca_validation_duplicate.length; i++){
                cachevalidation = busca_validation_duplicate[i].id_instituicao
                console.log(cachevalidation);
            }

            if(cachevalidation === undefined){
                const ddi = +55

                // insert tabela telefone
                await knex('telefone').insert({
                    id_tipo_telefone, ddd, ddi, numero_telefone
                });
                // insert table instituicao
                await knex('instituicao').insert({
                    nome, responsavel, unidade, email
                });
                // insert table endereco
                await knex('endereco').insert({
                    cep, estado, cidade, bairro, quadra, numero_endereco, complemento
                })
    
                let i = 0;
                        if (i == 0) {
                            const busca_id_instituicao_cadastro = await knex
                                .select('id_instituicao')
                                .from('instituicao')
                                .where({
                                    nome: nome,
                                    responsavel: responsavel,
                                    email: email
                                })
    
                            const busca_id_instituicao_telefone = await knex
                                .select('id_telefone', 'numero_telefone', 'ddd')
                                .from('telefone')
                                .where({
                                    numero_telefone: numero_telefone,
                                    ddd: ddd,
                                });
    
                            const busca_id_endereco_instituicao = await knex
                                .select('id_endereco')
                                .from('endereco')
                                .where({
                                    cep: cep,
                                    estado: estado, 
                                    cidade: cidade,
                                    quadra: quadra,
                                    numero_endereco: numero_endereco,
                                    complemento: complemento,
                                });
    
                            const id_endereco = busca_id_endereco_instituicao[i].id_endereco;
                            console.log(id_endereco);
                            const id_telefone = busca_id_instituicao_telefone[i].id_telefone;
                            console.log(id_telefone)
                            const id_instituicao = busca_id_instituicao_cadastro[i].id_instituicao;
                            console.log(id_instituicao)
    
    
                            await knex('telefone_instituicao').insert({
                                id_instituicao, id_telefone
                            });
                            await knex('endereco_instituicao').insert({
                                id_instituicao, id_endereco
                            })
                        }
                    return res.status(201).send();
            }
          
            console.log('otario n vai da');

          next(error);
       
        } catch (error) {
            next(error)
        }


    },
    // async instituicaoAll(req, res, next){
    //     const { id_instituicao , page = 1}
    // }

}