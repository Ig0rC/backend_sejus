const knex = require('../../database/index');


module.exports = { 
    async CriarCoodernador(req, res, next){

        try {
            const { idcpf, idcurso } = req.params;
        
                await 
                    knex('coordena')
                        .insert({
                            cpf_professor: idcpf,
                            id_curso: idcurso
                        })
                 res.status(201).send();                    
        } catch (error) {
            next(error);
        }   
          
    },
    async buscaCoordenadores(req, res, next){
        try {
            const result = await 
                knex
                    .select('curso.*', 'pessoa.nome', 'professor.cpf_professor')
                        .from('coordena')
                            .join( 
                            'professor','professor.cpf_professor', 
                            '=',
                            'coordena.cpf_professor',
                            )
                            .join(
                            'pessoa', 'pessoa.cpf', 
                            '=', 
                            'professor.cpf_professor')
                            .join
                            (
                             'curso', 'curso.id_curso',
                             '=',
                             'coordena.id_curso'
                            )
            
            res.json(result)
        } catch (error) {
            next(error);
        }
    }, 
    async selecionarCoordenadores(req, res, next){
        try {
            const { idcpf, idcurso } = req.params;

            const result = await 
                knex
                    .select('curso.*', 'pessoa.nome', 'professor.cpf')
                    .where('coordena.cpf_professor', idcpf)
                        .from('coordena')
                            .join( 
                            'professor','professor.cpf_professor', 
                            '=',
                            'coordena.cpf_professor',
                            )
                            .join(
                            'pessoa', 'pessoa.cpf', 
                            '=', 
                            'professor.cpf_professor')
                            .join
                            (
                             'curso', 'curso.id_curso',
                             '=',
                             'coordena.id_curso'
                            )
                            .where
                            ('coordena.id_curso', idcurso);
            
            res.json(result)
        } catch (error) {
            next(error);
        }
    },
    async AtualizarCoordenadores(req, res, next){
        try {
            const { idcpf, idcurso, newcpf, newcurso } = req.params;
         
        await knex('coordena')
                .where({
                    cpf_professor: idcpf,
                    id_curso: idcurso
                })
                .update({
                    cpf_professor: newcpf,
                    id_curso: newcurso
                })

                res.status(201).send();
        } catch (error) {
            next(error)
        }
    },
    async DeletarCoordenador(req, res, next){
        try {
            const { idcpf, idcurso} = req.params;
         
            await knex('coordena')
                    .where({
                        cpf_professor: idcpf,
                        id_curso: idcurso
                    })
                    .del()
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }
    

}