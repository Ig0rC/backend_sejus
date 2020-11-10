const knex = require('../../database/index');




module.exports = {
    async cadastrar(req, res, next) {

        try {
            console.log('disciplina')
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
                nome_tipo_login,
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

            //verificação de tipo de login 
            
            
            
            const validation_login = await knex
                .select('id_tipo_login','nome_tipo_login')
                .from('tipo_login')
                .where('nome_tipo_login', 'ILIKE', `%${nome_tipo_login}%` );
            
               
          
            if(validation_login.length == 0){
                return next(error)
            }
            let result_validation_login_nome;
            let id_tipo_login;
            for(let i = 0;  i < validation_login.length; i++){
                result_validation_login_nome = validation_login[i].nome_tipo_login;
                id_tipo_login = validation_login[i].id_tipo_login;
            }
        

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
            if ( result_validation_login_nome == 'PROFESSOR') {
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
            //aluno
            else if (result_validation_login_nome == 'ALUNO') {
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
                    adm_financeira,
                    locomacao,
                    prog_social,
                    atendimento,
                    descricao_perfil,
                    experiencia_profissional,
                    conhecimento_curso,
                    autonomia,
                    acessibilidade, 
                    patologia,
                    nome_SOS,
                    numero_SOS,
                    ddd_SOS,
                    tipo_telefone_sos,
                    dado_acessibilidade,
                    dado_autonomia,
                    dado_patologia
        
                } = req.body

                const cpf_aluno = cpf;                // ACESSIBILIDADE
                const numero_telefone = numero_SOS;
                const ddi = '015';
                const ddd = ddd_SOS;
                const id_tipo_telefone = tipo_telefone_sos;
                const nome = nome_SOS;
                
        
                //insert table telefone for emergencial
                await knex('telefone').insert({
                    id_tipo_telefone, ddd, ddi, numero_telefone,
                });

                // PARTE 2: search id for table telefone
                const busca_id_contato_sos = await knex
                    .select('id_telefone', 'numero_telefone')
                    .from('telefone')
                    .where(
                        {
                            numero_telefone: numero_telefone,
                            id_tipo_telefone: id_tipo_telefone,
                            ddd: ddd
                        }
                    );

                let id_contato; //salva meu id
                //parte 3: search id for table telefone
                for (let i = 0; i < busca_id_contato_sos.length; i++) {
                    if (numero_telefone == busca_id_contato_sos[i].numero_telefone) {
                        const id_telefone = busca_id_contato_sos[i].id_telefone;
                            id_contato = id_telefone;
                                await knex('contato_emergencial').insert({
                                    nome, id_telefone
                                })
                                console.log("ze ruela")
                    }
                }

                // ACESSIBILIDADE, PATOLOGIA E OUTROS
                let id_acessibilidade;
                if(acessibilidade == 0){
                    const outros = true;
                    await knex('acessibilidade').insert({
                        dado_acessibilidade, outros
                    })
                        const busca_id_acessibilidade = await knex
                                .select('id_acessibilidade', 'dado_acessibilidade', 'outros')
                                .from('acessibilidade')
                                .where({
                                    dado_acessibilidade: dado_acessibilidade,
                                    outros: outros
                        })
                        console.log('porra')
                    for(let i = 0; i < busca_id_acessibilidade.length; i++){
                        id_acessibilidade = busca_id_acessibilidade[i].id_acessibilidade;
                        console.log(id_acessibilidade);
                    }
                }else{
                 id_acessibilidade = acessibilidade;   
                }
            
                // TABELA AUTONOMIA INSERT CASO FOR OUTROS
                let id_autonomia;
                if(autonomia == 0){
                    const outros = true;
                    await knex('autonomia').insert({
                        dado_autonomia, outros
                    });
                    const busca_id_autonomia = await knex
                        .select('id_autonomia', 'dado_autonomia', 'outros')
                        .from('autonomia')
                        .where({
                            dado_autonomia: dado_autonomia,
                            outros: outros
                        })
                    for(let i = 0; i < busca_id_autonomia.length; i++){
                        id_autonomia = busca_id_autonomia[i].id_autonomia;
                    }
                }else{
                    id_autonomia = autonomia
                }


                // INSERT TABELA PATOLOGIA CASO OPÇÃO OUTROS FOR SELECIONADO
                let id_patologia;

                if(patologia == 0){
                    const outros = true;
                    await knex('patologia').insert({
                        dado_patologia, outros
                    })
                    const busca_id_patologia = await knex
                        .select('id_patologia', 'dado_patologia', 'outros')
                        .from('patologia')
                        .where({
                            dado_patologia: dado_patologia,
                            outros: outros
                    });
                    for(let i = 0; i < busca_id_patologia.length; i++){
                        id_patologia = busca_id_patologia[i].id_patologia;
                    }
                }else{
                    id_patologia = patologia;
                }

                //PARTE 4: search id for table telefone
                const busca_id_telefone_SOS = await knex
                    .select('id_contato_emergencial', 'id_telefone')
                    .from('contato_emergencial')
                    .where('id_telefone', id_contato);
                
                //PARTE 5: insert table aluno
                console.log(busca_id_telefone_SOS)
                for (let i = 0; i < busca_id_telefone_SOS.length; i++) {
                        id_contato_emergencial = busca_id_telefone_SOS[i].id_contato_emergencial;
                        await knex('aluno').insert({
                            cpf_aluno, estado_civil, raca,
                            filhos, moradia, escolaridade,
                            situacao_economica, ocupacao, aposentado,
                            ultima_profissao, renda, adm_financeira,
                            locomacao, prog_social, atendimento,
                            descricao_perfil, experiencia_profissional,
                            conhecimento_curso, id_contato_emergencial
                        });  
                        console.log('vai brasil')
                }


                await knex('saude_aluno').insert({
                    cpf_aluno, id_acessibilidade , id_patologia , id_autonomia 
                });
                
                console.log('contato')

                return res.status(201).send();
            }
            else if(result_validation_login_nome == 'ADM'){
               const cpf_administrador  = cpf;
               const permissao = false;

             
                await knex('administrador').insert({
                    cpf_administrador, permissao
                });
                       
                await knex('cadastro_administrador').insert({
                    cpf_administrador
                })
            return res.status(201).send();

            }
            

          next(error)
        } catch (error) {
            next(error)
        }


    }
}