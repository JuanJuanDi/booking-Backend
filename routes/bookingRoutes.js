const express = require('express');
const router  = express.Router();
const bookingController = require('../controllers/bookingController');

//Definir la ruta para reservar la habitacion
router.post('/book', bookingController.bookRoom);

module.exports = router;