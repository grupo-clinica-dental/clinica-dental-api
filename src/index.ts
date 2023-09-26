import express, { Application } from "express";
import "module-alias/register";
// import authRoutes from "./routes/auth/auth.routes";
// import googleCalendarRoutes from "./routes/google/google-calendar.routes";
// import apoointmentsRoutes from "./routes/appointments/appointments.routes";
// import userRoutes from "./routes/users/users.routes";
// import specialtiesRoutes from "./routes/specialties/doctors-specialties.routes";
// import doctorsRoutes from "./routes/doctors/doctors.routes";
// import rolesRoutes from "./routes/roles/roles.routes";
// import patientsRoutes from "./routes/patients/patients.routes";
// import messagesRoutes from "./routes/messages/messages.routes";+
import authRoutes from "@/routes/auth/auth.routes";
import dotenv from "dotenv";
import cors from "cors";
import sequelize, { CORS_VALID_ORIGIN, PORT } from "@/config";
import * as models from "@/models/init-models";
import rolesRoutes from "@/routes/roles/roles.routes";

const API_VERSION = "/api/v1";

dotenv.config();

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
// app.use(API_VERSION, googleCalendarRoutes);
// app.use(API_VERSION, apoointmentsRoutes);
// app.use(API_VERSION, userRoutes);
// app.use(API_VERSION, specialtiesRoutes);
// app.use(API_VERSION, doctorsRoutes);
app.use(API_VERSION, rolesRoutes);
// app.use(API_VERSION, patientsRoutes);
// app.use(API_VERSION, messagesRoutes);

async function main() {
  await sequelize.authenticate();
  models;
  await sequelize.sync({ force: true });

  const rol = await models.Rol.create({
    name: "Admin",
  });

  const user = await models.User.create({
    email: "test@test.com",
    name: "test",
    password: "test",
    phone: "123456789",
    role_id: 1,
  });

  app.listen(PORT, () => {
    console.log(`started development server: http://localhost:${PORT}/api/v1`);
  });
}

main();
