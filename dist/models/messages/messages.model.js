"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("@/config"));
const messages_status_model_1 = require("@models/messages/status/messages-status.model");
const messages_types_model_1 = require("@models/messages/messages-types/messages-types.model");
const patients_model_1 = require("../patients/patients.model");
const user_model_1 = require("@models/users/user.model");
exports.Message = config_1.default.define("tbl_messages", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    appointment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    message_type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "tbl_message_types",
            key: "id",
        },
    },
    sent_status_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "tbl_message_statuses",
            key: "id",
        },
    },
}, {
    indexes: [
        {
            fields: ["user_id"],
        },
        {
            fields: ["appointment_id"],
        },
        {
            fields: ["message_type_id"],
        },
    ],
});
exports.Message.belongsTo(messages_status_model_1.MessageStatus, {
    foreignKey: "sent_status_id",
    as: "sent_status",
});
messages_status_model_1.MessageStatus.hasMany(exports.Message, {
    foreignKey: "sent_status_id",
    as: "messages",
});
exports.Message.belongsTo(messages_types_model_1.MessageType, {
    foreignKey: "message_type_id",
    as: "message_type",
});
messages_types_model_1.MessageType.hasMany(exports.Message, {
    foreignKey: "message_type_id",
    as: "messages",
});
exports.Message.belongsTo(patients_model_1.Patient, {
    foreignKey: "patient_id",
    as: "patient",
});
patients_model_1.Patient.hasMany(exports.Message, {
    foreignKey: "patient_id",
    as: "messages",
});
exports.Message.belongsTo(user_model_1.User, {
    foreignKey: "user_id",
    as: "user",
});
user_model_1.User.hasMany(exports.Message, {
    foreignKey: "user_id",
    as: "messages",
});
// Message.belongsTo(Appointment, {
//   foreignKey: {
//     name: "appointment_id",
//     allowNull: true,
//   },
//   as: "appointment",
// });
// Appointment.hasMany(Message, {
//   foreignKey: {
//     name: "appointment_id",
//     allowNull: true,
//   },
//   as: "messages",
// });
