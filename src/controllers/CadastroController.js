const knex = require('../database/index');


module.exports = {
    async cadastrar(req, res, next) {

        try {
            const ddi = '015'
            const situacao = 'INATIVO';
            const {
                cpf,
                nome,
                nome_social,
                naturalidade,
                nascimento,
                sexo,
                numero_rg,
                email,
                senha,
                id_tipo_login,
                orgao_emissor,
                uf,
                numero_telefone,
                ddd,
                id_tipo_telefone,
                cep,
                estado,
                bairro,
                cidade,
                quadra,
                numero_endereco,
                complemento,

            } = req.body;

            // insert tabela rg;
            await knex('rg').insert({
                numero_rg, orgao_emissor, uf
            });
            // insert tabela email;
            await knex('login').insert({
                email, senha, id_tipo_login
            });

            // buscando o ID
            const consult_id_rg = await knex.select('id_rg', 'numero_rg')
                .from('rg')
                .where('numero_rg', numero_rg);

            //buscando o id RG
            let id_rg = 0;
            for (let i = 0; i < consult_id_rg.length; i++) {
                if (consult_id_rg[i].numero_rg == numero_rg) {
                    const consulta_parte2_rg = consult_id_rg[i].id_rg
                    id_rg = consulta_parte2_rg;
                }
            }



            //  insert table endereco
            await knex('endereco').insert({
                cep, estado, cidade, bairro, quadra, numero_endereco, complemento
            });

            // insert tabela telefone
            await knex('telefone').insert({
                id_tipo_telefone, ddd, ddi, numero_telefone
            });


            // pegando id do login
            let consult_id_login = await knex.select('id_login', 'email')
                .from('login')
                .where('email', email);

            // buscando o ID ENDERECO
            let consult_id_endereco = await knex
                .from('endereco')
                .where({
                    cep: cep,
                    numero_endereco: numero_endereco
                })
                .select('id_endereco', 'cep', 'numero_endereco');

            //buscando o ID do telefone
            let buscar_id_telefone = await knex
                .select('id_telefone', 'numero_telefone')
                .from('telefone')
                .where('numero_telefone', numero_telefone);





            // inser tabela pessoa
            for (let i = 0; i < consult_id_login.length; i++) {
                if (consult_id_login[i].email === email) {
                    const consulta_parte2_login = consult_id_login[i].id_login
                    const login = consulta_parte2_login;
                    await knex('pessoa').insert({
                        cpf, login, nome,
                        nome_social, id_rg,
                        naturalidade, nascimento, sexo,
                        situacao
                    });

                }
            }
            //inserir tabela telefone_pessoa

            for (let i = 0; i < buscar_id_telefone.length; i++) {
                if (buscar_id_telefone[i].numero_telefone === numero_telefone) {
                    const consulta_parte2_telefone = buscar_id_telefone[i].id_telefone;
                    const id_telefone = consulta_parte2_telefone
                    await knex('telefone_pessoa').insert({
                        cpf, id_telefone
                    });

                }
            }



            for (let i = 0; i < consult_id_endereco.length; i++) {
                if (consult_id_endereco[i].cep === cep && consult_id_endereco[i].numero_endereco === numero_endereco) {
                    const consulta_pt2_id_endereco = consult_id_endereco[i].id_endereco;
                    const id_endereco = consulta_pt2_id_endereco;
                    await knex('endereco_pessoa').insert({
                        cpf, id_endereco
                    });
                }
            }



            // PROFESSOR
            if (id_tipo_login == 2) {
                const {
                    especializacao,
                    grau_formacao
                } = req.body

                let cpf_professor = cpf;
                // insert tabela professor
                await knex('professor').insert({
                    cpf_professor, especializacao, grau_formacao
                })
                return res.status(201).send();
            }
            else if(tipo_login == 3){
                const {
                    estado_civil,
                    raca,
                    filhos,
                    moradia,
                    escolaridade,
                    situacao_economica,
                    ocupacao,
                    aposentado,
                    ultima_profissao,
                    renda, 
                    adm
                }
            }
        
            return res.status(201).send();
        } catch (error) {
            next(error)
        }


    }
}