"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("@/config"));
const roles_model_1 = require("@/models/roles/roles.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.User = config_1.default.define("tbl_users", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        set(value) {
            try {
                let password = value;
                bcrypt_1.default.hash(value, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    password = hash;
                });
                this.setDataValue("password", password);
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt_1.default.genSalt(10);
                user.password = await bcrypt_1.default.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                const salt = await bcrypt_1.default.genSalt(10);
                user.password = await bcrypt_1.default.hash(user.password, salt);
            }
        },
    },
});
exports.User.belongsTo(roles_model_1.Rol, {
    foreignKey: "role_id",
    as: "role",
});
roles_model_1.Rol.hasMany(exports.User, {
    foreignKey: "role_id",
});
