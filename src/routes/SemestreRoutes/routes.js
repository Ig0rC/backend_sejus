const express = require('express');
const SemestreRoutes = express.Router();

const SemestreController = require('../../controllers/SemestreController/SemestreController')

SemestreRoutes.post('/semestre', SemestreController.CriarSemestre);
SemestreRoutes.get('/semestre/:semestre' , SemestreController.SelecionaSemestre);
SemestreRoutes.put('/semestre/:idsemestre/:idano' , SemestreController.AtualizarSemestre);
SemestreRoutes.get('/semestre', SemestreController.BuscarSemestreAll)





SemestreRoutes.delete('/semestre/:semestre/:ano' , SemestreController.DeletaSemestre);





module.exports = SemestreRoutes;