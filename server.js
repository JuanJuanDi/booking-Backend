const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes')
require('dotenv').config(); //Funcion correcta de las variables de entorno
require('./events/bookingHandlers'); // Asegura que los eventos se carguen

const app = express(); // Crear una intancia de la aplicacion express

//Conectar a la base de datos MongoDB
mongoose.connect('link mongodb', {useNewUrlParser: true, useUnifiedToplogy: true});

app.use(bodyParser.json()); //analizar json
app.use('/api', bookingRoutes); // Usar rutas para las reservas

const PORT = process.env.PORT || 3000; //puerto de la aplicacion
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); //Iniciar el servidor en el puerto definido
})