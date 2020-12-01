const knex = require('../../database/index');
const instituicaoRoutes = require('../../routes/InstituicaoRoutes/routes');


module.exports = {
    async BuscarCursosVinculadoInstituicao(req, res, next){
        try {
            const { id_instituicao } = req.params
            const response = 
                await knex
                    .select('curso.nome_curso', 'curso.id_curso', 'instituicao_curso.situacao_curso_instituicao')
                        .where(
                            'instituicao.id_instituicao', id_instituicao
                        )
                        .from('instituicao')
                            .join
                            (
                                'instituicao_curso', 'instituicao_curso.id_instituicao'
                                    ,'=',
                                'instituicao.id_instituicao'
                            )
                            .join
                            (
                                'curso', 'curso.id_curso'
                                 ,'=',
                                'instituicao_curso.id_curso'
                            )        
            res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async buscarTurmas (req, res, next){
      try {
        const responseTurmas =
            await knex('turma')

        res.json(responseTurmas)
    } catch (error) {
          next(error)
      }
    },
    async CadastrarTurmaInstituicaoCurso(req, res, next){
        console.log('entrei ORR')
        try {
            const { idTurma, idInstituicao, idCurso, turno} = req.params;

            const response = 
                await knex('pertence')
                    .where({
                        id_turma: idTurma
                    });
            if(response.length > 0){
                return  res.status(201).send('Esta Turma Já Pertence a uma instituição')
            }

            await knex('pertence').insert({
                id_turma: idTurma,
                id_instituicao: idInstituicao,
                id_curso: idCurso, 
                turno: turno
            });

            res.status(201).send('Vinculado')
        } catch (error) {
            next(error)
        }
    },
    async BuscarTurmaDaInstituicaoCurso (req, res, next){
        try {
            const { idInstituicao } = req.params
            const response =
                await knex
                    .select
                        (
                        'turma.id_turma', 'turma.nome_turma', 
                        'pertence.turno', 
                        'curso.nome_curso', 'curso.id_curso'
                        )
                        .from('instituicao')
                            .join
                            (
                                'pertence', 'pertence.id_instituicao'
                                    ,'=',
                                'instituicao.id_instituicao'
                            )
                            .join
                            (
                                'curso', 'curso.id_curso'
                                    ,'=',
                                'pertence.id_curso'
                            )
                            .join
                            (
                                'turma', 'turma.id_turma',
                                    '=',
                                'pertence.id_turma'
                            )
                            .where('instituicao.id_instituicao', idInstituicao)
            return res.json(response)
        } catch (error) {
            next(error)
        }
    },
    async ExcluirTurmaDaInstituicaoCurso (req, res, next){
        try {
            const {idTurma, idInstituicao, idCurso} = req.params;
                await knex('pertence')
                        .where({
                            id_curso: idCurso,
                            id_instituicao: idInstituicao,
                            id_turma: idTurma
                        })
                        .del();
            return res.status(201).send('Excluido');
        } catch (error) {
            next(error)
        }
    },
    async BuscarCursosApenasAtivosInstituicao (req, res, next){
        try {
            const { idInstituicao } = req.params
            const response = 
                await knex
                    .select('curso.nome_curso', 'curso.id_curso', 'instituicao_curso.situacao_curso_instituicao')
                        .where(
                            'instituicao.id_instituicao', idInstituicao
                        )
                        .from('instituicao')
                            .join
                            (
                                'instituicao_curso', 'instituicao_curso.id_instituicao'
                                    ,'=',
                                'instituicao.id_instituicao'
                            )
                            .join
                            (
                                'curso', 'curso.id_curso'
                                 ,'=',
                                'instituicao_curso.id_curso'
                            ) 
                            .where('instituicao_curso.situacao_curso_instituicao', 'Ativo')       
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

}