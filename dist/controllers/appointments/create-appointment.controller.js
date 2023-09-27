"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentHandler = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
// import { enviarMensajeWhatsApp } from "../../libs/enviarMensajeWhatsApp"; mensajes de WhatsApp
const createAppointmentHandler = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            ...response,
            message: "Por favor enviar un cuerpo en la solicitud.",
        });
    }
    try {
        const { doctor_id, paciente_id, fecha_inicio, fecha_final, estado_id = 1, // Estado por defecto
        google_calendar_event_id, ubicacion, descripcion, notas, mensaje_confirmacion, recordatorio1, recordatorio2, agradecimiento, } = req.body;
        // Validación
        if (!doctor_id || !paciente_id || !fecha_inicio || !fecha_final) {
            response.message = "Datos de cita incompletos.";
            return res.status(400).json(response);
        }
        // Crear cita
        const result = await pool.query(`
  INSERT INTO tbl_citas (
    fecha_creacion,
    doctor_id,
    paciente_id,
    fecha_inicio,
    fecha_final,
    estado_id,
    google_calendar_event_id,
    ubicacion,
    descripcion,
    notas
  )
  VALUES (
    CURRENT_TIMESTAMP,
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9
  )
  RETURNING id
  `, [
            doctor_id,
            paciente_id,
            fecha_inicio,
            fecha_final,
            estado_id,
            google_calendar_event_id,
            ubicacion,
            descripcion,
            notas,
        ]);
        const citaId = result.rows[0].id;
        // const programarMensaje = (mensaje, fecha) => {
        //   cron.schedule(fecha.toISOString(), () => {
        //     enviarMensajeWhatsApp(mensaje);
        //   });
        // };
        // Enviar inmediatamente después de crear la cita
        // programarMensaje(mensajes.confirmacion, new Date());
        // programarMensaje(mensajes.recordatorio1, recordatorio1);
        // programarMensaje(mensajes.recordatorio2, recordatorio2);
        // programarMensaje(mensajes.agradecimiento, agradecimiento);
        return res.status(201).json({
            ...response,
            message: "Cita creada y mensajes programados con éxito.",
            succeded: true,
            data: { id: citaId },
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al crear la cita y/o programar los mensajes.",
            errors: [error],
        });
    }
};
exports.createAppointmentHandler = createAppointmentHandler;
// const accountSid = "ACc03973b5dafbe4fa4a8c976b0b532707";
// const authToken = "[AuthToken]";
// const client = require("twilio")(accountSid, authToken);
// client.messages
//   .create({
//     body: "Your appointment is coming up on July 21 at 3PM",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+50433300223",
//   })
//   .then((message) => console.log(message.sid))
//   .done();
