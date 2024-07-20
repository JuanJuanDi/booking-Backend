const Room = require('../models/Room');
const eventEmitter = require ('../events/eventEmitter');

// Controlador para gestionar la reserva de una habitacion
exports.bookRoom = async (req, res) => {
    const { roomNumber } = req.body;  //Obtener el numero de habitacions de la solicitud
}

try {
    // Buscar la habitacion por su numero
    const room = await Room.findOne({ number: roomNumber});

    // Si la habitacion no existe, devolver un error 404
    if(!room){
        return res.status(404).json({message: 'Room not found'});
    }

    // Si la habitacion ya esta reservada, devolver un error 409
    if(!room.available){
        return res.status(409).json({message: 'Room is already booked'});
    }

    const originalVersion = room.version; // Guardar la version original de la habitacion
    room.available = false;               // Marcar la habitacion como no disponible
    room.version += 1;                    // Incrementar la version para le bloque optimista
    const updateRoom = await room.save(); // Guardar los cambios

    // Verificar que las version se haya incrementado correctamente
    if (updateRoom.version !== originalVersion + 1){
        throw new Error ('Concurrency conflict');
    }

    // Despachar evento de reserva exitoso
    eventEmitter.emit('BookingConfirmed', {room: updateRoom});

    // Responder con exito y la informacion de la habitacion
    res.status(200).json({message: 'Room booked susccessfully', room:updateRoom});
} catch (error){

    //Manejo de errores y respuesta con mensaje
    res.status(500).json({message: 'Booking failed', error: error.message});
};

