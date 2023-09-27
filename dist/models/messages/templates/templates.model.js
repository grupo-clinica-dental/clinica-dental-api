"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplate = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("@/config"));
const messages_types_model_1 = require("@models/messages/messages-types/messages-types.model");
exports.MessageTemplate = config_1.default.define("tbl_message_templates", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    message_type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "tbl_message_types",
            key: "id",
        },
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
}, { timestamps: false });
// Associations
exports.MessageTemplate.belongsTo(messages_types_model_1.MessageType, {
    foreignKey: "message_type_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
messages_types_model_1.MessageType.hasMany(exports.MessageTemplate, {
    foreignKey: "message_type_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
