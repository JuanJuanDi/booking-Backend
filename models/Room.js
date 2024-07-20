const mongoose = require('mongoose');

//Definicion del esquema de la habitacion del hotel
const roomSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true}, //Numero de habitacion(unico y requerido)
    availeble: {type: Boolean, default: true}, // Indica si la habitacion esta disponible
    version: {type: Number, default: 0}
},{timestamps:true}); // Agrega campos createdAt y updateAt automaticamente

// Exportar el modelo Room para su uso en otras partes de la aplicacion
module.exports = mongoose.model('Room', rooomSchema);