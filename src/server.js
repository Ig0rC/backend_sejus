const express = require('express');
const cors = require('cors');


//routes
const InstituicaoRotues = require('./routes/InstituicaoRoutes/routes');
const DisciplinaRoutes = require('./routes/DisciplinaRoutes/routes');
const HorariaRoutes = require('./routes/HorarioRoutes/routes');
const CadastroRoutes = require('./routes/CadastroRoutes/routes');
const CursoRoutes = require('./routes/CursoRoutes/routes');
const TurmaRoutes = require('./routes/TurmaRoutes/routes');
const DisciplinaCursoRoutes = require('./routes/ConnectionDisciplinaCursoRoutes/routes');
const ConnectionTurmaCursoRoutes = require('./routes/ConnectionTurmaCursoRoutes/routes');
const ConnectionTurmaAlunoRoutes = require('./routes/ConnectionTurmaAlunoRoutes/routes');
const SemestreRoutes = require('./routes/SemestreRoutes/routes');
const CoodernaRoutes = require('./routes/CoodernaRoutes/routes');
const ProfessorRoutes = require('./routes/ProfessorRoutes/routes');
const LecionaRoutes = require('./routes/LecionaRotues/LecionaRoutes');
const AuthRoutes = require('./routes/Authroutes/routes');
const PessoasRoutes = require('./routes/PessoaController/routes');
const AdministradorRoutes = require('./routes/AdministradorRoutes/routes');
const AlunosRoutes = require('./routes/AlunosRoutes/routes');
const CursoInstituicoes = require('./routes/ConnectionInstituicaoCursoRoutes/routes');
const AvaliaRoutes = require('./routes/AvaliaRoutes/routes')

const app = express();

const corsOptions = {
    exposedHeaders: 'count',
   
  };

app.use(cors(corsOptions));

app.use(express.json());

app.use
(
        InstituicaoRotues, 
        DisciplinaRoutes,
        HorariaRoutes,
        CadastroRoutes,
        CursoRoutes,
        TurmaRoutes,
        DisciplinaCursoRoutes,
        ConnectionTurmaCursoRoutes,
        ConnectionTurmaAlunoRoutes,
        SemestreRoutes,
        CoodernaRoutes,
        ProfessorRoutes,
        LecionaRoutes,
        AuthRoutes,
        PessoasRoutes,
        AdministradorRoutes,
        AlunosRoutes,
        CursoInstituicoes,
        AvaliaRoutes
);



//tratamento de error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
})

//catall
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message});
})


//iniciando o serve na porta 3333
app.listen(3333, () => console.log('Server is running'));