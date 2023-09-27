"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
// import authRoutes from "./routes/auth/auth.routes";
// import googleCalendarRoutes from "./routes/google/google-calendar.routes";
// import apoointmentsRoutes from "./routes/appointments/appointments.routes";
// import userRoutes from "./routes/users/users.routes";
// import specialtiesRoutes from "./routes/specialties/doctors-specialties.routes";
// import doctorsRoutes from "./routes/doctors/doctors.routes";
// import rolesRoutes from "./routes/roles/roles.routes";
// import patientsRoutes from "./routes/patients/patients.routes";
// import messagesRoutes from "./routes/messages/messages.routes";+
const auth_routes_1 = __importDefault(require("@/routes/auth/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importStar(require("@/config"));
const models = __importStar(require("@/models/init-models"));
const roles_routes_1 = __importDefault(require("@/routes/roles/roles.routes"));
const API_VERSION = "/api/v1";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: config_1.CORS_VALID_ORIGIN,
    credentials: true,
}));
// usamos las rutas definidas arriba que estan en nuestro archivo de routes
app.use(API_VERSION, auth_routes_1.default);
// app.use(API_VERSION, googleCalendarRoutes);
// app.use(API_VERSION, apoointmentsRoutes);
// app.use(API_VERSION, userRoutes);
// app.use(API_VERSION, specialtiesRoutes);
// app.use(API_VERSION, doctorsRoutes);
app.use(API_VERSION, roles_routes_1.default);
// app.use(API_VERSION, patientsRoutes);
// app.use(API_VERSION, messagesRoutes);
async function main() {
    await config_1.default.authenticate();
    models;
    await config_1.default.sync({ force: true });
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
    app.listen(config_1.PORT, () => {
        console.log(`started development server: http://localhost:${config_1.PORT}/api/v1`);
    });
}
main();
