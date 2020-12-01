const knex = require('../../database/index');



module.exports = {
   
    async CriarInstituicao(req, res, next) {
        
        try {
      
            const cpf  = req.auth;
            console.log(cpf)
            const validation =  
                    await 
                    knex
                    .select('pessoa.cpf')
                    .from('pessoa')
                    .andWhere('pessoa.situacao', true)
                    .andWhere('pessoa.cpf', cpf)       

            if(validation.length === 0){

                next(error);
            }
 
            const {
                id_tipo_telefone,
                ddd,
                numero_telefone,
                nome_instituicao,
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
            // validacao de instituicao;
            const busca_validation_duplicate = await knex
                .select('instituicao')
                .from('instituicao')
                .where('nome_instituicao', 'ilike', '%' + nome_instituicao + '%')
                .andWhere('responsavel', 'ilike', '%' + responsavel + '%')
                .andWhere('unidade', 'ilike', '%' + unidade + '%')
                .andWhere('email', 'ilike', '%' + email + '%');
       
            console.log(busca_validation_duplicate)
            let cachevalidation;

            for (let i = 0; busca_validation_duplicate.length; i++) {
                cachevalidation = busca_validation_duplicate[i].id_instituicao
                console.log(cachevalidation);
            }
            console.log(cachevalidation);

            if (cachevalidation === undefined) {
                const ddi = +55

                // insert tabela telefone
                await knex('telefone').insert({
                    id_tipo_telefone, ddd, ddi, numero_telefone
                });
                // insert table instituicao
                await knex('instituicao').insert({
                    nome_instituicao, responsavel, unidade, email
                });
                // insert table endereco
                await knex('endereco').insert({
                    cep, estado, cidade, bairro, quadra, numero_endereco, complemento
                })

                 let i = 0;
           
                    const busca_id_instituicao_cadastro = await knex
                        .select('id_instituicao')
                        .from('instituicao')
                        .where({
                            nome_instituicao: nome_instituicao,
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

                    const id_endereco = busca_id_endereco_instituicao[0].id_endereco;
                    const id_telefone = busca_id_instituicao_telefone[0].id_telefone;
                    const id_instituicao = busca_id_instituicao_cadastro[i].id_instituicao;
 


                    await knex('telefone_instituicao').insert({
                        id_instituicao, id_telefone
                    });
                    await knex('endereco_instituicao').insert({
                        id_instituicao, id_endereco
                    })
                    return res.status(201).send();
                }
            

            next(error);

        } catch (error) {
            next(error)

        }
    },
    async BuscarInstituicoes(req, res, next) {
        try {
             const authorization  = req.auth;
             const validation =  
                    await 
                    knex
                    .select('administrador.cpf_administrador')
                    .from('administrador')
                    .join('pessoa', 'pessoa.cpf', '=', 'administrador.cpf_administrador')
                    .where('pessoa.situacao', true)
                    .where('pessoa.cpf', authorization)             


            if(!validation){
                next(error);
            }
        
           
            const { id_instituicao,  page  } = req.params;

            const query = knex('instituicao')
                .limit(5)
                .offset((page - 1) * 5);
            //count
            const countObject = knex('instituicao').count()

            if (id_instituicao) {
                query
                    .where({ id_instituicao })

                countObject.where({ id_instituicao })

            }
            const [count] = await countObject;
            
            res.header('count', count["count"]);

            
            const results = await query;

            return res.json(results);
        } catch (error) {
            next(error)
        }
    },
    async deleteInstituicao(req, res, next) {

        try {
            const { id } = req.params;
           
            const id_instituicao = id;

            await knex('endereco_instituicao')
                .where({ id_instituicao })
                .del();

            await knex('telefone_instituicao')
                .where({ id_instituicao })
                .del()

            await knex('instituicao')
                .where({ id_instituicao })
                .del();

            return res.status(201).send('foi deletado')
        } catch (error) {
            next(error);
        }
    },
    async selecionaInstituicao(req, res, next){
       
        try {
            const { id } = req.params;

           
   
            const selecionarInst = await knex('instituicao')
                .where('instituicao.id_instituicao', id)
                .join('endereco_instituicao', 'endereco_instituicao.id_instituicao', '=', 'instituicao.id_instituicao')
                .join ('telefone_instituicao',  'telefone_instituicao.id_instituicao', '=','instituicao.id_instituicao')
                .join ('telefone',  'telefone.id_telefone', '=','telefone_instituicao.id_telefone')
                .join('tipo_telefone', 'tipo_telefone.id_tipo_telefone', '=', 'telefone.id_tipo_telefone')
                .join('endereco', 'endereco.id_endereco', '=', 'endereco_instituicao.id_endereco')
                .select('instituicao.*', 'endereco.*', 'telefone.*', 'tipo_telefone.nome_tipo_telefone')

                return res.json(selecionarInst)
        } catch (error) {
            next(error)
        }

    },
    async UpdateInstituicao(req, res, next){

        try {
            const authorization  = req.auth;
            const validation =  
                    await 
                    knex
                    .select('administrador.cpf_administrador')
                    .from('administrador')
                    .where('administrador.cpf_administrador', authorization)             
                    .join('pessoa', 'pessoa.cpf', '=', 'administrador.cpf_administrador')
                    .where('pessoa.situacao', true)

            if(validation.length === 0){
                next(error);
            }
 
            const { id } = req.params;
            const { nome, responsavel, unidade, email} = req.body;
    
            
    
            await knex('instituicao')
                .where('id_instituicao', id)
                .update({
                    nome: nome,
                    responsavel: responsavel,
                    unidade: unidade,
                    email: email
                });

            return res.status(201).send();
        } catch (error) {
            next(error);
        }
      
    },
    async IncluirCursoNaInstituicao(req, res, next){
        try {
            const { idCurso, idInstituicao, situacao_curso_instituicao } = req.body;

            await knex('instituicao_curso').insert({
                id_instituicao: idInstituicao,
                id_curso: idCurso,
                situacao_curso_instituicao: situacao_curso_instituicao
            })

            return res.status(201).send('ok')
        } catch (error) {
            next(error)
        }
    },
    async PerfilInstituicaoCursos(req, res, next){
        try {
            const { id_instituicao } = req.params
            const response = await 
                knex.select('curso.*', 'instituicao_curso.situacao_curso_instituicao')
                        .from('instituicao')
                        .join('instituicao_curso', 'instituicao_curso.id_instituicao', '=', 'instituicao.id_instituicao')
                        .join('curso', 'curso.id_curso', '=', 'instituicao_curso.id_curso')
                        .where(
                            'instituicao.id_instituicao', id_instituicao
                        )
                
              return  res.json(response)
        } catch (error) {
            next(error)
        }
    }, 
    async ExcluirInstituicaoCursos(req, res, next){
        try {
            const {id_instituicao, id_curso } = req.params;
            await knex('instituicao_curso')
                        .where({
                            id_instituicao:id_instituicao,
                            id_curso: id_curso
                        }).del();
            return res.status(201).send();
        } catch (error) {   
            next(eror)
        }
    },
    async DesativarCursoInstituicao(req,res,next){
        try {
            const { id_instituicao, id_curso, situacao } = req.params;
            await knex('instituicao_curso')
                    .where({
                        id_instituicao: id_instituicao,
                        id_curso: id_curso
                    })
                    .update({
                        situacao_curso_instituicao: situacao
                    })
                res.status(201).send('sucesso')
        } catch (error) {
            next(error)   
        }
    },
    async BuscarCursospInstituicao(req, res, next){
        try {
            const response = await knex('curso');

            return res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async PesquisaInstituicao (req, res, next){
        try {
            const { pesqInsti } = req.body;
          

            res.json(response)
        } catch (error) {
            next(error)
        }
    }
}