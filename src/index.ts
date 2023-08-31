import express, { Application } from "express";
import authRoutes from "./routes/auth/auth.routes";
import googleCalendarRoutes from "./routes/google/google-calendar.routes";
import apoointmentsRoutes from "./routes/appointments/appointments.routes";
import userRoutes from "./routes/users/users.routes";
import specialtiesRoutes from "./routes/specialties/doctors-specialties.routes";
import doctorsRoutes from "./routes/doctors/doctors.routes";
import rolesRoutes from "./routes/roles/roles.routes";
import patientsRoutes from "./routes/patients/patients.routes";
import messagesRoutes from "./routes/messages/messages.routes";
import dotenv from "dotenv";

dotenv.config();

// lo que se exporta por defecto se usa en la ruta

import cors from "cors";
import { CORS_VALID_ORIGIN, PORT } from "./config";
const API_VERSION = "/api/v1";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: CORS_VALID_ORIGIN,
    credentials: true,
  })
);

// usamos las rutas definidas arriba que estan en nuestro archivo de routes
app.use(API_VERSION, authRoutes);
app.use(API_VERSION, googleCalendarRoutes);
app.use(API_VERSION, apoointmentsRoutes);
app.use(API_VERSION, userRoutes);
app.use(API_VERSION, specialtiesRoutes);
app.use(API_VERSION, doctorsRoutes);
app.use(API_VERSION, rolesRoutes);
app.use(API_VERSION, patientsRoutes);
app.use(API_VERSION, messagesRoutes);

console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);

app.listen(PORT, () => {
  console.log(`started development server: http://localhost:${PORT}/api/v1`);
});
