const eventEmitter = require('./eventEmitter');
const boolingQueue = require('../jobs/bookingQueue');

//Definir el manejador para el evento 'bookingConfirmed'
eventEmitter.on('bookingConfirmed', (data) =>{
    bookingQueue.add({ room:DataTransfer.room }); //Añadir un trabajo a la cola cuando se confirme una reserva
});