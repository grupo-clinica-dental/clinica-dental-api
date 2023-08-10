import express, { Application } from "express";
import testRoutes from "./routes/test";
import authRoutes from "./routes/auth.routes";
import googleCalendarRoutes from "./routes/google-calendar.routes";

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
app.use(API_VERSION, testRoutes);
app.use(API_VERSION, authRoutes);
app.use(API_VERSION, googleCalendarRoutes);

app.listen(PORT, () => {
  console.log(`started development server: http://localhost:${PORT}/api/v1`);
});
