const express = require('express');


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



const app = express();


app.use(express.json());

app.use(
        InstituicaoRotues, 
        DisciplinaRoutes,
        HorariaRoutes,
        CadastroRoutes,
        CursoRoutes,
        TurmaRoutes,
        DisciplinaCursoRoutes,
        ConnectionTurmaCursoRoutes,
        ConnectionTurmaAlunoRoutes
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