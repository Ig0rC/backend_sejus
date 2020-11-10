const express = require('express');
const CoordenaController = require('../../controllers/CoordenaController/CoordenaController');
const CoodernaRoutes = express.Router();




CoodernaRoutes.post('/cooderna/:idcpf/:idcurso', CoordenaController.CriarCoodernador);
CoodernaRoutes.get('/cooderna', CoordenaController.buscaCoordenadores);
CoodernaRoutes.get('/cooderna/:idcpf/:idcurso', CoordenaController.selecionarCoordenadores);
CoodernaRoutes.put('/cooderna/:idcpf/:idcurso/:newcpf/:newcurso', CoordenaController.AtualizarCoordenadores);
CoodernaRoutes.delete('/cooderna/:idcpf/:idcurso', CoordenaController.DeletarCoordenador);



module.exports = CoodernaRoutes;