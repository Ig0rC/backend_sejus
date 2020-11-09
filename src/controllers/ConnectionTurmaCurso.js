const knex = require('../database/index');

module.exports = {
    async CadastrarTurmaCurso (req, res, next){
        try {
            const { turma, curso } = req.params;
            const { turno } = req.body;
            const id_curso = curso;
            const id_turma = turma;
                await knex('pertence').insert({
                    id_curso: id_curso,
                    id_turma: id_turma,
                    turno
                })
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }, 
    async DeletaTurmaCurso(req, res, next){
        try {
            const { turma, curso } = req.params;
            const id_curso = curso;
            const id_turma = turma;
                await knex('pertence')
                        .where({
                            id_curso: id_curso,
                            id_turma: id_turma 
                        }).del();

            res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async AtualizarTurmaCurso(req, res, next){
        try {
            const { id } = req.params;
            const { id_turma, id_curso, turno } = req.body;
                await knex('pertence')
                        .where('id_turma', id)
                            .update({
                                id_turma: id_turma,
                                id_curso: id_curso,
                                turno: turno
                            })
                return res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async BuscarTurmasCursos(req, res, next){
        try {
                const result = await knex
                        .select('turma.*', 'curso.*')
                            .from('pertence')
                                .join('turma','turma.id_turma','=','pertence.id_turma')
                                    .join('curso', 'curso.id_curso', '=', 'pertence.id_curso')
                                      
                        

                  return res.json(result);
                     

        } catch (error) {
            next(error);
        }
    }, 
    async selecionaTurmaCursos(req, res, next){
        try {
            const { idc, idt} = req.params;
            console.log('certo')
            const resultado = await knex
                .select('turma.*', 'curso.*')        
                    .where('pertence.id_curso', idc)
                        .from('pertence')
                            .join('turma','turma.id_turma','=','pertence.id_turma')
                                .join('curso', 'curso.id_curso', '=', 'pertence.id_curso')
                                    .where('pertence.id_turma', idt)
                            

            
            
            return res.json(resultado);
        } catch (error) {
            next(error)
        }

    }
    
}