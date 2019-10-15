const express = require('express');
const router = express.Router();

const initialCtrl = require('../controllers/initialController'); // Importar el controlador de la ruta initial

// Los archivos de routes nos funcionará como un API REST que nos facilitará la conexión entre el frontend y el backend

router.get('/', initialCtrl.getData);
router.post('/', initialCtrl.insertData);
router.get('/:phone', initialCtrl.getMatchingPhone);
// router.put('/:phone', initialCtrl.editDataOfMatchingPhone);
router.delete('/:phone', initialCtrl.deleteDataOfMatchingPhone)

module.exports = router; 