const express = require('express')
const Horario = express.Router();

const HorarioController = require('../../controllers/HorarioController/HorarioController');


Horario.post('/cargahoraria', HorarioController.criarHorario);
Horario.get('/searchHorario', HorarioController.searchHorario);



module.exports = Horario;
