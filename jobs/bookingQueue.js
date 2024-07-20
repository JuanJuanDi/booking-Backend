const Queue = require('bull');
const nodemailer = require('nodemailer')
require('dotenv').config(); //para cargar las variables de entorno desde una rchivo .env

const bookingQueue = new Queue('bookingQueue'); 

//Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // auth:{ user: 'Admin@gmail.com', pass: 'AdminPasword'}
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//definir el procesamiento de los trabajos en la cola
bookingQueue.process(async(job) => {
    const { room } = job.data;

    try{

      //enviar corre de confirmacion
      const mailOptions = {
        // from: 'Admin@gmail.com',
        from: process.env.EMAIL_USER,
        to: 'customer@gmail.com',
        subject: 'Confirmacion de reserva',
        text: `Tu reserva para la habitacion numero ${room.number} ha sido confirmada. Gracias`
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Confirmation email set for room:', room.number);
    } catch (error){
        console.error('Error sending confirmation email:', room.number);
    }

    console.log('Processing booking for room:', room.number)
});

module.exports = bookingQueue;

