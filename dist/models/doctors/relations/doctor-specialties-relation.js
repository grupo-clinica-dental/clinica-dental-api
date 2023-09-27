"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorSpecialtyUnion = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("@/config"));
const doctor_model_1 = require("../doctor.model");
const doctor_specialties_1 = require("../specialties/doctor-specialties");
exports.DoctorSpecialtyUnion = config_1.default.define("tbl_doctor_specialties", {
    doctor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "tbl_doctors",
            key: "id",
        },
        primaryKey: true,
    },
    specialty_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "tbl_specialties",
            key: "id",
        },
        primaryKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});
doctor_model_1.Doctor.belongsToMany(doctor_specialties_1.DoctorSpecialty, {
    through: exports.DoctorSpecialtyUnion,
    foreignKey: "doctor_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
doctor_specialties_1.DoctorSpecialty.belongsToMany(doctor_model_1.Doctor, {
    through: exports.DoctorSpecialtyUnion,
    foreignKey: "specialty_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
