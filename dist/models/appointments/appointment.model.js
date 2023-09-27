"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("@/config"));
const messages_model_1 = require("@models/messages/messages.model");
const doctor_model_1 = require("@models/doctors/doctor.model");
const patients_model_1 = require("../patients/patients.model");
exports.Appointment = config_1.default.define("tbl_appointments", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    google_calendar_event_id: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
exports.Appointment.hasMany(messages_model_1.Message, {
    foreignKey: "appointment_Id",
    as: "messages", // This allows us to get all messages for a particular appointment using this alias
});
messages_model_1.Message.belongsTo(exports.Appointment, {
    foreignKey: {
        name: "appointment_Id",
        allowNull: false,
    },
    as: "appointment",
});
exports.Appointment.belongsTo(doctor_model_1.Doctor, {
    foreignKey: "doctorId",
    as: "doctor", // This allows us to get the doctor for a particular appointment using this alias
});
doctor_model_1.Doctor.hasMany(exports.Appointment, {
    foreignKey: "doctorId",
    as: "appointments", // This allows us to get all appointments for a particular doctor using this alias
});
exports.Appointment.belongsTo(patients_model_1.Patient, {
    foreignKey: "patientId",
    as: "patient",
});
patients_model_1.Patient.hasMany(exports.Appointment, {
    foreignKey: "patientId",
    as: "appointments",
});
