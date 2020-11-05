const express = require('express');
const routes = require('./routes');

const app = express();


app.use(express.json());
app.use(routes);


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