import express, { Application } from "express";
import testRoutes from "./routes/test";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import { CORS_VALID_ORIGIN } from "./config";
const apiVersion = "/api/v1";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: CORS_VALID_ORIGIN,
    credentials: true,
  })
);

app.use(apiVersion, testRoutes);
app.use(apiVersion, authRoutes);

const port = 4500;

app.listen(port, () => {
  console.log(`started development server: http://localhost:${port}/api/v1`);
});
