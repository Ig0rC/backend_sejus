const knex = require('../../database/index');


module.exports = {
    async criarTurma(req, res, next){
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
 
            const {
                nome_turma, 
                data_ingresso
            } = req.body

            const validation_class_year = await knex
                .select('nome_turma', 'data_ingresso')
                .from('turma')
                .where({
                    nome_turma: nome_turma,
                    data_ingresso: data_ingresso
                });

            if(validation_class_year.length == 0){
                await knex('turma').insert({
                    nome_turma,
                    data_ingresso,
                    situacao_turma: "fechado"
                })
                res.status(201).send();

            }else{
                next(error);
            }
           
        } catch (error) {
            next(error)
        }

    },
    async buscarTurmas(req, res, next){
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
                console.log('entrei')

                next(error);
            }
            const { page = 1  } = req.params;

            const result = await knex  
                .select('turma.id_turma','turma.nome_turma', 'turma.data_ingresso')
                .from('turma')
                .limit(5)
                .offset((page - 1) * 5)

            const [count] = 
                await knex('turma')
                    .from('turma')
                    .count();
            
                res.header('count', count["count"]);


            return res.json(result)
        } catch (error) {
            next(error)            
        }
    },
    async selecionaTurma(req, res, next){
        try {
            console.log('ok')
            const { id } =req.params;
            const id_turma = id
            const result = await knex  
                .select('turma.*')
                .from('turma')
                .where('id_turma', id_turma);
            
                return res.json(result);
        } catch (error) {
            return next(error);
        }
    },
    async AtualizarTurmas(req,res,next){
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
            const { nome_turma, data_ingresso} = req.body;
            const id_turma = id; 
            await knex('turma')
                .where('id_turma' , '=', id_turma)
                .update({
                    nome_turma: nome_turma, 
                    data_ingresso: data_ingresso,
                });
            
            return res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async deleteTurma(req, res, next){
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

            const validarPertence = 
                await 
                    knex('pertence')
                        .where({
                            id_turma: id
                        });
            console.log(validarPertence)
            if(validarPertence.length === 0 ){
                return res.status(401).send('Existem Instituição com essa turma');
            }

            await knex('turma')
                .where('id_turma', '=', id)
                .del();

                res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async listaAlunosTurmas(req, res, next){
        try {
            const { id } = req.params;

            const result =  await knex
                .select(
                    'turma.nome_turma', 'pessoa.nome', 'aluno.cpf_aluno', 'telefone.*', 'login.email'
                    )
                    .from('turma')
                        .join('participa', 'participa.id_turma', '=', 'turma.id_turma')
                        .join('aluno', 'aluno.cpf_aluno','=',  'participa.cpf_aluno', )
                        .join('pessoa', 'pessoa.cpf','=', 'aluno.cpf_aluno',  )
                        .join('login', 'login.id_login', '=', 'pessoa.login')
                        .join('telefone_pessoa', 'telefone_pessoa.cpf', '=', 'pessoa.cpf')
                        .join('telefone', 'telefone.id_telefone', '=', 'telefone_pessoa.id_telefone')
                        .where('turma.id_turma', id);
                
            return res.json(result);


        } catch (error) { 
            next(error)
        }
    },
    async buscarTurmasNoPaginacao(req, res, next){
        try{
            const result = await knex('turma')

            return res.json(result);
        }catch (error){
            next(error)
        }
    },
    
    
   
} 